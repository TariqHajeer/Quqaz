import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Paging } from 'src/app/Models/paging';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-show-recetpt-shipments',
  templateUrl: './show-recetpt-shipments.component.html',
  styleUrls: ['./show-recetpt-shipments.component.scss'],
})
export class ShowRecetptShipmentsComponent implements OnInit {
  constructor(public orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.paging = new Paging();
    this.Get();
  }
  displayedColumns: string[] = [
    'id',
    'reciverName',
    'createdOn',
  ];
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() totalCount: number;
  pageEvent: PageEvent;
  paging: Paging;
  noDataFound: boolean = false;

  Get() {
    this.orderService
      .ReceiptOfTheOrderStatus(this.paging)
      .subscribe((res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.totalCount = res.total;
      });
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length;
    this.paging.RowCount = event.pageSize;
    this.paging.Page = event.pageIndex + 1;
    this.Get();
  }
  printNmberFillter() {
    this.Get();
  }
  print(number) {
    this.router.navigate(['/app/reports/printreceiptshipment/', number]);
  }
}
