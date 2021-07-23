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
  ngOnInit(): void {
    this.order.recipientPhones = this.order.recipientPhones.split(',')

  }
  ngOnChanges() {
  }
}
