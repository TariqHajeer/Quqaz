import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { Paging } from 'src/app/Models/paging';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

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
    public route: Router
  ) { } 
  displayedColumns: string[] = ['index', 'code', 'client', 'cost', 'country', 'region'
    , 'orderplaced'];
  dataSource = new MatTableDataSource([]);
  paging: Paging
  filtering: OrderFilter
  noDataFound: boolean = false
  totalCount
  Code
  ClientName
  ngOnInit(): void {
    this.paging=new Paging
    this.filtering=new OrderFilter
  }
  Get(){
    this.orderservice.OrdersUnacceptable().subscribe(res=>{
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
