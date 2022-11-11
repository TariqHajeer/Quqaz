import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';
import { Paging } from 'src/app/Models/paging';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { OrderPlacedStateService } from 'src/app/services/order-placed-state.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';
import { CustomService } from 'src/app/services/custom.service';
import { SelectOrder } from 'src/app/Models/order/select-order.model';
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
  statu
  paging: Paging
  filtering: OrderFilter
  noDataFound: boolean = false
  getorders: any[] = []
  @Input() totalCount: number;
  selection = new SelectionModel<any>(true, []);
  countries: any[] = []
  clients: Client[] = []
  cityapi: string = 'Country';
  selectOrder: SelectOrder = new SelectOrder();
  unSelectIds: number[] = [];
  ordersIds: number[] = []
  selectAll: boolean = true;
  constructor(
    private orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    public orderplacedstate: OrderPlacedStateService,
    private clientService: ClientService,
    private customerService: CustomService,
  ) { }

  ngOnInit(): void {
    this.GetClient()
    this.getCities()
    this.paging = new Paging
    this.filtering = new OrderFilter
    this.allFilter();
  }

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
        }
      }
      else {
        this.ordersIds = [];
        this.unSelectIds = this.unSelectIds.filter(o => o != row.id);
      }
    }
    if (!this.selection.isSelected(row)) {
      if (!this.selectAll) {
        if (this.unSelectIds.filter(d => d == row.id).length > 0)
          return
        else {
          this.unSelectIds.push(row.id);
          this.ordersIds = [];
        }
      }
      else {
        this.ordersIds = this.ordersIds.filter(o => o != row.id);
        this.unSelectIds = [];
      }
    }
  }
  GetClient() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res
    })
  }
  getCities() {
    this.customerService.getAll(this.cityapi).subscribe((res) => {
      this.countries = res;
    });
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.allFilter();
  }
  allFilter() {
    this.orderservice.GetInStockToTransferToSecondBranch(this.selectOrder).subscribe(response => {
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
        if (!this.selectAll) { this.selection.select(row) }
      });
    },
      err => {

      });
  }
  moveOrders() {
    if (this.noDataFound == true || (this.ordersIds.length == 0 && this.selectAll)) {
      this.notifications.create('error', '   لم يتم اختيار طلبات ', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    this.orderservice.TransferToSecondBranch(this.orders.map(order => order.id)).subscribe(res => {
      this.notifications.success('success', 'تم نقل الطلبات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.selection.clear()
      this.orders = []
      this.allFilter()
    })
  }
}
