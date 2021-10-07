import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Order, IdsDto } from 'src/app/Models/order/order.model';
import {AgentOrderService} from 'src/app/services/agent-order.service'
@Component({
  selector: 'app-agent-orders',
  templateUrl: './agent-orders.component.html',
  styleUrls: ['./agent-orders.component.scss']
})
export class AgentOrdersComponent implements OnInit {

  displayedColumns: string[];
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  orders: Order[] = []
  noDataFound: boolean = false

  constructor(private OrderService: AgentOrderService,) { }
  @ViewChild('infoModal') public infoModal: ModalDirective;

  ngOnInit(): void {
    this.get()
    // this.order = new Order()
  }
  // ngOnChanges() {
  //   this.print()
  // }

  get() {
    this.OrderService.Get().subscribe(res => {
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
        , 'region', 'agent', 'date'];
    })

  }
  order: Order = new Order
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

}
