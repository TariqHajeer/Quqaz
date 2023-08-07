import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationType, NotificationsService } from 'angular2-notifications';
import { Order } from 'src/app/Models/order/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-view-orders-without-branch-filter',
  templateUrl: './view-orders-without-branch-filter.component.html',
  styleUrls: ['./view-orders-without-branch-filter.component.scss']
})
export class ViewOrdersWithoutBranchFilterComponent implements OnInit {
  orders: Order[]=[];
  code: string;
  dataSource = new MatTableDataSource([]);
  displayedColumns = [
    'code',
    'deliveryCost',
    'cost',
    'oldCost',
    'recipientName',
    'recipientPhones',
    'client',
    'CurrentBranch',
    'clientPrintNumber',
    'country',
    'region',
    'agent',
    'agentPrintNumber',
    'monePlaced',
    'orderplaced',
    'address',
    'createdBy',
    'date',
    'diliveryDate',
    'note',
  ];
  constructor(private orderService: OrderService,
    private notifications: NotificationsService,
  ) { }
  ngOnInit(): void {
  }
  getOrders(): void {
    if (!this.code) {
      this.notifications.error(
        'error',
        'يجب ادخال  كود الشحنة',
        NotificationType.Error,
        { theClass: 'error', timeOut: 2000, showProgressBar: false }
      );
      return;
    }
    this.orders = [];
    this.orderService.GetOrderInAllBranches(this.code).subscribe(res => {
      this.orders = res;
      this.dataSource = new MatTableDataSource(res as []);
    }, err => {
      this.notifications.error(
        'error',
        'يجب التأكد من كود الشحنة',
        NotificationType.Error,
        { theClass: 'error', timeOut: 2000, showProgressBar: false }
      );
    })
  }



}
