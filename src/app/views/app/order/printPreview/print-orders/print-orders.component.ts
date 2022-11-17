import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';
import { saveAs as importedSaveAs } from 'file-saver';
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
  printNumber: number;
  toBranch
  showSeeMore: boolean;
  showPrintBtn: boolean;

  constructor(public orderservice: OrderService,
    private notifications: NotificationsService,
    private authService: AuthService,
    private router: Router,
    public spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.getOrders();
  }
  getOrders() {
    if (this.orderservice.selectOrder.SelectedIds.length == 0 && this.orderservice.selectOrder.IsSelectedAll == false)
      this.router.navigate(['/app/order/transferToSecondBranch']);
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
      this.printNumber = res;
    }, err => {
      this.spinner.hide();
    })
  }
  print() {
    this.orderservice.PrintTransferToSecondBranch(this.printNumber).subscribe(res => {
      this.spinner.hide();
      importedSaveAs(res, new Date());
      this.notifications.success('success', 'تمت الطباعة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.showPrintBtn = true;
    }, err => {
      this.spinner.hide();
    })
  }
}
