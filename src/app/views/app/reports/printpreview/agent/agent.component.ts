import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { OrderService } from 'src/app/services/order.service';
import { PrintNumberOrder } from 'src/app/Models/order/PrintNumberOrder.model';
import * as jspdf from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderplacedEnum } from 'src/app/Models/Enums/OrderplacedEnum';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss'],
})
export class AgentComponent implements OnInit {
  constructor(
    private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}
  heads = [
    'ترقيم',
    'كود',
    'الإجمالي',
    'التاريخ',
    'المحافظة ',
    'المنطقة / العنوان',
    'الهاتف',
    'اسم العميل',
    'ملاحظات العميل',
    'مـلاحظـــــات',
  ];
  orders: any[] = [];
  count = 0;
  agent;
  orderplaced;
  dateOfPrint = new Date();
  userName: UserLogin = this.authService.getUser();
  printnumber;
  PrintNumberOrder: PrintNumberOrder;
  address = environment.Address;
  companyPhone =
    environment.companyPhones[0] + ' - ' + environment.companyPhones[1];
  ngOnInit(): void {
    this.PrintNumberOrder = new PrintNumberOrder();
    this.orders = JSON.parse(localStorage.getItem('printordersagent'));
    this.orders = this.orders.sort((a, b) => a.code - b.code);
    console.log(this.orders);
    this.agent = JSON.parse(localStorage.getItem('printagent'));
    this.orderplaced = this.orders.map((o) => o.orderplaced)[0];
    this.sumCost();
    this.onAWay();
    var address = '';
    for (let i = 0; i < this.orders.length; i++) {
      var space = 0;
      if (this.orders[i].address)
        for (let j = 0; j < this.orders[i].address.length; j++) {
          address += this.orders[i].address[j];
          if (this.orders[i].address[j] == ' ') space++;
          if (space == 2) {
            this.orders[i].address = address;
            address = '';
            break;
          }
        }
    }

    // this.getPrintnumber()
  }

  sumCost() {
    this.count = 0;
    if (this.orders)
      this.orders.forEach((o) => {
        this.count += o.cost;
      });
    return this.count;
  }
  showPrintbtn = false;
  showPrintnumber = false;
  onAWay() {
    if (this.showPrintnumber == true) return;
    if (this.orderplaced.id == OrderplacedEnum.Store) {
      this.showPrintnumber = false;
      this.showPrintbtn = false;
    } else {
      this.showPrintnumber = true;
      this.showPrintbtn = true;
    }
  }
  dateWithIds;

  afterPrint() {
    this.spinner.show();
    this.dateWithIds = {
      Ids: this.orders.map((o) => o.id),
      // Date: moment().format()
    };
    this.orderservice.MakeOrderInWay(this.dateWithIds.Ids).subscribe(
      (res) => {
        this.notifications.create(
          'success',
          'تم نقل الطلبيات من المخزن الى الطريق بنجاح',
          NotificationType.Success,
          { theClass: 'success', timeOut: 6000, showProgressBar: false }
        );
        //this.orders=[]
        this.printnumber = res;
        this.showPrintbtn = true;
        this.spinner.hide();

        //  this.setPrintnumber()
      },
      (err) => {
        this.spinner.hide();
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
    pdf.addHTML(elementToPrint, () => {
      pdf.save(this.dateOfPrint + '.pdf');
    });
  }
  print() {
    var divToPrint = document.getElementById('contentToConvert');
    var css =
        '@page { size: A4 landscape;color-adjust: exact;-webkit-print-color-adjust: exact;} @media print {table{margin-bottom:10%;}}',
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
      // location.reload();
    }, 1000);
  }
}
