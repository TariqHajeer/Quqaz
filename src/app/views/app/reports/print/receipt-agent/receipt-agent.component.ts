import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService } from 'angular2-notifications';
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
    heads=['ترقيم','كود','الإجمالي','المحافظة ','الهاتف','اسم العميل','ملاحظات']
    orders:any[]= JSON.parse(localStorage.getItem('printorders'))
    count=1500
    agent=this.orders.map(o=>o.agent)[0]
    orderplaced=this.orders.map(o=>o.orderplaced)[0]
    ngOnInit(): void {
  
    console.log(this.orders)

  }
get(){
}
}
