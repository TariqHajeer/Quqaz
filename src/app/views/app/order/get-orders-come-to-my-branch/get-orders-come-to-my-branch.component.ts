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
import { CustomService } from 'src/app/services/custom.service';
import { User } from 'src/app/Models/user/user.model';
import { Region } from 'src/app/Models/Regions/region.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/auth.service';
import { BranchesService } from 'src/app/services/branches.service';
export interface AgentOrdersIds {
  orderId: number
  agentId: number
  regionId?: number
  cost: number
  deliveryCost: number
}
@Component({
  selector: 'app-get-orders-come-to-my-branch',
  templateUrl: './get-orders-come-to-my-branch.component.html',
  styleUrls: ['./get-orders-come-to-my-branch.component.scss']
})
export class GetOrdersComeToMyBranchComponent implements OnInit {
  displayedColumns: string[] = ['select', 'index', 'code'
    , 'client', 'country', 'region', 'agent', 'cost', 'deliveryCost', "actions"];
  dataSource = new MatTableDataSource([]);
  orders: any[] = []
  paging: Paging
  filtering: OrderFilter
  noDataFound: boolean = false
  @Input() totalCount: number;
  selection = new SelectionModel<any>(true, []);
  countries: any[] = []
  cityapi: string = 'Country';
  regionapi: string = 'Region';
  Agents: User[] = []
  Regions: Region[] = [];
  agentOrdersId: AgentOrdersIds
  agentOrdersIds: AgentOrdersIds[] = [];
  selectAll: boolean;
  countSelectOrder: number = 0;
  branches: any[] = [];

  constructor(
    private orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    public orderplacedstate: OrderPlacedStateService,
    private customerService: CustomService,
    public spinner: NgxSpinnerService,
    private authService: AuthService,
    private branchesService: BranchesService
  ) { }

  ngOnInit(): void {
    this.getCities()
    this.getAgent();
    this.GetRegion();
    this.getBranches();
    this.paging = new Paging
    this.filtering = new OrderFilter
    this.getOrders();
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (!this.selectAll) {
      this.selection.clear()
      this.dataSource.data.forEach(item => {
        this.orders = this.orders.filter(order => order != item)
      })
    }
    else {
      this.dataSource.data.forEach(row => {
        this.selection.select(row.id)
      });
    }
  }
  checkboxLabelAll(): string {
    return `${this.selectAll ? 'select' : 'deselect'} all`;
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(rowid?: any, row?): string {
    if (!rowid) {
      return `${this.selectAll ? 'select' : 'deselect'} all`;
    }
    this.checkboxId(rowid, row)
    return `${this.selection.isSelected(rowid) ? 'deselect' : 'select'} row`;
  }
  checkboxId(rowid, row?) {
    if (this.selection.isSelected(rowid)) {
      if (!this.selectAll) {
        if (this.orders.filter(d => d == row).length > 0)
          return
        else {
          this.orders.push(row)
          this.countSelectOrder = this.orders.length;
          if (this.countSelectOrder == this.totalCount)
            this.selectAll = true;
        }
      }

    }
    if (!this.selection.isSelected(rowid)) {
      if (this.selectAll) {
        this.orders = this.orders.filter(o => o.id != rowid);
        this.selectAll = false;
      }
    }
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
    this.getOrders();
  }
  getOrders() {
    this.orderservice.GetOrdersComeToMyBranch(this.filtering, this.paging).subscribe(response => {
      if (response)
        if (response.data.length <= 0)
          this.noDataFound = true
        else {
          this.noDataFound = false
        }
      this.dataSource = new MatTableDataSource(response.data)
      this.totalCount = response.total
      this.dataSource.data.forEach(row => {
        if (this.orders.filter(d => d.id == row.id).length == 1) {
          this.selection.select(row.id)
          row.agent = this.orders.find(order => order.id == row.id).agent
        }
      });
    },
      err => {

      });
  }
  ReceiveOrders() {
    if (this.totalCount == 0 || this.orders.length == 0) {
      this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    this.agentOrdersIds = [];
    if (this.orders.filter(order => !order.agent && order.targetBranchId == this.authService.getUser().branche.id).length > 0) {
      this.notifications.create('error', '  يجب اختيار مندوب', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    this.orders.forEach(item => {
      let order = this.dataSource.data.find(data => data.id == item.id)
      this.agentOrdersId = {
        orderId: order.id,
        agentId: order.agent?.id,
        regionId: order.region?.id,
        deliveryCost: Number(order.deliveryCost),
        cost: Number(order.cost),
      }
      this.agentOrdersIds.push(this.agentOrdersId);
    })
    this.orderservice.ReceiveOrdersToMyBranch(this.agentOrdersIds).subscribe(res => {
      this.notifications.success('success', 'تم نقل الطلبات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.selection.clear()
      this.orders = [];
      this.agentOrdersIds = [];
      this.getOrders()
    })
  }
  getAgent(): void {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agents = res as User[];
    });
  }
  getBranches() {
    this.branchesService.Get().subscribe(res => {
      this.branches = res;
    })
  }
  agentArray(countryId) {
    return this.Agents.filter(
      (a) =>
        a.countries
          .map((c) => c.id)
          .filter((co) => co == countryId).length > 0
    );
  }
  GetRegion() {
    this.customerService.getAll(this.regionapi).subscribe((res) => {
      this.Regions = res;
    });
  }
  changeCountry(){
    this.getOrders();
  }
  disapprove(element: any) {
    this.spinner.show();
    this.orderservice.DisApproveOrderComeToMyBranch(element.id).subscribe(res => {
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
  regionArray(countryId) {
    return this.Regions.filter(
      (r) => r.country.id == countryId
    );
  }
}
