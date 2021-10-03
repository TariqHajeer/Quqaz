import { ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { PrintNumberOrder } from 'src/app/Models/order/PrintNumberOrder.model';
import { OrderService } from 'src/app/services/order.service';
import * as jspdf from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReciptService } from 'src/app/services/recipt.service';
import { ActivatedRoute } from '@angular/router';
import { OrderplacedEnum } from 'src/app/Models/Enums/OrderplacedEnum';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-set-print-number-client',
  templateUrl: './set-print-number-client.component.html',
  styleUrls: ['./set-print-number-client.component.scss']
})
export class SetPrintNumberClientComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    private recepitservce: ReciptService,
    public getroute: ActivatedRoute

  ) { }
  heads = ['ترقيم', 'كود', 'الإجمالي', 'المحافظة ', 'موقع المبلغ', 'حالة الشحنة ', 'الهاتف', 'ملاحظات']
  orders: any[] = []
  count = 0
  client
  dateOfPrint = new Date()
  userName
  printnumber
  PrintNumberOrder: PrintNumberOrder
  reports: any[] = []
  clientCalc = 0
  address = environment.Address
  companyPhone = environment.companyPhones[0]+" - "+ environment.companyPhones[1]
  orderplaced: any[] = [
    { id: 3, name: "في الطريق" },
    { id: 4, name: "تم التسليم" },
    { id: 5, name: "مرتجع كلي" },
    { id: 6, name: "مرتجع جزئي" },
    { id: 7, name: "مرفوض" },
  ]
  ngOnInit(): void {

    this.changeDeleiverMoneyForClient()
  }

  deliveryCostCount
  sumCost() {
    this.count = 0
    this.deliveryCostCount = 0
    this.clientCalc = 0
    if (this.orders)
      this.orders.forEach(o => {
        this.count += o.total
        this.deliveryCostCount += o.deliveCost
       this.clientCalc+=o.payForClient
      })

    return this.count
  }
  payForCleint(element): any {
    if (element.orderplaced == null)
      return "-"
    if (!element.isClientDiliverdMoney) {

      if (element.orderplaced.id == OrderplacedEnum.CompletelyReturned)
        return 0;
      return element.total - element.deliveCost;

    }
    else {

      //مرتجع كلي
      if (element.orderplaced.id == OrderplacedEnum.CompletelyReturned)
        return element.oldDeliveryCost - element.lastTotal;
      //مرفوض
      else if (element.orderplaced.id == OrderplacedEnum.Unacceptable)
        return (-element.lastTotal);
      //مرتجع جزئي
      else if (element.orderplaced.id == OrderplacedEnum.PartialReturned)
        return element.total - element.lastTotal;
    }

  }
  reciptClient() {
    // this.recepitservce.UnPaidRecipt(this.client.id).subscribe(res => {
    //   this.reports = res
    // })
  }
  showPrintbtn = false
  destinationPhone
  reportstotal
  points
  changeDeleiverMoneyForClient() {
    this.getroute.params.subscribe(par => {
      this.printnumber = par['printnumber'] as any
    });
    this.spinner.show()
    this.orderservice.GetOrderByClientPrintNumber(this.printnumber).subscribe(res => {
      // console.log(res)
      // this.reciptClient()
      this.points=res.discount
      this.showPrintbtn = true
      this.spinner.hide()
      this.orders = res.orders
      this.orders = this.orders.sort((a, b) => a.code - b.code)
      this.orderplaced = this.orderplaced.filter(op => this.orders.filter(o => o.orderplaced.id == op.id).length > 0)
      this.client = res.destinationName
      this.destinationPhone = res.destinationPhone
      this.userName = res.printerName
      this.dateOfPrint = res.date
      this.reports = res.receipts
      this.reportstotal = 0
      this.reports.forEach(r => {
        this.reportstotal += r.amount
      })
      this.sumCost()


    }, err => {
      this.spinner.hide()
      this.showPrintbtn = false
      this.notifications.create('success', 'رقم الطباعة غير موجود', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });

    })

  }
  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 80) {
      this.convetToPDF()
      return false
    }
  }
  public convetToPDF() {
    const elementToPrint = document.getElementById('contentToConvert'); //The html element to become a pdf
    const pdf = new jspdf('p', 'mm', 'a4');
    pdf.addHTML(elementToPrint, () => {
      pdf.save(this.dateOfPrint + '.pdf');
    });
  }
  print() {
    var divToPrint = document.getElementById('contentToConvert');
    var css = '@page { size: A4 landscape;color-adjust: exact;-webkit-print-color-adjust: exact; }',
      style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    style.appendChild(document.createTextNode(css));
    divToPrint.appendChild(style);
    var newWin = window.open('', 'Print-Window');
    newWin?.document.open();
    newWin?.document.write('<html dir="rtl"><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><link rel="stylesheet/less" type="text/css" href="app/reports/printpreview/agent/agent.component.less" /></head><body onload="window.print()">' + divToPrint?.innerHTML + '</body></html>');
    newWin?.document.close();
    setTimeout(function () {
      newWin?.close();
      // location.reload();

    }, 1000);
  }

}
