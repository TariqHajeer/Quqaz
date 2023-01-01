import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Paging } from 'src/app/Models/paging';
import { SelectionModel } from '@angular/cdk/collections';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-get-disapproved-returned-order-by-branch',
  templateUrl: './get-disapproved-returned-order-by-branch.component.html',
  styleUrls: ['./get-disapproved-returned-order-by-branch.component.scss']
})
export class GetDisapprovedReturnedOrderByBranchComponent implements OnInit {

  displayedColumns: string[] = ['select', 'index', 'code', 'client', 'country', 'cost'];
  dataSource = new MatTableDataSource([]);
  paging: Paging;
  totalCount: number;
  constructor(private orderSerivce: OrderService,
    private notifications: NotificationsService,
    public spinner: NgxSpinnerService,

  ) { }
  selectAll: boolean = true;
  ordersIds = [];
  unSelectIds = [];
  selection = new SelectionModel<any>(true, []);
  countSelectOrder: number = 0;

  isAllSelected() {
    return this.selectAll = !this.selectAll;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.ordersIds = [];
    this.unSelectIds = [];
    if (this.isAllSelected()) {
      this.selection.clear();
    }
    else {
      this.dataSource.data.forEach(row => {
        this.selection.select(row);
      });
    }
  }
  checkboxLabelAll(): string {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    this.checkboxId(row)
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }
  checkboxId(row) {
    if (this.selection.isSelected(row)) {
      if (this.selectAll) {
        this.unSelectIds = [];
        if (this.ordersIds.filter(d => d == row.id).length > 0)
          return
        else {
          this.ordersIds.push(row.id);
          this.countSelectOrder = this.ordersIds.length;
        }
      }
      else {
        this.ordersIds = [];
        this.unSelectIds = this.unSelectIds.filter(o => o != row.id);
        this.countSelectOrder = this.totalCount - this.unSelectIds.length;
      }
    }
    if (!this.selection.isSelected(row)) {
      if (!this.selectAll) {
        if (this.unSelectIds.filter(d => d == row.id).length > 0)
          return
        else {
          this.unSelectIds.push(row.id);
          this.ordersIds = [];
          this.countSelectOrder = this.totalCount - this.unSelectIds.length;
        }
      }
      else {
        this.ordersIds = this.ordersIds.filter(o => o != row.id);
        this.countSelectOrder = this.ordersIds.length;
        this.unSelectIds = [];
      }
    }
  }
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
      this.dataSource.data.forEach(row => {
        if (!this.selectAll || (this.selectAll && this.ordersIds.find(d => d == row.id))) { this.selection.select(row) }
      });
    });
  }
  moveOrders() {
    this.orderSerivce.selectOrder.IsSelectedAll = !this.selectAll;
    this.orderSerivce.selectOrder.SelectedIds = this.ordersIds;
    this.orderSerivce.selectOrder.ExceptIds = this.unSelectIds;
    if (this.noDataFound() == true || (this.orderSerivce.selectOrder.SelectedIds.length == 0 && this.selectAll)) {
      this.notifications.create('error', '   لم يتم اختيار طلبات ', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    else {
      this.spinner.show();
      this.orderSerivce.SetDisApproveOrdersReturnByBranchInStore().subscribe(res => {
        this.getData();
        this.spinner.hide();
        this.notifications.create('Success', '  تمت نقل الطلبات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      }, err => {
        this.spinner.hide();
      })
    }
  }
}
