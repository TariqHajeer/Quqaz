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

  heads = [
    'ترقيم',
    'كود',
    'الإجمالي',
    'الرسوم',
    ' يدفع للعميل',
    'المحافظة ',
    'الهاتف',
    'ملاحظات',
  ];
  orders: any[] = [];
  count: number = 0;
  deliveryCostCount: number = 0;
  client: Client = new Client();
  dateOfPrint = new Date();
  userName: UserLogin = this.authService.getUser();
  printnumber: number;
  orderplaced;
  address = environment.Address;
  companyPhone =
    environment.companyPhones[0] + ' - ' + environment.companyPhones[1];
  reports: any[] = [];
  points: PointSetting = new PointSetting();
  clientCalc: number = 0;
  reportstotal: number;
  showPrintbtn: boolean = false;
  dateWithIds: DateWithId<number[]>;
  DeleiverMoneyForClientDto: DeleiverMoneyForClientDto =
    new DeleiverMoneyForClientDto();
  pointid = null;
  showSeeMore: boolean;
  ordersCounts: number;
  constructor(
    private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private recepitservce: ReciptService,
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getOrders();
  }
  reciptClient() {
    if (
      this.orderplaced.filter(
        (o) =>
          o.id == OrderplacedEnum.Way ||
          o.id == OrderplacedEnum.PartialReturned ||
          o.id == OrderplacedEnum.Delivered
      ).length > 0
    ) {
      this.recepitservce.UnPaidRecipt(this.client.id).subscribe((res) => {
        this.reports = res;
        this.reportstotal = 0;
        this.reports.forEach((r) => {
          this.reportstotal += r.amount;
        });
      });
    } else return;
  }

  getOrdersDontFinished() {
    if (this.orders.length < this.ordersCounts)
      this.spinner.show();
    this.orderservice.OrdersDontFinished().subscribe(response => {
      this.spinner.hide();
      if (this.orderservice.orderClientDontDiliverdMoney.paging.Page == 1)
        this.orders = response.data.data;
      else {
        this.orders = [...this.orders, ...response.data.data];
      }
      this.ordersCounts = response.data.total;
      if (this.orders.length == 0)
        this.router.navigate(['/app/reports/Shipmentsnotbeendelivered']);
      this.reciptClient();
      this.count = response.orderTotal;
      this.deliveryCostCount = response.deliveryTotal;
      this.clientCalc = response.payForCientTotal;
    }, err => {
      this.spinner.hide();
    });

  }
  getOrders() {
    this.client = this.orderservice.deleiverMoneyForClientDto.Filter.Client;
    this.orderplaced = this.orderservice.deleiverMoneyForClientDto.Filter.OrderPlaced;
    this.pointid = this.orderservice.deleiverMoneyForClientDto.PointsSettingId;
    this.points = this.orderservice.deleiverMoneyForClientDto.point;
    let tableSelection = this.orderservice.orderClientDontDiliverdMoney.tableSelection;

    if (tableSelection.selectedIds?.length == 0 && !tableSelection.isSelectedAll) {
      this.router.navigate(['/app/order/GetOrdersForzenInWay']);
      return;
    }
    this.orderservice.orderClientDontDiliverdMoney.paging = new Paging();
    this.getOrdersDontFinished();

  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (window.pageYOffset + document.body.offsetHeight + 1 >= document.documentElement.scrollHeight) {
      this.seeMore()
    }
  }
  seeMore() {
    this.orderservice.orderClientDontDiliverdMoney.paging.Page += 1;
    this.getOrdersDontFinished();
  }
  changeDeleiverMoneyForClient() {
    this.spinner.show();
    this.orderservice
      .DeleiverMoneyForClient2()
      .subscribe(
        (res) => {
          this.notifications.create(
            'success',
            'تم تسليم  المبلغ  بنجاح',
            NotificationType.Success,
            { theClass: 'success', timeOut: 6000, showProgressBar: false }
          );
          this.showPrintbtn = true;
          this.spinner.hide();
          this.printnumber = res;
        },
        (err) => {
          this.spinner.hide();
          this.notifications.create(
            'error',
            'حدث خطأ ما يرجى المحاولة مجددا',
            NotificationType.Error,
            { theClass: 'error', timeOut: 6000, showProgressBar: false }
          );
        }
      );
  }
  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 80) {
      this.print();
      return false;
    }
  }
  print() {
    this.spinner.show();
    this.orderservice.PrintDeleiverMoneyForClient(this.printnumber).subscribe(res => {
      let blob = new Blob([res], { type: 'application/pdf' });
      var downloadURL = window.URL.createObjectURL(blob);
      window.open(downloadURL, '_blank');

      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "تسديد العميل" + ".pdf";
      link.click();
      this.spinner.hide();
      this.notifications.success('success', 'تمت الطباعة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.showPrintbtn = true;
    }, err => {
      this.spinner.hide();
    })
  }

}
