import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService } from 'angular2-notifications';
import { Client } from '../client.model';
import { ClientService } from '../client.service'
@Component({
  selector: 'app-view-clients',
  templateUrl: './view-clients.component.html',
  styleUrls: ['./view-clients.component.scss']
})
export class ViewClientsComponent implements OnInit {

  constructor(private clientService: ClientService, private notifications: NotificationsService) { }
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
  public toolbar: ToolbarItems[];
  public pageSettings: Object;
  clients: Client[] = [];
  editClicked: any;
  addClicked: any;
  currentClientId: any;
  ngOnInit(): void {
    this.getClients();
    this.editSettings = { showDeleteConfirmDialog: true, allowDeleting: true };
    this.toolbar = ['Search', 'Delete',];
    this.filterSettings = { type: "CheckBox" };
    this.filter = { type: "CheckBox" };
    this.stTime = performance.now();
    this.pageSettings = { pageSize: 5, pageSizes: true };
    this.selectionSettings = { persistSelection: true, type: "Multiple" };
    this.lines = 'Horizontal';
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
      }
    )
  }
  onEditClicked(id) {
    this.addClicked = false;
    this.editClicked = true;
    this.currentClientId = id;
  }
  addFinish(value) {
    console.log(value);
  }
}
