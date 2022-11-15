import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-print-orders',
  templateUrl: './print-orders.component.html',
  styleUrls: ['./print-orders.component.scss']
})
export class PrintOrdersComponent implements OnInit {
  orders: any[] = [];
  address = environment.Address;
  companyPhone =
    environment.companyPhones[0] + ' - ' + environment.companyPhones[1];
  dateOfPrint = new Date();
  user: UserLogin = this.authService.getUser();
  printnumber: number;
  toBranch
  showSeeMore: boolean;
  showPrintBtn: boolean;

  constructor(private orderservice: OrderService,
    private notifications: NotificationsService,
    private authService: AuthService,
    private router: Router,
    public spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    this.orderservice.GetInStockToTransferToSecondBranch().subscribe(response => {
      if (this.orderservice.selectOrder.Paging.Page == 1)
        this.orders = response.data;
      else
        response.data.forEach(element => {
          this.orders.push(element);
        });
      if (this.orders.length < response.total)
        this.showSeeMore = true;
      else
        this.showSeeMore = false;
      if (this.orders.length == 0)
        this.router.navigate(['/app/order/transferToSecondBranch']);
    });
  }
  seeMore() {
    this.orderservice.selectOrder.Paging.Page += this.orderservice.selectOrder.Paging.Page;
    this.getOrders();
  }
  moveOrders() {
    this.spinner.show();
    this.orderservice.TransferToSecondBranch().subscribe(res => {
      this.spinner.hide();
      this.notifications.success('success', 'تم نقل الطلبات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.showPrintBtn = true;
    },err=>{
      this.spinner.hide();
    })
  }
  print(){

  }
}
