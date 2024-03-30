import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { logBase } from '@syncfusion/ej2-angular-charts';
import { NotificationType, NotificationsService } from 'angular2-notifications';
import { Order } from 'src/app/Models/order/order.model';
import { Paging } from 'src/app/Models/paging';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-negative-alert',
  templateUrl: './order-negative-alert.component.html',
  styleUrls: ['./order-negative-alert.component.scss']
})
export class OrderNegativeAlertComponent implements OnInit {

  constructor(private orderService: OrderService,
    private notifications: NotificationsService,
  ) { }
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  orders: Order[] = [];
  noDataFound: boolean = false;
  paging: Paging = new Paging();
  totalCount: number = 0;
  displayedColumns: string[] = [
    "index",
    "code",
    "cost",
    "deliveryCost",
    "agent",
    "agentCost",
    "client",
    "action"
  ]
  ngOnInit(): void {
    this.getNigativeAlterOrders();
  }
  getNigativeAlterOrders() {
    this.orderService.getNegativeAlert(this.paging).subscribe(res => {
      if (res.data.length <= 0)
        this.noDataFound = true;
      else {
        this.noDataFound = false;
      }
      this.dataSource = new MatTableDataSource(res.data);
      this.orders = res.data;
      this.totalCount = res.total;
      this.orders = res;
    })
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length;
    this.paging.RowCount = event.pageSize;
    this.paging.Page = event.pageIndex + 1;
    this.getNigativeAlterOrders();
  }
  getItemIndex(i: number): number {
    if (this.paging.Page == 1) {
      return i;
    }
    return i + (this.paging.RowCount * (this.paging.Page - 1));
  }
  deleteNigativeAlert(id) {
    this.orderService.deleteNegativeAlert(id).subscribe(res => {
      this.getNigativeAlterOrders();
      this.notifications.success('success', 'تم  الحذف بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    }, error => {
      this.notifications.create('error', 'حدث خطا ماو لم يتم الحذف', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });

    })
  }

}
