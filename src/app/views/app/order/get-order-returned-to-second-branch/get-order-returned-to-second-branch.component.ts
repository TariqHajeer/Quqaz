import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Client } from '../../client/client.model';
import { OrderPlacedStateService } from 'src/app/services/order-placed-state.service';
import { Paging } from 'src/app/Models/paging';
import { AuthService } from 'src/app/shared/auth.service';
import { BranchesService } from 'src/app/services/branches.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-get-order-returned-to-second-branch',
  templateUrl: './get-order-returned-to-second-branch.component.html',
  styleUrls: ['./get-order-returned-to-second-branch.component.scss']
})
export class GetOrderReturnedToSecondBranchComponent implements OnInit {
  displayedColumns: string[] = ['select', 'index', 'code', 'country'
    , 'client', 'deliveryCost', 'note'];
  dataSource = new MatTableDataSource([]);
  orders: any[] = []
  noDataFound: boolean = false
  getorders: any[] = []
  @Input() totalCount: number;
  countries: any[] = []
  clients: Client[] = []
  cityapi: string = 'Country';
  paging: Paging = new Paging();
  destinationBranchId: any;
  branches: any[] = [];
  /* select all prob*/
  selection = new SelectionModel<any>(true, []);
  selectAll: boolean = false;
  ordersIds = [];
  unSelectIds = [];
  countSelectOrder: number = 0;
  indeterminate: boolean = false;
  headerChekclable: string = "deselect all";
  lastMasterSelectionChoise: boolean = false;
  constructor(
    public orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    public orderplacedstate: OrderPlacedStateService,
    private authService: AuthService,
    private branchesService: BranchesService,
    public spinner: NgxSpinnerService,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getBranches();
  }

  setIsAllSelected(isAllSelected: boolean): void {
    this.selectAll = isAllSelected;
    if (this.selectAll) {
      this.lastMasterSelectionChoise = true;
    }
    this.ref.detectChanges();
    this.setHeaderChekclable();
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.ordersIds = [];
    this.unSelectIds = [];
    if (!this.selectAll) {
      this.selection.clear();
      this.lastMasterSelectionChoise = false;
      this.setCountSelectOrder(0);
      return;
    }
    this.dataSource.data.forEach(row => {
      this.selection.select(row);
    });
    this.lastMasterSelectionChoise = true;
    this.setCountSelectOrder(this.totalCount);
  }
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
  checkboxId(row) {
    if (this.selection.isSelected(row)) {
      this.setCountSelectOrder(this.countSelectOrder + 1);
      if (this.lastMasterSelectionChoise) {
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
      if (this.lastMasterSelectionChoise) {
        this.unSelectIds.push(row.id);
        if (this.unSelectIds.length == this.totalCount) {
          this.lastMasterSelectionChoise = false;
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
    this.dataSource = new MatTableDataSource([]);
    this.selection = new SelectionModel<any>(true, []);
    this.ordersIds = [];
    this.unSelectIds = [];
    this.lastMasterSelectionChoise = false;
    this.setIsAllSelected(false);
    this.setCountSelectOrder(0);
    this.selection.clear();
    this.getAllOrders();
  }
  getAllOrders() {
    this.orderservice.GetOrderReturnedToSecondBranch().subscribe(response => {
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
      if (this.selectAll) {
        this.dataSource.data.forEach(row => this.selection.select(row));
      }
      else
        if (this.lastMasterSelectionChoise) {

          this.dataSource.data.filter(row => this.unSelectIds.indexOf(row.id) == -1)
            .forEach(row => this.selection.select(row));
        }
        else {
          this.dataSource.data.filter(row => this.ordersIds.indexOf(row.id) >= 0)
            .forEach(row => this.selection.select(row));
        }
    },
      err => {

      });
  }
  moveOrders() {
    this.orderservice.selectOrder.IsSelectedAll = this.lastMasterSelectionChoise;
    this.orderservice.selectOrder.SelectedIds = this.ordersIds;
    this.orderservice.selectOrder.ExceptIds = this.unSelectIds;
    this.orderservice.selectOrder.OrderFilter.nextBranchName = this.branches.find(b => b.id == this.orderservice.selectOrder.OrderFilter.OriginalBranchId)?.name;
    if (this.noDataFound == true || (this.orderservice.selectOrder.SelectedIds.length == 0 && !this.orderservice.selectOrder.IsSelectedAll)) {
      this.notifications.create('error', '   لم يتم اختيار طلبات ', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    else
      this.route.navigate(['/app/order/printOrderReturnedToSecondBranch']);
  }

}