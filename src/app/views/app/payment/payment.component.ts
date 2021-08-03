import { Component, OnInit } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { PaymentService } from 'src/app/services/payment.service'
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private paymentService: PaymentService,
    private notifications: NotificationsService,) { }
  payment: NameAndIdDto = new NameAndIdDto
  payments: NameAndIdDto[] = []
  PaymentWay
  ngOnInit(): void {
    this.GetPayment()
  }
  AddPayment() {
    if (!this.payment.name) {
      this.notifications.create('error', 'يجب ادخال الاسم', NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      return
    }
    this.paymentService.Add(this.payment).subscribe(res => {
      this.payment = new NameAndIdDto
      this.notifications.create('success', 'تمت الاضافة  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

    })
  }
  GetPayment() {
    this.paymentService.Get().subscribe(res => {
      this.payments = res
      // console.log(res)
    })
  }
  Delete(payment) {
    this.paymentService.delete(payment.id).subscribe(res => {
      this.payments = this.payments.filter(p => p != payment)
      this.notifications.create('success', 'تم الحذف  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

    })
  }
}
