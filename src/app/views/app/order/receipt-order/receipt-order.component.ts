import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export enum ReceiptType {
  agentPrint="agentPrint",
  clientPrint="clientPrint",
  receiptPrint="receiptPrint",
}
@Component({
  selector: 'app-receipt-order',
  templateUrl: './receipt-order.component.html',
  styleUrls: ['./receipt-order.component.scss'],
})
export class ReceiptOrderComponent implements OnInit {
  constructor(private router:Router) {}
  @Input() ordersPrint: any;
  @Input() type:string;
  ngOnInit(): void {}
  printReceipt(number) {
    if(this.type==ReceiptType.agentPrint)
    this.router.navigate(['/app/reports/agentprintnumber/', number]);
    if(this.type==ReceiptType.clientPrint)
    this.router.navigate(['/app/reports/clientprintnumber/', number]);
    if(this.type==ReceiptType.receiptPrint)
    this.router.navigate(['/app/reports/printReceiptShipments/', number]);

  }
}
