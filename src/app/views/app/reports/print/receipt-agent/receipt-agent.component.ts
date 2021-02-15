import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-receipt-agent',
  templateUrl: './receipt-agent.component.html',
  styleUrls: ['./receipt-agent.component.scss']
})
export class ReceiptAgentComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer) { }
  heads = ['ترقيم', 'كود', 'الإجمالي', 'المحافظة ', 'الهاتف', 'اسم العميل', 'ملاحظات']
  @Input() orders: any[] = []
  count = 0
  @Input() agent
  @Input() orderplaced
  dateOfPrint=new Date()
  userName:any=JSON.parse(localStorage.getItem('kokazUser'))as UserLogin

  ngOnInit(): void {

  }
  sumCost() {
    if(this.orders)
    this.orders.forEach(o => {
      this.count += o.cost
    })
    return this.count
  }
}
