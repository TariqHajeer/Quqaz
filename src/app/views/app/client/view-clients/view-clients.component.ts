import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EditSettingsModel, GridComponent, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Client } from '../client.model';
import { Account } from '../client.model';
import { ClientService } from '../client.service'
@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss']
})
export class ViewClientsComponent implements OnInit {

  constructor(private clientService: ClientService,
    private notifications: NotificationsService,
    public route: Router) { }
  cities: any[] = [];
  tempRegion: any;
  public stTime: any;
  public filter: Object;
  public filterSettings: Object;
  public editSettings: EditSettingsModel;
  public selectionSettings: Object;
  public lines: any;
  @ViewChild('normalgrid')
  public gridInstance: GridComponent;
  public toolbar: Object[];
  public pageSettings: Object;
  clients: Client[] = [];
  editClicked: any;
  addClicked: any;
  currentClientId: any;
  EditClient: Client
  formatOptions: Object
  ngOnInit(): void {
    this.getClients();
    this.editSettings = { showDeleteConfirmDialog: true, allowDeleting: true };
    this.toolbar = [
      { text: 'حذف', tooltipText: 'حذف', prefixIcon: 'e-delete', id: 'normalgrid_delete' }
      , 'Search'];
    this.filterSettings = { type: "CheckBox" };
    this.filter = { type: "CheckBox" };
    this.stTime = performance.now();
    this.pageSettings = { pageSize: 10, pageSizes: true };
    this.selectionSettings = { type: "Multiple" };
    this.lines = 'Horizontal';
    this.formatOptions = { type: 'date', format: 'dd/MM/yyyy' };
    localStorage.removeItem('client')
  }
  load() {
    const rowHeight: number = this.gridInstance.getRowHeight();  // height of the each row
    const gridHeight: any = this.gridInstance.height;  // grid height
    const pageSize: number = this.gridInstance.pageSettings.pageSize;   // initial page size
    const pageResize: any = (gridHeight - (pageSize * rowHeight)) / rowHeight; // new page size is obtained here
    this.gridInstance.pageSettings.pageSize = pageSize + Math.round(pageResize);
  }
  addNewClicked() {
    this.addClicked = true;
    this.editClicked = false;
    this.getClients();
  }
  getClients() {
    this.clientService.getClients().subscribe(
      res => {
        this.clients = res;
        this.clients.forEach(element => {
          element.firstDate = element.firstDate.split('T')[0];
        });
      }
    )
  }
  onEditClicked(id) {
    this.route.navigate(['/app/client/edit', id])

  }
  addFinish(value) {
    this.formatOptions = { type: 'date', format: 'dd/MM/yyyy' };
    // this.clients.push(value)
    // this.gridInstance.refresh();
    this.getClients()

  }
  actionComplete(args: SaveEventArgs) {
    if (args.requestType == 'delete') {
      let id = args.data[0].id;
      if (args) {
        this.clientService.Delete(id).subscribe(
          res => {
            this.notifications.create('success', 'تم حذف  العميل بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 4000, showProgressBar: false });
          }
        )
      }
      else {
        this.gridInstance.refresh();
      }
    }
  }
  client: {
    client: any,
    cost: number,
    pay: boolean
  }
  cost = 0
  Account: Account
  getClient(data) {
    // this.client = {
    //   client: null,
    //   cost: 0,
    //   pay: true
    // }
    // this.client.client = data
    localStorage.setItem('client', JSON.stringify(data))
    this.route.navigate(['/app/client/ReceiptAndExchange'])
  }
  printpay() {
    //صرف
    this.Account = new Account()
    this.Account.ClinetId = this.client.client.id
    this.Account.Amount = -(this.cost)

    this.clientService.Account(this.Account).subscribe(res => {

    })
    this.client.pay = true
    this.client.cost = this.cost
    localStorage.setItem('client', JSON.stringify(this.client))
    this.route.navigate(['/app/reports/pay'])

  }
  printcatch() {
    //قبض
    this.Account = new Account()
    this.Account.ClinetId = this.client.client.id
    this.Account.Amount = this.cost
    this.clientService.Account(this.Account).subscribe(res => {

    })
    this.client.pay = false
    this.client.cost = this.cost
    localStorage.setItem('client', JSON.stringify(this.client))
    this.route.navigate(['/app/reports/pay'])
  }
  editClientProfile() {
    this.route.navigate(['/app/order/editclientorders'])
  }
}
