import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { PrintNumberOrder } from 'src/app/Models/order/PrintNumberOrder.model';
import { OrderService } from 'src/app/services/order.service';

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
  userName: any = JSON.parse(localStorage.getItem('kokazUser')) as UserLogin
  printnumber
  PrintNumberOrder: PrintNumberOrder
  ngOnInit(): void {
  
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

  changeDeleiverMoneyForClient() {
    this.orderservice.GetOrderByClientPrintNumber(this.printnumber).subscribe(res => {
      this.showPrintbtn = true
      this.orders=res
      this.client=this.orders[0].client
     this.sumCost()
    }, err => {
      this.showPrintbtn = true

    })

  }
}
