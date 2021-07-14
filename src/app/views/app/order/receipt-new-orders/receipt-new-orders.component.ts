import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UserLogin } from 'src/app/Models/userlogin.model';

@Component({
  selector: 'app-receipt-new-orders',
  templateUrl: './receipt-new-orders.component.html',
  styleUrls: ['./receipt-new-orders.component.scss']
})
export class ReceiptNewOrdersComponent implements OnInit {

  constructor(public sanitizer: DomSanitizer,) { }
  @Input() order
  ngOnInit(): void {
  }

}
