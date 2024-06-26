import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderplacedEnum } from 'src/app/Models/Enums/OrderplacedEnum';
import { DeleiverMoneyForClientDto } from 'src/app/Models/order/deleiver-money-for-client-dto.model';
import { DateWithId } from 'src/app/Models/order/order.model';
import { PointSetting } from 'src/app/Models/pointSettings/point-setting.model';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { OrderService } from 'src/app/services/order.service';
import { ReciptService } from 'src/app/services/recipt.service';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';
import { Client } from '../../client/client.model';
import { Paging } from 'src/app/Models/paging';
import { BranchDetailsService } from 'src/app/services/branch-details.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-view-print-orders-dont-finished-detils',
  templateUrl: './view-print-orders-dont-finished-detils.component.html',
  styleUrls: ['./view-print-orders-dont-finished-detils.component.scss']
})
export class ViewPrintOrdersDontFinishedDetilsComponent implements OnInit {

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
  dateWithIds: DateWithId<number[]>;
  DeleiverMoneyForClientDto: DeleiverMoneyForClientDto =
    new DeleiverMoneyForClientDto();
  pointid = null;
  showSeeMore: boolean;
  constructor(
    private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService,
    private recepitservce: ReciptService,
    private authService: AuthService,
    private router: Router,
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
  sumCost() {
    this.count = 0;
    this.deliveryCostCount = 0;
    this.clientCalc = 0;
    if (this.orders)
      this.orders.forEach((o) => {
        this.count += o.cost;
        this.deliveryCostCount += o.deliveryCost;
        this.clientCalc += o.payForClient;
      });

    return this.count;
  }
  getOrdersDontFinished() {
    this.orderservice.OrdersDontFinished().subscribe(response => {

      if (this.orderservice.orderClientDontDiliverdMoney.paging.Page == 1)
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
        this.router.navigate(['/app/reports/Shipmentsnotbeendelivered']);
      this.reciptClient();
      this.sumCost();
    });
  }
  getOrders() {
    this.client = this.orderservice.deleiverMoneyForClientDto.Filter.Client;
    this.orderplaced = this.orderservice.deleiverMoneyForClientDto.Filter.OrderPlaced;
    this.pointid = this.orderservice.deleiverMoneyForClientDto.PointsSettingId;
    this.points = this.orderservice.deleiverMoneyForClientDto.point;

    if (this.orderservice.orderClientDontDiliverdMoney.tableSelection.selectedIds.length == 0
      && this.orderservice.orderClientDontDiliverdMoney.tableSelection.isSelectedAll == false) {
      this.router.navigate(['/app/reports/Shipmentsnotbeendelivered']);
      return;
    }
    this.orderservice.orderClientDontDiliverdMoney.paging = new Paging();
    this.getOrdersDontFinished();

  }
  seeMore() {
    this.orderservice.orderClientDontDiliverdMoney.paging.Page += 1;
    this.getOrdersDontFinished();
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
    this.orderservice.PrintSendOrdersReturnedToSecondBranchReport(this.printnumber).subscribe(res => {
      let blob = new Blob([res], { type: 'application/pdf' });
      var downloadURL = window.URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = downloadURL;
      link.download = "help.pdf";
      link.click();
      this.spinner.hide();
      this.notifications.success('success', 'تمت الطباعة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    }, err => {
      this.spinner.hide();
    })
  }



}
