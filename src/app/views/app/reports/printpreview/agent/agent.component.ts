import { AfterViewInit, ChangeDetectorRef, Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { OrderService } from 'src/app/services/order.service';
import { PrintNumberOrder } from 'src/app/Models/order/PrintNumberOrder.model';
import * as jspdf from 'jspdf';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef) { }
  heads = ['ترقيم', 'كود', 'الإجمالي', 'المحافظة ', 'الهاتف', 'اسم العميل', 'ملاحظات']
  orders: any[] = []
  count = 0
  agent
  orderplaced
  dateOfPrint = new Date()
  userName: any = JSON.parse(localStorage.getItem('kokazUser')) as UserLogin
  printnumber
  PrintNumberOrder: PrintNumberOrder
  address = "أربيل - شارع 40 - قرب تقاطع كوك"
  companyPhone = "07514550880 - 07700890880"
  ngOnInit(): void {
    this.PrintNumberOrder = new PrintNumberOrder
    this.orders = JSON.parse(localStorage.getItem('printordersagent'))
    this.agent = JSON.parse(localStorage.getItem('printagent'))
    this.orderplaced = this.orders.map(o => o.orderplaced)[0]
    this.sumCost()
    this.onAWay()
    // this.getPrintnumber()
  }

  sumCost() {
    this.count = 0
    if (this.orders)
      this.orders.forEach(o => {
        this.count += o.cost
      })
    return this.count
  }
  showPrintbtn = false
  onAWay(){
    if(this.orderplaced.id==2)
    this.showPrintbtn=false
    else
    this.showPrintbtn=true
  }
  afterPrint() {
    this.orderservice.MakeOrderInWay(this.orders.map(o => o.id)).subscribe(res => {
      this.notifications.create('success', 'تم نقل الطلبيات من المخزن الى الطريق بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      //this.orders=[]

      this.printnumber = res.printNumber
      this.showPrintbtn = true
      //  this.setPrintnumber()

    })
  }
  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if (($event.ctrlKey || $event.metaKey) && $event.keyCode == 80) {
      this.convetToPDF()
      return false
    }
  }
  public convetToPDF() {
    const elementToPrint = document.getElementById('contentToConvert'); //The html element to become a pdf
    const pdf = new jspdf('p', 'mm', 'a4');
    pdf.addHTML(elementToPrint, () => {
      pdf.save( this.dateOfPrint+'.pdf');
    });
  }

}
