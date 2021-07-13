import { ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { PrintNumberOrder } from 'src/app/Models/order/PrintNumberOrder.model';
import { OrderService } from 'src/app/services/order.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-set-print-number',
  templateUrl: './set-print-number.component.html',
  styleUrls: ['./set-print-number.component.scss']
})
export class SetPrintNumberComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    public getroute: ActivatedRoute


  ) { }
  heads = ['ترقيم', 'كود', 'الإجمالي', 'المحافظة ', 'المنطقة','الهاتف', 'اسم العميل', 'مـلاحظـــــات']
  orders: any[] = []
  count = 0
  agent
  dateOfPrint = new Date()
  userName
  printnumber
  PrintNumberOrder: PrintNumberOrder
  address="أربيل - شارع 40 - قرب تقاطع كوك"
  companyPhone="07514550880 - 07700890880"
  ngOnInit(): void {
this.changeDeleiverMoneyForClient()
  }

  sumCost() {
    this.count = 0
    if (this.orders)
      this.orders.forEach(o => {
        this.count += o.total
      })
    return this.count
  }

  showPrintbtn = false
  phones
  changeDeleiverMoneyForClient() {
    this.getroute.params.subscribe(par => {
      this.printnumber = par['printnumber'] as any
    });
    this.spinner.show()
    this.orderservice.GetOrderByAgnetPrintNumber(this.printnumber).subscribe(res => {
      this.spinner.hide()
      this.showPrintbtn = true
      this.orders = res.orders
      this.orders=this.orders.sort((a,b)=>a.code-b.code)
      this.agent = res.destinationName
      this.phones = res.destinationPhone
      this.printnumber = res.printNmber
      this.dateOfPrint = res.date
      this.userName = res.printerName
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
      pdf.save( this.dateOfPrint+'.pdf');
    });
  }
  print() {
    var divToPrint = document.getElementById('contentToConvert');
    var css = '@page { size: A4 landscape; }',
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

    }, 10);
  }
}
