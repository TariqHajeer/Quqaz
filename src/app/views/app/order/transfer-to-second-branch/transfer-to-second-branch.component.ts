import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { OrderPlacedStateService } from 'src/app/services/order-placed-state.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BranchesService } from 'src/app/services/branches.service';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-transfer-to-second-branch',
  templateUrl: './transfer-to-second-branch.component.html',
  styleUrls: ['./transfer-to-second-branch.component.scss']
})
export class TransferToSecondBranchComponent implements OnInit {

  displayedColumns: string[] = ['select', 'index', 'code', 'country'
    , 'client', 'cost', 'deliveryCost'];
  dataSource = new MatTableDataSource([]);
  orders: any[] = []
  noDataFound: boolean = false
  getorders: any[] = []
  @Input() totalCount: number;
  selection = new SelectionModel<any>(true, []);
  countSelectOrder: number = 0;
  branches: any[] = [];
  constructor(
    public orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    public orderplacedstate: OrderPlacedStateService,
    public spinner: NgxSpinnerService,
    private branchesService: BranchesService,
    private authService: AuthService,

  ) { }

  ngOnInit(): void {
    this.getBranches();
  }

  selectAll: boolean = true;
  ordersIds = [];
  unSelectIds = [];
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
  getBranches() {
    this.branchesService.Get().subscribe(res => {
      this.branches = res?.filter(data => data.id != this.authService.getUser().branche.id);
    })
  }

  switchPage(event: PageEvent) {
    this.orderservice.selectOrder.Paging.allItemsLength = event.length;
    this.orderservice.selectOrder.Paging.RowCount = event.pageSize;
    this.orderservice.selectOrder.Paging.Page = event.pageIndex + 1;
    this.getAllOrders();
  }
  filtering() {
    if (this.orderservice.selectOrder.OrderFilter.nextBranchId) {
      this.selection.clear();
      // this.isAllSelected();
      this.getAllOrders();      
    }
    else{
      this.dataSource = new MatTableDataSource([]);
      this.selection = new SelectionModel<any>(true, []);
    }
  }
  getAllOrders() {
    this.spinner.show();
    this.orderservice.GetInStockToTransferToSecondBranch().subscribe(response => {
      this.getorders = []
      if (response)
        if (response.data.length <= 0)
          this.noDataFound = true
        else {
          this.getorders = response.data;
          this.noDataFound = false
        }
      this.dataSource = new MatTableDataSource(this.getorders);
      this.spinner.hide();
      this.totalCount = response.total
      this.dataSource.data.forEach(row => {
        if (!this.selectAll ||
          (this.selectAll && this.ordersIds.find(d => d == row.id))) { this.selection.select(row) }
      });
    },
      err => {
        this.spinner.hide();
      });
  }
  moveOrders() {
    this.orderservice.selectOrder.IsSelectedAll = !this.selectAll;
    this.orderservice.selectOrder.SelectedIds = this.ordersIds;
    this.orderservice.selectOrder.ExceptIds = this.unSelectIds;
    if (this.noDataFound == true || (this.orderservice.selectOrder.SelectedIds.length == 0 && this.selectAll)) {
      this.notifications.create('error', '   لم يتم اختيار طلبات ', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    else
      this.route.navigate(['/app/order/printOrders']);
  }
}
