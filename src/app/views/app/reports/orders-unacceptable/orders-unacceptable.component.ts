import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { Paging } from 'src/app/Models/paging';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';

@Component({
  selector: 'app-orders-unacceptable',
  templateUrl: './orders-unacceptable.component.html',
  styleUrls: ['./orders-unacceptable.component.scss']
})
export class OrdersUnacceptableComponent implements OnInit {

  constructor(
    private orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    public clientService: ClientService,

  ) { } 
  displayedColumns: string[] = ['index', 'code', 'client', 'cost', 'country', 'region'];
  dataSource = new MatTableDataSource([]);
  paging: Paging
  filtering: OrderFilter
  noDataFound: boolean = false
  totalCount
  Code
  Clients: Client[] = []

  ngOnInit(): void {
    this.paging=new Paging
    this.filtering=new OrderFilter
    this.Get()
    this.getClients()
  }
  getClients() {
    this.clientService.getClients().subscribe(res => {
      this.Clients = res
    })
  }
  Get(){
    this.orderservice.OrdersUnacceptable(this.filtering,this.paging).subscribe(res=>{
      this.dataSource=new MatTableDataSource(res.data);
      this.totalCount=res.total
    })
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
  }
}
