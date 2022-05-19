import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ReceiptOfTheOrderStatus } from 'src/app/Models/order/receipt-of-the-order-status.model';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-print-receipt-shipment',
  templateUrl: './print-receipt-shipment.component.html',
  styleUrls: ['./print-receipt-shipment.component.scss'],
})
export class PrintReceiptShipmentComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    public getroute: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {}
  id: number;
  receiptOfTheOrderStatus: ReceiptOfTheOrderStatus =
    new ReceiptOfTheOrderStatus();
  heads = [
    'ترقيم',
    'رقم العملية',
    'كود',
    'كلفة الشحنة',
    'كلفة توصيل المندوب',
    'العميل',
    'المندوب ',
    'حالة الشحنة',
    'موقع المبلغ',
  ];
  cost = 0;
  agentCost = 0;
  dateOfPrint = new Date();
  userName: any = JSON.parse(localStorage.getItem('kokazUser')) as UserLogin;
  address = environment.Address;
  companyPhone =
    environment.companyPhones[0] + ' - ' + environment.companyPhones[1];
  dataSource;
  @Input() totalCount: number;
  noDataFound: boolean = false;
  ngOnInit(): void {
    this.get();
  }
  get() {
    this.getroute.params.subscribe((par) => {
      this.id = par['id'] as any;
      this.orderService.ReceiptOfTheOrderStatu(this.id).subscribe((res) => {
        this.receiptOfTheOrderStatus.receiptOfTheOrderStatusDetalis = [];
        this.receiptOfTheOrderStatus = res.data;
        this.sumCost();
      });
    });
  }
  print() {
    var divToPrint = document.getElementById('contentToConvert');
    var css =
        '@page { size: A4 landscape;color-adjust: exact;-webkit-print-color-adjust: exact;} @media print {table{margin-bottom:10%;}}',
      style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    style.appendChild(document.createTextNode(css));
    divToPrint.appendChild(style);
    var newWin = window.open('', 'Print-Window');
    newWin?.document.open();
    newWin?.document.write(
      '<html dir="rtl"><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><link rel="stylesheet/less" type="text/css" href="app/reports/printpreview/agent/agent.component.less" /></head><body onload="window.print()">' +
        divToPrint?.innerHTML +
        '</body></html>'
    );
    newWin?.document.close();
    setTimeout(function () {
      newWin?.close();
      // location.reload();
    }, 1000);
  }
  sumCost() {
    this.cost = 0;
    this.agentCost = 0;
    if (this.receiptOfTheOrderStatus.receiptOfTheOrderStatusDetalis.length > 0)
      this.receiptOfTheOrderStatus.receiptOfTheOrderStatusDetalis.forEach(
        (o) => {
          this.cost += o.cost;
          this.agentCost += o.agentCost;
        }
      );
  }
}
