import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private notifications: NotificationsService,
    public sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef) { }
  heads = ['ترقيم', 'كود', 'الإجمالي', 'المحافظة ', 'موقع المبلغ', 'حالة الشحنة ', 'الهاتف', 'ملاحظات']
  orders: any[] = []
  count = 0
  client
  dateOfPrint = new Date()
  userName: any = JSON.parse(localStorage.getItem('kokazUser')) as UserLogin
  printnumber
  ngOnInit(): void {
    this.orders = JSON.parse(localStorage.getItem('printordersclient'))
    this.client = this.orders.map(o => o.client)[0]
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
 
  
changeDeleiverMoneyForClient(){
  this.orderservice.DeleiverMoneyForClient(this.orders.map(o=>o.id)).subscribe(res=>{
    this.notifications.create('success', 'تم تعديل الطلبيات  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

   
  })
}   
getPrintnumber(){
  this.orderservice.GetClientPrintNumber().subscribe(res=>{
    this.printnumber=res
  })
}
setPrintnumber(){
  this.orderservice.SetClientPrintNumber( this.printnumber).subscribe(res=>{

  })
}
}
