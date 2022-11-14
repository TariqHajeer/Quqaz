import { Component, OnInit } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-print-orders',
  templateUrl: './print-orders.component.html',
  styleUrls: ['./print-orders.component.scss']
})
export class PrintOrdersComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private notifications: NotificationsService,) { }

  ngOnInit(): void {
    console.log(this.orderservice.selectOrder);
  }
  getOrders() {
    this.orderservice.GetInStockToTransferToSecondBranch().subscribe(response => {
    });
  }
  moveOrders() {
    this.orderservice.TransferToSecondBranch().subscribe(res => {
      this.notifications.success('success', 'تم نقل الطلبات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    })
  }
}
