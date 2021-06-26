import { ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { PrintNumberOrder } from 'src/app/Models/order/PrintNumberOrder.model';
import { OrderService } from 'src/app/services/order.service';
import * as jspdf from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';

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
    ) { }
  heads = ['ترقيم', 'كود', 'الإجمالي', 'المحافظة ', 'موقع المبلغ', 'حالة الشحنة ', 'الهاتف', 'ملاحظات']
  orders: any[] = []
  count = 0
  client
  dateOfPrint = new Date()
  userName
  printnumber
  PrintNumberOrder: PrintNumberOrder
  address="أربيل - شارع 40 - قرب تقاطع كوك"
  companyPhone="07514550880 - 07700890880"
  ngOnInit(): void {

  }

  deliveryCostCount
  sumCost() {
    this.count = 0
    this.deliveryCostCount = 0
    if (this.orders)
      this.orders.forEach(o => {
        this.count += o.total
        this.deliveryCostCount += o.deliveCost
      })
    return this.count
  }
  showPrintbtn = false
  destinationPhone
  changeDeleiverMoneyForClient() {
    this.spinner.show()
    this.orderservice.GetOrderByClientPrintNumber(this.printnumber).subscribe(res => {
      this.showPrintbtn = true
      this.spinner.hide()
      this.orders = res.orders
      this.orders=this.orders.sort((a,b)=>a.code-b.code)
      this.client = res.destinationName
      this.destinationPhone = res.destinationPhone
      this.userName = res.printerName
      this.dateOfPrint=res.date
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
    var css = '@page { size: landscape; }',
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
  TestCalc(element): number {
    if (!element.isClientDiliverdMoney){
      if(element.orderplaced.id==5)
      return 0;
      else if(element.orderplaced.id==7)
      return element.deliveryCost;
      return element.cost - element.deliveryCost;
     
    }
    else{ 
      //مرتجع كلي
      if(element.orderplaced.id==5)
      return element.deliveryCost- element.cost ;
      //مرفوض
      else if(element.orderplaced.id==7)
      return (-element.cost);
      //مرتجع جزئي
      else if(element.orderplaced.id==6)
      return element.cost-  element.oldCost;
    }
    
  }
}
