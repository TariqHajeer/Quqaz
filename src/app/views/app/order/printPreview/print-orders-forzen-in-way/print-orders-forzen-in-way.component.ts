import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderplacedEnum } from 'src/app/Models/Enums/OrderplacedEnum';
import { DeleiverMoneyForClientDto } from 'src/app/Models/order/deleiver-money-for-client-dto.model';
import { DateWithId } from 'src/app/Models/order/order.model';
import { Paging } from 'src/app/Models/paging';
import { PointSetting } from 'src/app/Models/pointSettings/point-setting.model';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { OrderService } from 'src/app/services/order.service';
import { ReciptService } from 'src/app/services/recipt.service';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';
import { Client } from '../../../client/client.model';

@Component({
  selector: 'app-print-orders-forzen-in-way',
  templateUrl: './print-orders-forzen-in-way.component.html',
  styleUrls: ['./print-orders-forzen-in-way.component.scss']
})
export class PrintOrdersForzenInWayComponent implements OnInit {
  orders: any[] = [];
  client: Client = new Client();
  dateOfPrint = new Date();
  userName: UserLogin = this.authService.getUser();
  address = environment.Address;
  companyPhone =
    environment.companyPhones[0] + ' - ' + environment.companyPhones[1];
  showPrintbtn: boolean = false;
  showSeeMore: boolean;
  ordersCounts: number;
  paging: Paging = new Paging();
  constructor(
    private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService
  ) { }


  ngOnInit(): void {
    this.getOrders();
  }


  getOrdersDontFinished() {
    if (this.orders.length < this.ordersCounts)
      this.spinner.show();
    this.orderservice.forzenInWay(this.paging).subscribe(response => {
      this.spinner.hide();
      if (this.paging.Page == 1)
        this.orders = response.data;
      else {
        this.orders = [...this.orders, ...response.data];
      }
      this.ordersCounts = response.total;
      if (this.orders.length == 0)
        this.router.navigate(['/app/reports/GetOrdersForzenInWay']);
    }, err => {
      this.spinner.hide();
    });

  }
  getOrders() {
    if (this.orderservice.orderForzenInWayFilter.selectedIds?.length == 0 && !this.orderservice.orderForzenInWayFilter.isSelectedAll) {
      this.router.navigate(['/app/order/GetOrdersForzenInWay']);
      return;
    }
    this.paging = new Paging();
    this.getOrdersDontFinished();

  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (window.pageYOffset + document.body.offsetHeight + 1 >= document.documentElement.scrollHeight) {
      this.seeMore()
    }
  }
  seeMore() {
    this.paging.Page += 1;
    this.getOrdersDontFinished();
  }
  print() {
    this.orderService.printFrozenInWay().subscribe(res => {
      let blob = new Blob([res], { type: 'application/pdf' });
      var downloadURL = window.URL.createObjectURL(blob);
      window.open(downloadURL, '_blank');

      // download pdf file 
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "الطلبات المعلقة.pdf";
      link.click();
    }, err => {
    })
  }

}
