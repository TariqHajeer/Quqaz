import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserLogin } from 'src/app/Models/userlogin.model';

@Component({
  selector: 'app-receipt-new-orders',
  templateUrl: './receipt-new-orders.component.html',
  styleUrls: ['./receipt-new-orders.component.scss']
})
export class ReceiptNewOrdersComponent implements OnInit, OnChanges {

  constructor(public sanitizer: DomSanitizer,) { }
  @Input() order
  orderTypes: string[] = []
  counts: number[] = []
  ngOnInit(): void {
    // this.order.recipientPhones = this.order.recipientPhones.split(',')
    if( this.order.orderItems&&this.order.orderItems.length!=0){
      this.orderTypes = this.order.orderItems.map(o => o.orderTpye.name)
      this.counts = this.order.orderItems.map(o => o.count)
    }
  }
  ngOnChanges() {
  }
}
