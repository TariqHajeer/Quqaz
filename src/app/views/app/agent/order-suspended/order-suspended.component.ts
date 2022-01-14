import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { City } from 'src/app/Models/Cities/city.Model';
import { DateWithIds } from 'src/app/Models/date-with-ids.model';
import { Order, IdsDto } from 'src/app/Models/order/order.model';
import { User } from 'src/app/Models/user/user.model';
import { AgentOrderService } from 'src/app/services/agent-order.service';
import { CustomService } from 'src/app/services/custom.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';

@Component({
  selector: 'app-order-suspended',
  templateUrl: './order-suspended.component.html',
  styleUrls: ['./order-suspended.component.scss']
})
export class OrderSuspendedComponent implements OnInit {

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
  date
  get() {
    this.date =moment().format();
    this.OrderService.OrderSuspended(this.date).subscribe(res => {
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
        , 'region', 'date'];
    })

  }
  order: Order = new Order
  AgentId
  Agents: User[] = []
  IdsDto: IdsDto = new IdsDto



}
