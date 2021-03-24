import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { PrintNumberOrder } from 'src/app/Models/order/PrintNumberOrder.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-set-print-number',
  templateUrl: './set-print-number.component.html',
  styleUrls: ['./set-print-number.component.scss']
})
export class SetPrintNumberComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef) { }
  heads = ['ترقيم', 'كود', 'الإجمالي', 'المحافظة ', 'موقع المبلغ', 'حالة الشحنة ', 'الهاتف', 'ملاحظات']
  orders: any[] = []
  count = 0
  agent
  dateOfPrint = new Date()
  userName
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
    this.orderservice.GetOrderByAgnetPrintNumber(this.printnumber).subscribe(res => {
     console.log(res)
      this.showPrintbtn = true
      this.orders=res.orders
      this.agent.name=res.destinationName
      this.agent.phones=res.destinationPhone
      this.printnumber=res.printNmber
      this.dateOfPrint=res.date
      this.userName=res.printerName
     this.sumCost()
    }, err => {
      this.showPrintbtn = true

    })

  }
 
}
