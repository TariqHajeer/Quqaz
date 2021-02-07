import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  constructor() { }
  tempPhone
  orders:any[]=[]
  ngOnInit(): void {
    this.orders=JSON.parse(localStorage.getItem('printorders'))
    console.log(this.orders)
  }

}
