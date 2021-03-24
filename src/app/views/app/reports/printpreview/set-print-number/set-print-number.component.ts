import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { PrintNumberOrder } from 'src/app/Models/order/PrintNumberOrder.model';
import { OrderService } from 'src/app/services/order.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-set-print-number',
  templateUrl: './set-print-number.component.html',
  styleUrls: ['./set-print-number.component.scss']
})
export class SetPrintNumberComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef) { }
    heads = ['ترقيم', 'كود', 'الإجمالي', 'المحافظة ', 'الهاتف',  'ملاحظات']
    orders: any[] = []
  count = 0
  agent
  dateOfPrint = new Date()
  userName
  printnumber
  PrintNumberOrder: PrintNumberOrder
  ngOnInit(): void {
  
  }

  sumCost() {
    this.count = 0
    if (this.orders)
      this.orders.forEach(o => {
        this.count += o.total
      })
    return this.count
  }

  showPrintbtn = false
  phones
  changeDeleiverMoneyForClient() {
    this.orderservice.GetOrderByAgnetPrintNumber(this.printnumber).subscribe(res => {
     console.log(res)
      this.showPrintbtn = true
      this.orders=res.orders
      this.agent=res.destinationName
      this.phones=res.destinationPhone
      this.printnumber=res.printNmber
      this.dateOfPrint=res.date
      this.userName=res.printerName
     this.sumCost()
    }, err => {
      this.showPrintbtn = true

    })

  }
  public convetToPDF()
  {
  var data = document.getElementById('contentToConvert');
  html2canvas(data).then(canvas => {
  // Few necessary setting options
  var imgWidth = 208;
  var imgHeight = canvas.height * imgWidth / canvas.width;
  const contentDataURL = canvas.toDataURL('image/png')
  let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
  var position = 0;
  pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth,imgHeight)
  pdf.save('new-file.pdf'); // Generated PDF
  });
  }
}
