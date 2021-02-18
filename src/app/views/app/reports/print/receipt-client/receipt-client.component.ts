import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-receipt-client',
  templateUrl: './receipt-client.component.html',
  styleUrls: ['./receipt-client.component.scss']
})
export class ReceiptClientComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef) { }
  heads = ['ترقيم', 'كود', 'الإجمالي', 'المحافظة ', 'الهاتف',  'ملاحظات']
  @Input() orders: any[] = []
  count = 0
  @Input() client
  dateOfPrint=new Date()
  userName:any=JSON.parse(localStorage.getItem('kokazUser'))as UserLogin

  ngOnInit(): void {

  }
  ngOnChanges() {
    this.sumCost()
  }
  sumCost() {
    this.count=0
    if(this.orders)
    this.orders.forEach(o => {
      this.count += o.cost
    })
    return this.count
  }
}
