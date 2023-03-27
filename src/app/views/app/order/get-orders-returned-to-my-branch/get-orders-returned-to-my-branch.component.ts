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
import { User } from 'src/app/Models/user/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { SelectOrder } from 'src/app/Models/order/select-order.model';

@Component({
  selector: 'app-get-orders-returned-to-my-branch',
  templateUrl: './get-orders-returned-to-my-branch.component.html',
  styleUrls: ['./get-orders-returned-to-my-branch.component.scss']
})
export class GetOrdersReturnedToMyBranchComponent implements OnInit {

  displayedColumns: string[] = ['select', 'index', 'code'
    , 'client', 'country', 'region', 'agent', 'cost', 'actions'];
  dataSource = new MatTableDataSource([]);
  orders: any[] = []
  paging: Paging
  filtering: OrderFilter
  noDataFound: boolean = false
  @Input() totalCount: number;
  selection = new SelectionModel<any>(true, []);
  countries: any[] = []
  clients: Client[] = []
  cityapi: string = 'Country';
  Agents: User[] = []
  constructor(
    private orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    public orderplacedstate: OrderPlacedStateService,
    private clientService: ClientService,
    private customerService: CustomService,
    public spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.GetClient()
    this.getCities()
    this.getAgent();
    this.paging = new Paging
    this.filtering = new OrderFilter
    this.allFilter();
  }
  selectAll: boolean = true;
  ordersIds = [];
  unSelectIds = [];
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
  getAgent(): void {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agents = res as User[];
    });
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.allFilter();
  }
  allFilter() {
    this.spinner.show();
    this.orderservice.GetOrdersReturnedToMyBranch(this.paging).subscribe(response => {
      if (response)
        if (response.data.length <= 0)
          this.noDataFound = true
        else {
          this.noDataFound = false
        }
      this.dataSource = new MatTableDataSource(response.data);
      this.spinner.hide();
      this.totalCount = response.total
      // this.selection.clear()
      this.dataSource.data.forEach(row => {
        if (this.orders.filter(d => d.id == row.id).length == 1) {
          this.selection.select(row.id)
          row.agent = this.orders.find(order => order.id == row.id).agent
        }
      });
    },
      err => {
        this.spinner.hide();
      });
  }
  ReceiveOrders() {
    this.orderservice.selectOrder.IsSelectedAll = !this.selectAll;
    this.orderservice.selectOrder.selectedIds = this.ordersIds;
    this.orderservice.selectOrder.ExceptIds = this.unSelectIds;
    if (this.noDataFound == true || (this.orderservice.selectOrder.selectedIds.length == 0 && this.selectAll)) {
      this.notifications.create('error', '   لم يتم اختيار طلبات ', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    else {
      this.spinner.show();
      this.orderservice.ReceiveReturnedToMyBranch().subscribe(res => {
        this.spinner.hide();
        this.allFilter();
        this.notifications.create('Success', '  تمت اعادة الطلبات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        this.countSelectOrder = 0;
        this.orderservice.selectOrder = new SelectOrder();
      }, err => {
        this.spinner.hide();
      })
    }
  }
  disapprove(element: any) {
    this.spinner.show();
    this.orderservice.DisApproveReturnedToMyBranch(element.id).subscribe(res => {
      this.dataSource.data = this.dataSource.data.filter(c => c.id != element.id);
      this.dataSource._updateChangeSubscription();
      this.spinner.hide();
      this.notifications.success('success', 'تم الرفض بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    },
      err => {
        this.spinner.hide();
      }
    )
  }
}
