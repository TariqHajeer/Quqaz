import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DateWithIds } from 'src/app/Models/date-with-ids.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { IdsDto, Order } from 'src/app/Models/order/order.model';
import { User } from 'src/app/Models/user/user.model';
import { OrderService } from 'src/app/services/order.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';
import { alignFrozenEditForm } from '@syncfusion/ej2-angular-grids';
import { IndexesService } from 'src/app/services/indexes.service';
import { City } from 'src/app/Models/Cities/city.Model';
import { IndexesTypeEnum } from 'src/app/Models/Enums/IndexesTypeEnum';

@Component({
  selector: 'app-orders-with-client',
  templateUrl: './orders-with-client.component.html',
  styleUrls: ['./orders-with-client.component.scss']
})
export class OrdersWithClientComponent implements OnInit {

  displayedColumns: string[];
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  orders: Order[] = []
  noDataFound: boolean = false;
  countires: City[];
  clients: Client[] = [];

  constructor(private OrderService: OrderService,
    private clientService: ClientService, private indexesService: IndexesService) { }
  @ViewChild('infoModal') public infoModal: ModalDirective;
  filtering: OrderFilter = new OrderFilter()
  ngOnInit(): void {
    this.GetClient()
    this.get()
    this.getCountires();

  }
  getCountires(): void {
    this.indexesService.getIndexes([IndexesTypeEnum.Countries]).toPromise().then(res => {
      this.countires = res.countries;
    });
  }
  GetClient() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res
    })
  }
  get() {
    this.OrderService.OrderAtClient(this.filtering).subscribe(res => {
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
        , 'region', 'agent', 'printedTimes', 'print', 'Accept', 'DisAccept'];
    })

  }

  order: Order = new Order
  AgentId
  Agents: User[] = []
  IdsDto: IdsDto = new IdsDto
  MultiAgent(order) {

    this.order = order
    let country = this.countires.filter(c => c.id == this.order.country.id)[0];
    if (country.requiredAgent) {
      if (country.agents.length == 1) {
        this.AgentId = country.agents[0].Id;
      } else {
        this.Agents = country.agents;
        this.infoModal.show()
      }
    } else {
      console.log("else");
      this.AgentId = null;
      this.Accept()
    }
  }
  Accept() {

    this.IdsDto.OrderId = this.order.id
    this.IdsDto.AgentId = this.AgentId
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
    this.dateWithId.Date = moment().format()
    this.OrderService.DisAccept(this.dateWithId).subscribe(res => {
      this.orders = this.orders.filter(o => o.id != elementid)
      this.dataSource = new MatTableDataSource(this.orders);
    })
  }
  print(i, element) {
    this.OrderService.AddPrintNumber(element.id).subscribe(res => {
      element.printedTimes += 1

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

}
