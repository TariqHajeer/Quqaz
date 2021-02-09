import { Component, HostListener, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  constructor(private orderservice: OrderService,) { }
  tempPhone
  orders: any[] = []
  ngOnInit(): void {
    this.orders = JSON.parse(localStorage.getItem('printorders'))
    console.log(this.orders)
  }
  afterPrint() {
    // const printContent = document.getElementById("print");
    // const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    // WindowPrt.document.write(printContent.innerHTML);
    // WindowPrt.document.write(printContent.style.all);

    // WindowPrt.document.write('<link rel="stylesheet" type="text/css" href="/assets/css/vendor/bootstrap.min.css">');
    // WindowPrt.document.close();
    // WindowPrt.focus();
    // WindowPrt.print();
    // WindowPrt.close();
    //setTimeout(() => window.print());

    // this.onafterprint() 
    // var afterPrint = function () {
    //   console.log('Functionality to run after printing');
    // };
    // window.onafterprint = afterPrint;
    this.orderservice.MakeOrderInWay(this.orders.map(o=>o.id)).subscribe(res=>{
      console.log('true')
    })
  }
  // @HostListener('window:afterprint', ['$event'])
  // @HostListener('click', ['$event.target'])
  @HostListener('window:afterprint', ['$event'])
  onafterprint() {
    console.log("ggggggggggg")
    
  }

}
