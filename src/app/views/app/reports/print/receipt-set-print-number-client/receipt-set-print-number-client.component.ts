import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-receipt-set-print-number-client',
  templateUrl: './receipt-set-print-number-client.component.html',
  styleUrls: ['./receipt-set-print-number-client.component.scss']
})
export class ReceiptSetPrintNumberClientComponent implements OnInit ,OnChanges{

  constructor(private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef) { }
    //'موقع المبلغ', 'حالة الشحنة '
    heads = ['ترقيم', 'رقم الوصل', 'الإجمالي','الرسوم',' يدفع للعميل', 'المحافظة ', 'الهاتف', 'ملاحظات']
    @Input() orders: any[] = []
  count = 0
  @Input() client
  @Input() printnumber
  @Input()destinationPhone

  dateOfPrint=new Date()
  address="أربيل - شارع 40 - قرب تقاطع كوك"
  companyPhone="07514550880 - 07700890880"
  @Input() userName
  ngOnInit(): void {

  }
  ngOnChanges() {
    this.sumCost()
  }
  deliveryCostCount
  sumCost() {
    this.count = 0
    this.deliveryCostCount = 0
    if (this.orders)
      this.orders.forEach(o => {
        this.count += o.cost
        this.deliveryCostCount +=  o.deliveryCost
      })
    return this.count
  }
}