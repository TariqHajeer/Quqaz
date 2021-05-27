import { AfterViewInit, ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { OrderService } from 'src/app/services/order.service';
import { PrintNumberOrder } from 'src/app/Models/order/PrintNumberOrder.model';
import * as jspdf from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';  

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
  ) { }
  heads = ['ترقيم', 'كود', 'الإجمالي', 'المحافظة ', 'الهاتف', 'اسم العميل', 'ملاحظات']
  orders: any[] = []
  count = 0
  agent
  orderplaced
  dateOfPrint = new Date()
  userName: any = JSON.parse(localStorage.getItem('kokazUser')) as UserLogin
  printnumber
  PrintNumberOrder: PrintNumberOrder
  address = "أربيل - شارع 40 - قرب تقاطع كوك"
  companyPhone = "07514550880 - 07700890880"
  ngOnInit(): void {
    this.PrintNumberOrder = new PrintNumberOrder
    this.orders = JSON.parse(localStorage.getItem('printordersagent'))
    this.agent = JSON.parse(localStorage.getItem('printagent'))
    this.orderplaced = this.orders.map(o => o.orderplaced)[0]
    this.sumCost()
    this.onAWay()
    // this.getPrintnumber()
  }

  sumCost() {
    this.count = 0
    if (this.orders)
      this.orders.forEach(o => {
        this.count += o.cost
      })
    return this.count
  }
  showPrintbtn = false
  onAWay() {
    if (this.orderplaced.id == 2)
      this.showPrintbtn = false
    else
      this.showPrintbtn = true
  }
  afterPrint() {
    this.spinner.show()
    this.orderservice.MakeOrderInWay(this.orders.map(o => o.id)).subscribe(res => {
      this.notifications.create('success', 'تم نقل الطلبيات من المخزن الى الطريق بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      //this.orders=[]
      this.printnumber = res.printNumber
      this.showPrintbtn = true
      this.spinner.hide()

      //  this.setPrintnumber()

    }, err => {
      this.spinner.hide()
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
    const pdf = new jspdf('p', 'cm', 'a5');
    pdf.addHTML(elementToPrint, () => {
      pdf.save(this.dateOfPrint + '.pdf');
    });
  }
  print() {
    var divToPrint = document.getElementById('contentToConvert');
    var css = '@page { size: landscape; }',
      style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    style.appendChild(document.createTextNode(css));
    divToPrint.appendChild(style);
    var newWin = window.open('', 'Print-Window');
    newWin?.document.open();
    newWin?.document.write('<html dir="rtl"><head><style media="print">th{background-color: rgb(153, 1, 1);color: rgb(250, 250, 250);}</style><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><link rel="stylesheet/less" type="text/css" href="app/reports/printpreview/agent/agent.component.less" /></head><body onload="window.print()">' + divToPrint?.innerHTML + '</body></html>');
    newWin?.document.close();
    setTimeout(function () {
      newWin?.close();
      // location.reload();

    }, 10);

  }

}
