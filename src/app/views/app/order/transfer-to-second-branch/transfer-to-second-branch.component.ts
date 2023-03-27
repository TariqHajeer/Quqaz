import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
    public route: Router,
    private notifications: NotificationsService,
    public orderplacedstate: OrderPlacedStateService,
    public spinner: NgxSpinnerService,
    private branchesService: BranchesService,
    private authService: AuthService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getBranches();
  }

  selectAll: boolean = false;
  ordersIds = [];
  unSelectIds = [];
  setIsAllSelected(isAllSelected: boolean): void {
    this.selectAll = isAllSelected;
    if (this.selectAll) {
      this.originalAllSelected = true;
    }
    this.ref.detectChanges();
    this.setHeaderChekclable();
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  originalAllSelected: boolean = false;
  masterToggle() {
    console.log("masterToggle", this.selectAll);
    this.ordersIds = [];
    this.unSelectIds = [];
    if (!this.selectAll) {
      this.selection.clear();
      this.originalAllSelected = false;
      this.setCountSelectOrder(0);
      return;
    }
    this.dataSource.data.forEach(row => {
      this.selection.select(row);
    });
    this.originalAllSelected = true;
    this.setCountSelectOrder(this.totalCount);
  }
  indeterminate: boolean = false;
  headerChekclable: string = "deselect all";
  setHeaderChekclable(): void {
    if (this.selectAll) {
      this.headerChekclable = "select all";
    } else {
      this.headerChekclable = "deselect all";
    }
    this.ref.detectChanges();
  }
  setCountSelectOrder(number: number): void {
    if (this.countSelectOrder !== number) {
      this.countSelectOrder = number;
      this.ref.detectChanges();
    }
  }
  /** The label for the checkbox on the passed row */
  rowCheckChange(row: any) {
    this.selection.toggle(row);
    this.checkboxId(row);
  }
  checkboxRowLabel(row?: any): string {
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }
  checkboxId(row) {
    if (this.selection.isSelected(row)) {
      this.setCountSelectOrder(this.countSelectOrder + 1);
      if (this.originalAllSelected) {
        this.unSelectIds = this.unSelectIds.filter(c => c != row.id);
      }
      else {
        this.ordersIds.push(row.id);
      }
      if (this.countSelectOrder == this.totalCount) {
        this.setIsAllSelected(true);
      }
    }
    else {
      this.setIsAllSelected(false);
      if (this.originalAllSelected) {
        this.unSelectIds.push(row.id);
        if (this.unSelectIds.length == this.totalCount) {
          this.originalAllSelected = false;
        }
      } else {
        this.ordersIds = this.ordersIds.filter(c => c != row.id);
      }
      this.setCountSelectOrder(this.countSelectOrder - 1);
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
      this.getAllOrders();
    }
    else {
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
        if (this.selectAll ||
          (!this.selectAll && this.ordersIds.find(d => d == row.id))) { this.selection.select(row) }
      });
    },
      err => {
        this.spinner.hide();
      });
  }
  moveOrders() {
    this.orderservice.selectOrder.IsSelectedAll = this.originalAllSelected;
    this.orderservice.selectOrder.SelectedItems = this.ordersIds;
    this.orderservice.selectOrder.ExceptIds = this.unSelectIds;
    this.orderservice.selectOrder.OrderFilter.nextBranchName = this.branches.find(b => b.id == this.orderservice.selectOrder.OrderFilter.nextBranchId)?.name;
    if (this.noDataFound == true || (this.orderservice.selectOrder.SelectedItems.length == 0 && !this.orderservice.selectOrder.IsSelectedAll)) {

      this.notifications.create('error', '   لم يتم اختيار طلبات ', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    else
      this.route.navigate(['/app/order/printOrders']);
  }
}
