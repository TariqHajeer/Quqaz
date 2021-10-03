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
    , private customerService: CustomService,) { }
  @ViewChild('infoModal') public infoModal: ModalDirective;

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
      this.displayedColumns = ['code', 'cost', 'recipientName',
        'recipientPhones', 'address', 'note', 'client', 'country'
        , 'region', 'agent', 'date', 'printedTimes','print', 'Accept', 'DisAccept'];
    })

  }
  order: Order = new Order
  AgentId
  Agents: User[] = []
  IdsDto: IdsDto = new IdsDto
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
  dateWithId: DateWithIds<number>
  DisAccept(elementid) {
    this.dateWithId = new DateWithIds
    this.dateWithId.Ids = elementid
    this.dateWithId.Date = new Date
    // this.dateWithId.Ids.push(elementid)
    this.OrderService.DisAccept(this.dateWithId).subscribe(res => {
      this.orders = this.orders.filter(o => o.id != elementid)
      this.dataSource = new MatTableDataSource(this.orders);

      // this.get()
    })
  }
  print(i, element) {
    // this.order=element
    this.OrderService.AddPrintNumber(element.id).subscribe(res=>{
      // console.log(res)
      element.printedTimes+=1

    })
    element.show = true
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

    }, 1000);
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
