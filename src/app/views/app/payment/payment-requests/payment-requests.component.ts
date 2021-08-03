import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentRequestService } from 'src/app/services/payment-request.service'

@Component({
  selector: 'app-payment-requests',
  templateUrl: './payment-requests.component.html',
  styleUrls: ['./payment-requests.component.scss']
})
export class PaymentRequestsComponent implements OnInit {

  constructor(private paymentService: PaymentRequestService) { }
  displayedColumns: string[];
  dataSource
  payments:[]=[]
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit(): void {
    this.GetPayment()
  }
  GetPayment() {
    this.paymentService.Get().subscribe(res => {
      this.payments = res
      this.dataSource = new MatTableDataSource(this.payments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.displayedColumns = ['name', 'note', 'Accept', 'DisAccept'];
      // console.log(res)
    })
  }
  Accept(id) {
    this.paymentService.Accept(id).subscribe(res => {

    })
  }
  DisAccept(id) {
    this.paymentService.DisAccept(id).subscribe(res => {

    })
  }
}
