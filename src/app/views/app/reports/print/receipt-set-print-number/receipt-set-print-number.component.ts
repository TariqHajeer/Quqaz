import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-receipt-set-print-number',
  templateUrl: './receipt-set-print-number.component.html',
  styleUrls: ['./receipt-set-print-number.component.scss']
})
export class ReceiptSetPrintNumberComponent implements OnInit, OnChanges {

  constructor(private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef) { }
  heads = ['ترقيم', 'كود', 'الإجمالي', 'المحافظة ', 'الهاتف', 'ملاحظات']
  @Input() orders: any[] = []
  count = 0
  @Input() agent
  @Input() orderplaced
  @Input() printnumber
  @Input() phones
  dateOfPrint = new Date()
  userName: any = JSON.parse(localStorage.getItem('kokazUser')) as UserLogin

  ngOnInit(): void {

  }
  // @HostListener('window:afterprint')
  // onafterprint() {
  //   console.log("tr")
  // }
  ngOnChanges() {
    console.log(this.orders)
    this.sumCost()
  }
  sumCost() {
    this.count = 0
    if (this.orders)
      this.orders.forEach(o => {
        this.count += o.total
      })
    return this.count
  }
}
