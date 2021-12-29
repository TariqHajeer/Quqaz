import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipts-new-orders',
  templateUrl: './receipts-new-orders.component.html',
  styleUrls: ['./receipts-new-orders.component.scss']
})
export class ReceiptsNewOrdersComponent implements OnInit {

  constructor() { }
 @Input() orders: any[] = [];
  ngOnInit(): void {
    // this.orders=JSON.parse(localStorage.getItem("printneworders"));
  }
  print() {
    // this.OrderService.AddPrintNumber(element.id).subscribe(res => {
    //   element.printedTimes += 1

    // })
    var divToPrint = document.getElementById('contentToConvert');
    var css = '@page { size: A5 landscape ;margin: 0;color-adjust: exact;-webkit-print-color-adjust: exact;}',
      style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    style.appendChild(document.createTextNode(css));
    divToPrint.appendChild(style);
    var newWin = window.open('', 'Print-Window');
    newWin?.document.open();
    newWin?.document.write('<html dir="rtl"><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><link rel="stylesheet/less" type="text/css" href="app/reports/printpreview/agent/agent.component.less" /></head><body onload="window.print()">' + divToPrint?.innerHTML + '</body></html>');
    newWin?.document.close();
    setTimeout(function () {
      newWin?.close();
      // location.reload();
      // this.get()

    }, 1000);
  }
}
