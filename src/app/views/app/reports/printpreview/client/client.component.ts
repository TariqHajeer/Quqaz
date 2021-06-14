import { ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { PrintNumberOrder } from 'src/app/Models/order/PrintNumberOrder.model';
import { OrderService } from 'src/app/services/order.service';
import * as jspdf from 'jspdf';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef,
    private spinner: NgxSpinnerService,
  ) { }
  // 'موقع المبلغ', 'حالة الشحنة '
  heads = ['ترقيم', 'كود', 'الإجمالي', 'الرسوم', ' يدفع للعميل', 'المحافظة ', 'الهاتف', 'ملاحظات']
  orders: any[] = []
  count = 0
  client
  dateOfPrint = new Date()
  userName: any = JSON.parse(localStorage.getItem('kokazUser')) as UserLogin
  printnumber
  PrintNumberOrder: PrintNumberOrder
  orderplaced
  address = "أربيل - شارع 40 - قرب تقاطع كوك"
  companyPhone = "07514550880 - 07700890880"
  ngOnInit(): void {
    this.PrintNumberOrder = new PrintNumberOrder
    this.orders = JSON.parse(localStorage.getItem('printordersclient'))
    this.client = JSON.parse(localStorage.getItem('printclient'))
    this.sumCost()
    //  this.getPrintnumber()
  }
  deliveryCostCount
  sumCost() {
    this.count = 0
    this.deliveryCostCount = 0
    this.clientCalc=0
    if (this.orders)
      this.orders.forEach(o => {
        this.count += o.cost
        this.deliveryCostCount += o.deliveryCost
        if (!o.isClientDiliverdMoney) {
          if (o.orderplaced.id == 5) {
            this.clientCalc += 0
            return 0;
          }
          else if (o.orderplaced.id == 7) {
            this.clientCalc += o.deliveryCost
            return o.deliveryCost;
          }
          this.clientCalc += o.cost - o.deliveryCost
          return o.cost - o.deliveryCost;
    
        }
        else {
          //مرتجع كلي
          if (o.orderplaced.id == 5) {
            this.clientCalc+=o.deliveryCost - o.cost
            return o.deliveryCost - o.cost;
          }
          //مرفوض
          else if (o.orderplaced.id == 7) {
            this.clientCalc+=(-o.cost)
            return (-o.cost);
          }
          //مرتجع جزئي
          else if (o.orderplaced.id == 6) {
            this.clientCalc+=o.cost - o.oldCost;
            return o.cost - o.oldCost;
          }
        }
      })
    return this.count
  }

  showPrintbtn = false

  changeDeleiverMoneyForClient() {
    this.spinner.show()
    this.orderservice.DeleiverMoneyForClient(this.orders.map(o => o.id)).subscribe(res => {
      this.notifications.create('success', 'تم تعديل الطلبيات  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.showPrintbtn = true
      this.spinner.hide()
      this.printnumber = res.printNumber
      // this.setPrintnumber()
    }, err => {
      this.showPrintbtn = true
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
    const pdf = new jspdf('l', 'in', 'a4');
    pdf.internal.scaleFactor = 30;
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
    newWin?.document.write('<html dir="rtl"><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><link rel="stylesheet/less" type="text/css" href="app/reports/printpreview/agent/agent.component.less" /></head><body onload="window.print()">' + divToPrint?.innerHTML + '</body></html>');
    newWin?.document.close();
    setTimeout(function () {
      newWin?.close();
      // location.reload();

    }, 10);
  }
  clientCalc = 0
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
