import { ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { PrintNumberOrder } from 'src/app/Models/order/PrintNumberOrder.model';
import { OrderService } from 'src/app/services/order.service';
import * as jspdf from 'jspdf';

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
  heads = ['ترقيم', 'كود', 'الإجمالي','الرسوم',' يدفع للعميل', 'المحافظة ', 'الهاتف', 'ملاحظات']
  orders: any[] = []
  count = 0
  client
  dateOfPrint = new Date()
  userName: any = JSON.parse(localStorage.getItem('kokazUser')) as UserLogin
  printnumber
  PrintNumberOrder: PrintNumberOrder
  address="أربيل - شارع 40 - قرب تقاطع كوك"
  companyPhone="07514550880 - 07700890880"
  ngOnInit(): void {
    this.PrintNumberOrder = new PrintNumberOrder
    this.orders = JSON.parse(localStorage.getItem('orderincompany'))
    this.client = JSON.parse(localStorage.getItem('clientorderincompany'))
    this.sumCost()
  //  this.getPrintnumber()
  }
  deliveryCostCount
  sumCost() {
    this.count = 0
    this.deliveryCostCount = 0
    if (this.orders)
      this.orders.forEach(o => {
        this.count += o.order.cost
        this.deliveryCostCount +=o.order.deliveryCost
      })
    return this.count
  }

  showPrintbtn = false

  changeDeleiverMoneyForClient() {
    this.orderservice.DeleiverMoneyForClientWithStatus(this.orders.map(o => o.order.id)).subscribe(res => {
      this.notifications.create('success', 'تم تعديل الطلبيات  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.showPrintbtn = true
      this.printnumber=res.printNumber
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
      pdf.save(this.dateOfPrint+'.pdf');
    });
   
    
  }
  RowClass(order):string{
    console.log(order)
    switch(order.orderplaced.id){
      case"5":
      return"Holisticrebound"
      case"6":
      return"Partialrefund"
      case"8":
      return"delay"
      case"7":
      return"unacceptable"
      case"4":
      return"Delivery"
      default:
      return "default"
    } 
  }
}
