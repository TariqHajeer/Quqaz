import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paging } from 'src/app/Models/paging';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-client-print',
  templateUrl: './client-print.component.html',
  styleUrls: ['./client-print.component.scss']
})
export class ClientPrintComponent implements OnInit {

  constructor(public orderService: OrderService) { }

  ngOnInit(): void {
    this.paging = new Paging
    this.Get()
  }
  displayedColumns: string[] = ['date', 'destinationName', 'destinationPhone',
   'printNmber', 'printerName'];
  ;
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() totalCount: number;
  pageEvent: PageEvent;
  paging: Paging
  noDataFound: boolean = false
  Get() {
    this.orderService.GetClientprint(this.paging).subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
      this.totalCount = res.total

    })
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.Get();

  }

}
