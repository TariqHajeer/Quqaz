import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Paging } from 'src/app/Models/paging';
import { ClientService } from '../../client/client.service';
import { AccountFilter } from 'src/app/Models/account-filter.model';
import { Client } from '../../client/client.model';
import { MatSort } from '@angular/material/sort';
import { ReciptService } from 'src/app/services/recipt.service';
import { ReceiptAndExchange } from 'src/app/Models/receipt-and-exchange.model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-receipts-and-exchanges',
  templateUrl: './receipts-and-exchanges.component.html',
  styleUrls: ['./receipts-and-exchanges.component.scss']
})
export class ReceiptsAndExchangesComponent implements OnInit {

  constructor(public clientservice: ClientService,
    public receptservice: ReciptService,
    public sanitizer: DomSanitizer,) { }
  dataSource
  displayedColumns: string[] = ['printId','clientName', 'amount', 'isPay', 'about'
    , 'date',  'manager', 'createdBy', 'note', 'delete'];
  noDataFound: boolean = false
  @Input() totalCount: number;
  pageEvent: PageEvent;
  paging: Paging
  filter: AccountFilter
  Clients: Client[] = []
  receipt: boolean
  exchange: boolean
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  client: ReceiptAndExchange =new ReceiptAndExchange
  address = "اربيل - برايتي - قرب ماركيت آيه "
  companyPhone = "07714400880"
  ngOnInit(): void {
    this.paging = new Paging
    this.filter = new AccountFilter()
    this.Get()
    this.getClients()
  }
  Get() {
    if (this.receipt == true && this.exchange == true)
      this.filter.IsPay = null
    else if (this.receipt == true)
      this.filter.IsPay = false
    else if (this.exchange == true)
      this.filter.IsPay = true
    this.receptservice.GetAccount(this.paging, this.filter).subscribe(res => {
      console.log(res)
      res.data.forEach(e => {
        e.date = e.date.split('T')[0];
      });
      this.dataSource = new MatTableDataSource(res.data)
      this.totalCount = res.total
    })
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.Get();

  }
  getClients() {
    this.clientservice.getClients().subscribe(res => {
      this.Clients = res
    })
  }
  delete(element) {
    this.receptservice.Delete(element.id).subscribe(res => {
      this.Get()
    })
  }
  print(i) {
    var divToPrint = document.getElementById('contentToConvert-' + i);
    var css = '@page { size: A5 landscape ;margin: 0;}',
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

    }, 10);
  }
}
