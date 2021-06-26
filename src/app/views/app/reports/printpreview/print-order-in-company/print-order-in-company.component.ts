import { ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { PrintNumberOrder } from 'src/app/Models/order/PrintNumberOrder.model';
import { OrderService } from 'src/app/services/order.service';
import * as jspdf from 'jspdf';
import { IdCost } from 'src/app/Models/order/order.model';

@Component({
  selector: 'app-print-order-in-company',
  templateUrl: './print-order-in-company.component.html',
  styleUrls: ['./print-order-in-company.component.scss']
})
export class PrintOrderInCompanyComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef) { }
  // 'موقع المبلغ', 'حالة الشحنة '
  heads = ['ترقيم', 'كود', 'الإجمالي', 'الرسوم', ' يدفع للعميل', 'المحافظة ', 'الهاتف', 'ملاحظات']
  orders: any[] = []
  temporder: any[] = []

  count = 0
  client
  dateOfPrint = new Date()
  userName: any = JSON.parse(localStorage.getItem('kokazUser')) as UserLogin
  printnumber
  PrintNumberOrder: PrintNumberOrder
  address = "أربيل - شارع 40 - قرب تقاطع كوك"
  companyPhone = "07514550880 - 07700890880"
  i = 0
  ngOnInit(): void {
    this.PrintNumberOrder = new PrintNumberOrder
    this.IdCost = new IdCost
    this.orders = JSON.parse(localStorage.getItem('orderincompany'))
    this.temporder = JSON.parse(localStorage.getItem('temporderincompany'))
    this.client = JSON.parse(localStorage.getItem('clientorderincompany'))
    this.orders.forEach(o => {
      if (o.order.canEditCount == true)
        o.order.oldCost = this.temporder[this.i].order.cost
      this.i++
      this.IdCost.Id = o.order.id
      this.IdCost.Cost = o.order.cost
      this.IdCosts.push(this.IdCost)
    })
    this.sumCost()
    //  this.getPrintnumber()
  }
  deliveryCostCount
  sumCost() {
    this.count = 0
    this.deliveryCostCount = 0
    this.clientCalc = 0
    if (this.orders)
      this.orders.forEach(o => {
        this.count += o.order.cost
        this.deliveryCostCount += o.order.deliveryCost
        if (!o.order.isClientDiliverdMoney) {
          if (o.order.orderplaced.id == 5) {
            this.clientCalc += 0
            return 0;
          }
          else if (o.order.orderplaced.id == 7) {
            this.clientCalc += o.order.deliveryCost
            return o.order.deliveryCost;
          }
          this.clientCalc += o.order.cost - o.order.deliveryCost
          return o.order.cost - o.order.deliveryCost;

        }
        else {
          //مرتجع كلي
          if (o.order.orderplaced.id == 5) {
            this.clientCalc += o.order.deliveryCost - o.order.cost
            return o.order.deliveryCost - o.order.cost;
          }
          //مرفوض
          else if (o.order.orderplaced.id == 7) {
            this.clientCalc += (-o.order.cost)
            return (-o.order.cost);
          }
          //مرتجع جزئي
          else if (o.order.orderplaced.id == 6) {
            this.clientCalc += o.order.cost - o.order.oldCost;
            return o.order.cost - o.order.oldCost;
          }
        }
      })
    return this.count
  }

  showPrintbtn = false
  IdCost: IdCost
  IdCosts: IdCost[] = []

  changeDeleiverMoneyForClient() {
    this.orderservice.DeleiverMoneyForClientWithStatus(this.IdCosts).subscribe(res => {
      this.notifications.create('success', 'تم تعديل الطلبيات  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.showPrintbtn = true
      this.printnumber = res.printNumber
      // this.setPrintnumber()
    }, err => {
      this.showPrintbtn = true

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
  style(order) {
    if (order.orderplaced.id == 4)
      return "rgb(187, 253, 161)"
    else if (order.orderplaced.id == 5)
      return "rgb(250, 166, 166)"
    else if (order.orderplaced.id == 6)
      return "rgb(223, 221, 221)"
    else if (order.orderplaced.id == 7)
      return "rgb(139, 147, 255)"
    else if (order.orderplaced.id == 8)
      return "rgb(160, 243, 139)"
      else return "rgb(255, 255, 255)"
  }
  clientCalc = 0
  payForCleint(element): number {
    element=element.order
    if (!element.isClientDiliverdMoney) {
      if (element.orderplaced.id == 5)
        return 0;
      return element.cost - element.deliveryCost;

    }
    else {

      //مرتجع كلي
      if (element.orderplaced.id == 5)
        return element.deliveryCost - element.oldCost;
      //مرفوض
      else if (element.orderplaced.id == 7)
        return (-element.oldCost);
      //مرتجع جزئي
      else if (element.orderplaced.id == 6)
        return element.cost - element.oldCost;
    }

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
}
