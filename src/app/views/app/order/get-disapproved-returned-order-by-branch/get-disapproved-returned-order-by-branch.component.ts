import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Paging } from 'src/app/Models/paging';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-get-disapproved-returned-order-by-branch',
  templateUrl: './get-disapproved-returned-order-by-branch.component.html',
  styleUrls: ['./get-disapproved-returned-order-by-branch.component.scss']
})
export class GetDisapprovedReturnedOrderByBranchComponent implements OnInit {

  displayedColumns:string[]=['index','code','client','country'];
  dataSource = new MatTableDataSource([]);
  paging: Paging;
  totalCount:number;
  constructor(private orderSerivce: OrderService) { }

  ngOnInit(): void {
    this.paging = new Paging;
    this.getData();
  }
  noDataFound(): boolean {
    return this.dataSource.data.length == 0;
  }
  switchPage(event: PageEvent): void {
    this.paging.allItemsLength = event.length;
    this.paging.RowCount = event.pageSize;
    this.paging.Page = event.pageIndex + 1
    this.getData();
  }
  getData(): void {
    this.orderSerivce.getDisApproveOrdersReturnByBranch(this.paging).subscribe(res => {
      this.dataSource = new MatTableDataSource(res.data)
      this.totalCount = res.total;
    });
  }

}
