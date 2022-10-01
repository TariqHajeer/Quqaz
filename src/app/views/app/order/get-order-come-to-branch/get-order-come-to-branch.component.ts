import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Order } from 'src/app/Models/order/order.model';
import { Paging } from 'src/app/Models/paging';
import { OrderService } from 'src/app/services/order.service';
@Component({
  selector: 'app-get-order-come-to-branch',
  templateUrl: './get-order-come-to-branch.component.html',
  styleUrls: ['./get-order-come-to-branch.component.scss']
})
export class GetOrderComeToBranchComponent implements OnInit {

  constructor(
    private orderservice: OrderService,
  ) { }
  selection = new SelectionModel<any>(true, []);
  dataSource = new MatTableDataSource([]);
  orders: Order[] = [];
  paging: Paging;
  @Input() totalCount: number;
  noDataFound: boolean = false
  ngOnInit(): void {
  }
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear()
      this.dataSource.data.forEach(item => {
        this.orders = this.orders.filter(order => order.id != item.id)
      })
    }
    else {
      this.dataSource.data.forEach(row => {
        this.selection.select(row)
      });
    }
  }
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    this.checkboxId(row)
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }
  checkboxId(row) {
    if (this.selection.isSelected(row)) {
      if (this.orders.filter(d => d.id == row.id).length > 0)
        return
      else this.orders.push(row)
    }
    if (!this.selection.isSelected(row)) {
      this.orders = this.orders.filter(o => o.id != row.id)
    }
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.getData();
  }
  getData(): void {
    this.orderservice.GetInStockToTransferToSecondBranch(this.filtering, this.paging).subscribe(response => {
      this.getorders = []
      if (response)
        if (response.data.length <= 0)
          this.noDataFound = true
        else {
          this.getorders = response.data;
          this.noDataFound = false
        }
      this.dataSource = new MatTableDataSource(this.getorders)
      this.totalCount = response.total
      this.selection.clear()
      this.dataSource.data.forEach(row => {
        if (this.orders.filter(d => d.id == row.id).length == 1) {
          this.selection.select(row)
        }
      });
    },
      err => {

      });
  }
}
