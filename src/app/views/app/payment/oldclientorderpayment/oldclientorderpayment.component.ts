import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paging } from 'src/app/Models/paging';
import { PaymentRequestService } from 'src/app/services/payment-request.service';
import { PaymentService } from 'src/app/services/payment.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';
import{PaymentFilltering}from'src/app/Models/payment-filltering.model'
@Component({
  selector: 'app-oldclientorderpayment',
  templateUrl: './oldclientorderpayment.component.html',
  styleUrls: ['./oldclientorderpayment.component.scss']
})
export class OldclientorderpaymentComponent implements OnInit {

 
  constructor(private paymentService: PaymentService,
    private PaymentRequestService:PaymentRequestService,
    private clientService: ClientService
    ) { }
  displayedColumns: string[]=  ['id','client', 'name','state', 'note', 'date'];
  dataSource
  payments: [] = []
  oldpayments: [] = []
  clients: Client[] = []
  filtering:PaymentFilltering=new PaymentFilltering
  paging:Paging=new Paging()
  ClientId
  PaymentId
  totalCount
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit(): void {
    this.GetPayment()
    this.GetClient()
    this.GetOldPayment()
  }
  GetPayment() {
    this.paymentService.Get().subscribe(res => {
      this.payments = res
    })
  }
  GetOldPayment() {
    this.PaymentRequestService.GetOldPayment(this.filtering,this.paging).subscribe(res => {
      this.oldpayments = res
      this.dataSource = new MatTableDataSource(this.oldpayments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      // console.log(res)
    })
  }
  GetClient() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res
    })
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.GetPayment();

  }
}
