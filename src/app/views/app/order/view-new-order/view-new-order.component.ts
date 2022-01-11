import { Component, HostListener, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { City } from 'src/app/Models/Cities/city.Model';
import { DateWithIds } from 'src/app/Models/date-with-ids.model';
import { IdsDto, Order } from 'src/app/Models/order/order.model';
import { User } from 'src/app/Models/user/user.model';
import { CustomService } from 'src/app/services/custom.service';
import { OrderService } from 'src/app/services/order.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-view-new-order',
  templateUrl: './view-new-order.component.html',
  styleUrls: ['./view-new-order.component.scss']
})
export class ViewNewOrderComponent implements OnInit {
  displayedColumns: string[];
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  orders: Order[] = []
  noDataFound: boolean = false

  constructor(private OrderService: OrderService,
    private clientService: ClientService
    , private customerService: CustomService,
    private notifications: NotificationsService,
    private route: Router
  ) { }
  @ViewChild('infoModal') public infoModal: ModalDirective;
  selection = new SelectionModel<any>(true, []);
  selectOrders: any[] = []
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.selectOrders = []
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => { this.selection.select(row) });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    this.checkboxId(row)
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  checkboxId(row) {
    if (this.selection.isSelected(row))
      if (this.selectOrders.filter(d => d == row).length > 0)
        return
      else {
        this.selectOrders.push(row)
      }
    if (!this.selection.isSelected(row)) {
      this.selectOrders = this.selectOrders.filter(o => o != row)
    }
  }
  ngOnInit(): void {
    this.get()
    this.GetClient()
    this.Getcities()
    // this.order = new Order()
  }
  // ngOnChanges() {
  //   this.print()
  // }

  get() {
    this.OrderService.GetNewOrder().subscribe(res => {
      // console.log(res)
      this.orders = res
      this.orders.forEach(res => {
        res.recipientPhones = res.recipientPhones.split(',')
      })
      if (this.orders.length == 0)
        this.noDataFound = true
      else this.noDataFound = false
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.displayedColumns = ['select', 'code', 'cost', 'recipientName',
        'recipientPhones', 'address', 'note', 'client', 'country'
        , 'region', 'agent', 'date', 'printedTimes', 'print', 'Accept', 'DisAccept'];
    })

  }
  order: Order = new Order
  AgentId
  Agents: User[] = []
  IdsDto: IdsDto = new IdsDto
  Ids: IdsDto[]=[];
  MultiAgent(order) {
    this.order = order
    // console.log(order)
    if (order.country.agnets.length == 1) {
      this.AgentId = order.country.agnets[0].id
      this.Accept()
    } else {
      this.Agents = order.country.agnets
      this.infoModal.show()
    }
  }
  Accept() {
    // console.log( this.order)
    this.IdsDto.OrderId = this.order.id
    this.IdsDto.AgentId = this.AgentId
    if (!this.AgentId) return
    else
      this.OrderService.Accept(this.IdsDto).subscribe(res => {
        // this.print(i)
        this.IdsDto = new IdsDto
        this.AgentId = null
        this.get()
        this.infoModal.hide()
      })
  }
  AcceptAll() {
    if (this.selectOrders.length == 0) {
      this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    this.selectOrders=this.selectOrders.filter(o=>o.country.agnets.length == 1)
    this.selectOrders.forEach(item=>{
      this.IdsDto.AgentId=item.country.agnets[0].id
      this.IdsDto.OrderId=item.id
      this.Ids.push(this.IdsDto)
      this.IdsDto=new IdsDto
    })
    this.OrderService.Acceptmultiple(this.Ids).subscribe(res=>{
      this.get()
      this.selectOrders=[]
      this.notifications.create('success', '  تم القبول بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

    })
  }
  DisAcceptAll() {
    this.dateWithIds=new DateWithIds
   this.dateWithIds.Date=moment().format()
   this.dateWithIds.Ids=this.selectOrders.map(o=>o.id)
    this.OrderService.DisAcceptmultiple(this.dateWithIds).subscribe(res=>{
      this.get()
      this.selectOrders=[]
      this.notifications.create('success', '  تم الرفض بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

    })
  }
  printAll() {
    if (this.selectOrders.length == 0) {
      this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    this.OrderService.AddPrintNumberMultiple(this.selectOrders.map(o=>o.id)).subscribe(res => {
      // console.log(res)
      this.dataSource.data.forEach(element => {
        this.selectOrders.forEach(order=>{
          if(element.id==order.id)
          element.printedTimes += 1
        })
      });
    })
    // localStorage.setItem('printneworders', JSON.stringify(this.selectOrders))
    // this.route.navigate(['app/order/newordersprint'])
    var divToPrint = document.getElementById('printAll');
    var css = '@page { size: A5 landscape ;margin: 0px;color-adjust: exact;-webkit-print-color-adjust: exact;}',
      style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    style.appendChild(document.createTextNode(css));
    divToPrint.appendChild(style);
    var newWin = window.open('', 'Print-Window');
    newWin?.document.open();
    newWin?.document.write('<html dir="rtl"><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><link rel="stylesheet/less" type="text/css" href="app/reports/printpreview/agent/agent.component.less" /></head><body onload="window.print()">' + divToPrint?.innerHTML + '</body></html>');
    newWin?.document.close();
    setTimeout(function () {
      newWin?.close();
      // location.reload();
      // this.get()

    }, 2000);
  }
  dateWithId: DateWithIds<number>
  dateWithIds: DateWithIds<number[]>
  DisAccept(elementid) {
    this.dateWithId = new DateWithIds
    this.dateWithId.Ids = elementid
    this.dateWithId.Date = moment().format()
    // this.dateWithId.Ids.push(elementid)
    this.OrderService.DisAccept(this.dateWithId).subscribe(res => {
      this.orders = this.orders.filter(o => o.id != elementid)
      this.dataSource = new MatTableDataSource(this.orders);

      // this.get()
    })
  }
  print(i, element) {
    // this.order=element
    this.OrderService.AddPrintNumber(element.id).subscribe(res => {
      // console.log(res)
      element.printedTimes += 1

    })
    // element.show = true
    var divToPrint = document.getElementById('contentToConvert-' + i);
    var css = '@page { size: A5 landscape ;margin: 0;color-adjust: exact;-webkit-print-color-adjust: exact;}',
      style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    style.appendChild(document.createTextNode(css));
    divToPrint.appendChild(style);
    var newWin = window.open('', 'Print-Window');
    newWin?.document.open();
    newWin?.document.write('<html dir="rtl"><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><link rel="stylesheet/less" type="text/css" href="app/reports/printpreview/agent/agent.component.less" /></head><body onload="window.print()">' + divToPrint?.innerHTML + '</body></html>');
    newWin?.document.close();
    setTimeout(function () {
      newWin?.close();
      // location.reload();
      // this.get()

    }, 2000);
  }
  cityapi = "Country"
  clients: Client[] = []
  cities: City[] = []
  GetClient() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res
    })
  }
  Getcities() {
    this.customerService.getAll(this.cityapi).subscribe(res => {
      this.cities = res
    })
  }
  code
  CountryId
  ClientId
  codeFillter() {
    this.dataSource.data = this.orders
    if (this.dataSource.data.length != 0) {
      if (this.code) {
        this.dataSource.data = this.dataSource.data.filter(d => d.code.includes(this.code))
      }
      if (this.ClientId) {
        this.dataSource.data = this.dataSource.data.filter(d => d.client.id == this.ClientId)
      }
      if (this.CountryId) {
        this.dataSource.data = this.dataSource.data.filter(d => d.country.id == this.CountryId)
      }
    }

  }
  // @HostListener("window:afterprint", ["$event"])
  // onafterPrint(event) {
  //   console.log(event)
  // }
}
