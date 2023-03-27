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
import { ReceiveOrdersToMyBranchDto } from 'src/app/Models/order/select-order.model';
import { AgentOrdersIds } from 'src/app/shared/interfaces/Orders';
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
  agents: User[] = []
  regions: Region[] = [];
  agentOrdersId: AgentOrdersIds
  agentOrdersIds: AgentOrdersIds[] = [];
  selectAll: boolean;
  countSelectOrder: number = 0;
  branches: any[] = [];
  region: Region = new Region();
  agent: User = new User();
  receiveOrdersToMyBranch: ReceiveOrdersToMyBranchDto = new ReceiveOrdersToMyBranchDto();
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
    this.getRegion();
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
  getBranches() {
    this.branchesService.Get().subscribe(res => {
      this.branches = res;
    })
  }
  getAgent(): void {
    this.userService.ActiveAgent().subscribe(res => {
      this.agents = res as User[];
    });
  }
  agentArray(countryId) {
    return this.agents.filter(
      (a) =>
        a.countries
          .map((c) => c.id)
          .filter((co) => co == countryId).length > 0
    );
  }
  changeAllAgents() {
    let array = this.dataSource.data;
    array.forEach(item => {
      item.agent = this.agent;
    })
  }
  getRegion() {
    this.customerService.getAll(this.regionapi).subscribe((res) => {
      this.regions = res;
    });
  }
  regionArray(countryId) {
    return this.regions.filter(
      (r) => r.country.id == countryId
    );
  }
  changeAllRegions() {
    let array = this.dataSource.data;
    array.forEach(item => {
      item.region = this.region;
    })
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
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.getOrders();
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
    this.receiveOrdersToMyBranch.AgentId = this.agent.id;
    this.receiveOrdersToMyBranch.RegionId = this.region.id;
    this.receiveOrdersToMyBranch.selectedOrdersWithFitlerDto.selectedIds = this.agentOrdersIds;
    this.receiveOrdersToMyBranch.selectedOrdersWithFitlerDto.ExceptIds = this.agentOrdersIds;
    this.receiveOrdersToMyBranch.selectedOrdersWithFitlerDto.IsSelectedAll = this.agentOrdersIds;
    this.receiveOrdersToMyBranch.selectedOrdersWithFitlerDto.OrderFilter = this.filtering;
    this.receiveOrdersToMyBranch.selectedOrdersWithFitlerDto.Paging = this.paging;

    this.orderservice.ReceiveOrdersToMyBranch(this.receiveOrdersToMyBranch).subscribe(res => {
      this.notifications.success('success', 'تم نقل الطلبات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.selection.clear()
      this.orders = [];
      this.agentOrdersIds = [];
      this.getOrders()
    })
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

}
