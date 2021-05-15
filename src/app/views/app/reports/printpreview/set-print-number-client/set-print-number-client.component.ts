import { ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { PrintNumberOrder } from 'src/app/Models/order/PrintNumberOrder.model';
import { OrderService } from 'src/app/services/order.service';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-set-print-number-client',
  templateUrl: './set-print-number-client.component.html',
  styleUrls: ['./set-print-number-client.component.scss']
})
export class SetPrintNumberClientComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef) { }
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
        this.deliveryCostCount += o.deliveryCost
      })
    return this.count
  }
  showPrintbtn = false
  destinationPhone
  changeDeleiverMoneyForClient() {
    this.orderservice.GetOrderByClientPrintNumber(this.printnumber).subscribe(res => {
      this.showPrintbtn = true
      console.log(res)
      this.orders = res.orders
      this.client = res.destinationName
      this.destinationPhone = res.destinationPhone
      this.userName = res.printerName
      this.dateOfPrint=res.date
      this.sumCost()
    }, err => {
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
}
