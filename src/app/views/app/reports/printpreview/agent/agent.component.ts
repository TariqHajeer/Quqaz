import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { OrderService } from 'src/app/services/order.service';
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
  ngOnInit(): void {
    this.orders = JSON.parse(localStorage.getItem('printordersagent'))
    this.agent = this.orders.map(o => o.agent)[0]
    console.log(this.agent)
    this.orderplaced = this.orders.map(o => o.orderplaced)[0]
    this.sumCost()
    this.getPrintnumber()
  }

  sumCost() {
    this.count = 0
    if (this.orders)
      this.orders.forEach(o => {
        this.count += o.cost
      })
    return this.count
  }
  afterPrint() {
    this.orderservice.MakeOrderInWay(this.orders.map(o => o.id)).subscribe(res => {
      this.notifications.create('success', 'تم نقل الطلبيات من المخزن الى الطريق بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      //this.orders=[]
    })
  }
  getPrintnumber(){
    this.orderservice.GetAgentPrintNumber().subscribe(res=>{
      this.printnumber=res
    })
  }
  setPrintnumber(){
    this.orderservice.SetAgentPrintNumber( this.printnumber).subscribe(res=>{

    })
  }
}
