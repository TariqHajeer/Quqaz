import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[];
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit(): void {
    this.GetPayment()
  }
  AddPayment() {
    if (!this.payment.name) {
      this.notifications.create('error', 'يجب ادخال الاسم', NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      return
    }
    this.paymentService.Add(this.payment).subscribe(res => {
      this.dataSource.data.push(this.payment);
      this.dataSource._updateChangeSubscription();
      this.payment = new NameAndIdDto
      this.notifications.create('success', 'تمت الاضافة  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

    })
  }
  GetPayment() {
    this.paymentService.Get().subscribe(res => {
      this.payments = res
      this.dataSource = new MatTableDataSource(this.payments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.displayedColumns = ['name', 'delete'];
      // console.log(res)
    })
  }
  Delete(payment) {
    this.paymentService.delete(payment.id).subscribe(res => {
      this.payments = this.payments.filter(p => p != payment)
      this.dataSource = new MatTableDataSource(this.payments);
      this.notifications.create('success', 'تم الحذف  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    })
  }
}
