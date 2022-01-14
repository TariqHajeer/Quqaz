import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { PrintNumberOrder } from 'src/app/Models/order/PrintNumberOrder.model';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';
import * as jspdf from 'jspdf';
import { AgentOrderService } from 'src/app/services/agent-order.service';
import * as moment from 'moment';

@Component({
  selector: 'app-show-report',
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.scss']
})
export class ShowReportComponent implements OnInit {


  constructor(private orderservice: AgentOrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
    public getroute: ActivatedRoute


  ) { }
  heads = ['ترقيم', 'كود', 'الإجمالي', 'المحافظة ', 'المنطقة', 'الهاتف', 'اسم العميل', 'ملاحظات العميل', 'مـلاحظـــــات']

  orders: any[] = []
  count = 0
  agent
  dateOfPrint = moment().format()
  userName
  printnumber
  PrintNumberOrder: PrintNumberOrder
  address = environment.Address
  companyPhone = environment.companyPhones[0] + " - " + environment.companyPhones[1]
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
      this.printnumber = par['id'] as any
    });
    // console.log(this.printnumber)
    this.spinner.show()
    this.orderservice.Printid(this.printnumber).subscribe(res => {
      this.spinner.hide()
      this.showPrintbtn = true
      this.orders = res.orders
      this.orders = this.orders.sort((a, b) => a.code - b.code)
      var address = ""
      for (let i = 0; i < this.orders.length; i++) {
        var space = 0
        if (this.orders[i].address)
          for (let j = 0; j < this.orders[i].address.length; j++) {
            address += this.orders[i].address[j]
            if (this.orders[i].address[j] == " ")
              space++
            if (space == 2) {
              this.orders[i].address = address
              address = ""
              break
            }
          }
      }
      this.agent = res.destinationName
      this.phones = res.destinationPhone
      this.printnumber = res.printNmber
      this.dateOfPrint = res.date
      this.userName = res.printerName
      this.sumCost()
    }, err => {
      // this.spinner.hide()
      // this.showPrintbtn = false
      // this.notifications.create('success', 'رقم الطباعة غير موجود', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });

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
