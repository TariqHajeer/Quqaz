import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';
import { Paging } from 'src/app/Models/paging';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { BranchDetailsService } from 'src/app/services/branch-details.service';
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
  printNumber: number;
  showSeeMore: boolean;
  showPrintBtn: boolean;
  driver: any;
  constructor(public orderservice: OrderService,
    private notifications: NotificationsService,
    private authService: AuthService,
    private router: Router,
    public spinner: NgxSpinnerService,
    private activeBranchDetais: BranchDetailsService
  ) { }

  ngOnInit(): void {
    this.getOrders();
    this.activeBranchDetais.getBranch().pipe(
      tap(data => {
        this.address = data.address;
        this.companyPhone = data.phoneNumber;
      })).subscribe();
  }

  getInStockToTransferToSecondBranch() {
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
  getOrders() {
    if (this.orderservice.selectOrder.SelectedIds.length == 0 && this.orderservice.selectOrder.IsSelectedAll == false)
      this.router.navigate(['/app/order/transferToSecondBranch']);
    this.orderservice.selectOrder.Paging = new Paging();
    this.getInStockToTransferToSecondBranch();
  }
  seeMore() {
    this.orderservice.selectOrder.Paging.Page += 1;
    this.getInStockToTransferToSecondBranch();
  }
  moveOrders() {
    if (!this.driver) {
      this.notifications.success('error', 'اسم السائق حقل مطلوب', NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      return
    }
    this.orderservice.transferToSecondBranchDto.Driver.driverName = this.driver.name;
    this.orderservice.transferToSecondBranchDto.Driver.driverId = this.driver.id;
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
    this.spinner.show();
    this.orderservice.PrintTransferToSecondBranch(this.printNumber).subscribe(res => {
      let blob = new Blob([res], { type: 'application/pdf' });
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "help.pdf";
      link.click();
      this.spinner.hide();
      this.notifications.success('success', 'تمت الطباعة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.showPrintBtn = true;
    }, err => {
      this.spinner.hide();
    })
  }
}
