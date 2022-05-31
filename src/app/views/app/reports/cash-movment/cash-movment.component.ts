import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Paging } from 'src/app/Models/paging';
import { TreasuryService } from 'src/app/services/treasury.service';

@Component({
  selector: 'app-cash-movment',
  templateUrl: './cash-movment.component.html',
  styleUrls: ['./cash-movment.component.scss']
})
export class CashMovmentComponent implements OnInit {

  constructor(public treasuryService: TreasuryService, private router: Router) {}

  ngOnInit(): void {
    this.paging = new Paging();
    this.Get();
  }
  displayedColumns: string[] = ['amount', 'treasuryUserName', 'createdOnUtc', 'createdBy','note'];
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() totalCount: number;
  pageEvent: PageEvent;
  paging: Paging;
  noDataFound: boolean = false;
  printNmber: number;
  treausryId: number;
  Get() {
    this.treasuryService.CashMovment(this.paging,this.treausryId).subscribe((res) => {
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
  // print(number) {
  //   this.router.navigate(['/app/reports/printReceiptShipments/', number]);
  // }

}
