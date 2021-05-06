import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Paging } from 'src/app/Models/paging';
import { ClientService } from '../../client/client.service';
import { AccountFilter } from 'src/app/Models/account-filter.model';
import { Client } from '../../client/client.model';
import { MatSort } from '@angular/material/sort';
import { ReciptService } from 'src/app/services/recipt.service';

@Component({
  selector: 'app-receipts-and-exchanges',
  templateUrl: './receipts-and-exchanges.component.html',
  styleUrls: ['./receipts-and-exchanges.component.scss']
})
export class ReceiptsAndExchangesComponent implements OnInit {

  constructor(public clientservice: ClientService,
    public receptservice: ReciptService) { }
  dataSource
  displayedColumns: string[] = ['clientName', 'amount', 'isPay', 'about'
    , 'date', 'printId', 'manager', 'createdBy', 'note', 'delete'];
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
    console.log(this.filter)
    this.receptservice.GetAccount(this.paging, this.filter).subscribe(res => {
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

  }
}
