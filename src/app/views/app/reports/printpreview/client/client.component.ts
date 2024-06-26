import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { PrintNumberOrder } from 'src/app/Models/order/PrintNumberOrder.model';
import { OrderService } from 'src/app/services/order.service';
import * as jspdf from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReciptService } from 'src/app/services/recipt.service';
import { OrderplacedEnum } from 'src/app/Models/Enums/OrderplacedEnum';
import {
  DateWithId,
  DeleiverMoneyForClientDto,
} from 'src/app/Models/order/order.model';
import { PointSetting } from 'src/app/Models/pointSettings/point-setting.model';
import { Client } from '../../../client/client.model';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { BranchDetailsService } from 'src/app/services/branch-details.service';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
})
export class ClientComponent implements OnInit {
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
  // 'موقع المبلغ', 'حالة الشحنة '
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
  count = 0;
  client: Client = new Client();
  dateOfPrint = new Date();
  userName: UserLogin = this.authService.getUser();
  printnumber;
  PrintNumberOrder: PrintNumberOrder;
  orderplaced;
  address = environment.Address;
  companyPhone =
    environment.companyPhones[0] + ' - ' + environment.companyPhones[1];
  reports: any[] = [];
  points: PointSetting = new PointSetting();
  reloadPage;
  reloadPrintNumber;
  ngOnInit(): void {
    this.PrintNumberOrder = new PrintNumberOrder();
    this.client.points = [];
    this.reloadPage = JSON.parse(localStorage.getItem('reloadPage'));
    if (this.reloadPage) {
      this.showPrintbtn = true;
      this.printnumber = JSON.parse(localStorage.getItem('reloadPrintNumber'));
    }
    this.orders = JSON.parse(localStorage.getItem('printordersclient'));
    this.orders = this.orders.sort((a, b) => a.code - b.code);
    this.client = JSON.parse(localStorage.getItem('printclient'));
    this.orderplaced = JSON.parse(
      localStorage.getItem('printclientorderplaced')
    );
    this.reciptClient();
    this.sumCost();
    this.points = JSON.parse(localStorage.getItem('point'));
    if (this.points) this.pointid = this.points.id;
    this.activeBranchDetais.getBranch().pipe(
      tap(data => {
        this.address = data.address;
        this.companyPhone = data.phoneNumber;
      })).subscribe();
  }
  deliveryCostCount;
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

  showPrintbtn = false;
  dateWithIds: DateWithId<number[]>;
  DeleiverMoneyForClientDto: DeleiverMoneyForClientDto =
    new DeleiverMoneyForClientDto();
  pointid = null;
  changeDeleiverMoneyForClient() {
    this.spinner.show();
    this.dateWithIds = {
      Ids: this.orders.map((c) => c.id),
    };
    this.DeleiverMoneyForClientDto = {
      Ids: this.orders.map((c) => c.id),
      PointsSettingId: this.pointid,
    };
    this.orderservice
      .DeleiverMoneyForClient(this.DeleiverMoneyForClientDto)
      .subscribe(
        (res) => {
          this.reloadPage = true;
          localStorage.setItem('reloadPage', this.reloadPage);
          this.reloadPrintNumber = res.printNumber;
          localStorage.setItem('reloadPrintNumber', this.reloadPrintNumber);
          this.notifications.create(
            'success',
            'تم تسليم  المبلغ  بنجاح',
            NotificationType.Success,
            { theClass: 'success', timeOut: 6000, showProgressBar: false }
          );
          this.showPrintbtn = true;
          this.spinner.hide();
          this.printnumber = res.printNumber;
          this.router.navigate(['/app/reports/clientprintnumber/', this.printnumber]);
          localStorage.removeItem('reloadPage');
          localStorage.removeItem('printordersclient');
          localStorage.removeItem('printclient');
          localStorage.removeItem('printclientorderplaced');
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
      this.convetToPDF();
      return false;
    }
  }
  public convetToPDF() {
    const elementToPrint = document.getElementById('contentToConvert'); //The html element to become a pdf
    const pdf = new jspdf('l', 'in', 'a4');
    pdf.internal.scaleFactor = 30;
    pdf.addHTML(elementToPrint, () => {
      pdf.save(this.dateOfPrint + '.pdf');
    });
  }
  print() {
    var divToPrint = document.getElementById('contentToConvert');
    var css =
      '@page { size: A4 landscape;color-adjust: exact;-webkit-print-color-adjust: exact; }',
      style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    style.appendChild(document.createTextNode(css));
    divToPrint.appendChild(style);
    var newWin = window.open('', 'Print-Window');
    newWin?.document.open();
    newWin?.document.write(
      '<html dir="rtl"><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><link rel="stylesheet/less" type="text/css" href="app/reports/printpreview/agent/agent.component.less" /></head><body onload="window.print()">' +
      divToPrint?.innerHTML +
      '</body></html>'
    );
    newWin?.document.close();
    setTimeout(function () {
      newWin?.close();
    }, 1000);
  }
  clientCalc = 0;
  reportstotal;

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
        console.log(res);
        this.reportstotal = 0;
        this.reports.forEach((r) => {
          this.reportstotal += r.amount;
        });
      });
    } else return;
  }
}
