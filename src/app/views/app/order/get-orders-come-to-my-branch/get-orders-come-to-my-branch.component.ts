import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
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
import { BranchesService } from 'src/app/services/branches.service';
import { ReceiveOrdersToMyBranchDto } from 'src/app/Models/order/select-order.model';
import { CustomOrderAgent } from 'src/app/shared/interfaces/Orders';
import { AuthService } from 'src/app/shared/auth.service';
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
  paging: Paging = new Paging();
  filter: OrderFilter = new OrderFilter();
  noDataFound: boolean = false
  @Input() totalCount: number;
  countries: any[] = []
  cityapi: string = 'Country';
  regionapi: string = 'Region';
  agents: User[] = []
  regions: Region[] = [];
  customOrderAgent: CustomOrderAgent
  customOrdersAgent: CustomOrderAgent[] = [];
  branches: any[] = [];
  region: Region = new Region();
  agent: User = new User();
  receiveOrdersToMyBranch: ReceiveOrdersToMyBranchDto = new ReceiveOrdersToMyBranchDto();
  tempOrders: any[] = [];
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
    private orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    public orderplacedstate: OrderPlacedStateService,
    private customerService: CustomService,
    public spinner: NgxSpinnerService,
    private branchesService: BranchesService,
    private ref: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getCities()
    this.getAgent();
    this.getRegion();
    this.getBranches();
    this.getAllOrders();
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
    this.orders = [];
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
        this.orders.push(row);
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
        this.orders = this.orders.filter(c => c.id != row.id);
      }
      this.setCountSelectOrder(this.countSelectOrder - 1);
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
      if (this.selection.isSelected(item))
        item.agent = this.agent;
    });
    this.tempOrders = JSON.parse(JSON.stringify(array));
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
      if (this.selection.isSelected(item))
        item.region = this.region;
    })
    this.tempOrders = JSON.parse(JSON.stringify(array));
  }
  changeOrderSelectedValues(selectOrder) {
    if (!this.selection.isSelected(selectOrder)) {
      return;
    }
    let order = this.orders.find(o => o.id == selectOrder.id);
    let tempOrder = this.tempOrders.find(o => o.id == selectOrder.id);
    if (tempOrder.region?.id == selectOrder.region?.id &&
      tempOrder.agent?.id == selectOrder.agent?.id &&
      tempOrder.cost == selectOrder.cost &&
      tempOrder.deliveryCost == selectOrder.deliveryCost &&
      order && this.lastMasterSelectionChoise) {
      this.orders = this.orders.filter(o => o.id != order.id);
      return
    }
    if (this.lastMasterSelectionChoise && !order) {
      this.orders.push(selectOrder);
    }
    if (order) {
      let index = this.orders.indexOf(order);
      this.orders[index] = selectOrder;
    }
  }
  searching() {
    this.dataSource = new MatTableDataSource([]);
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
  setAgentAndRegion(order): void {
    if (this.orders.some(o => o.id == order.id)) {
      return;
    }
    if (this.selection.isSelected(order)) {
      if (this.agent) {
        order.agent = this.agent;
      }
      if (this.region) {
        order.region = this.region;
      }
    }
  }
  getAllOrders() {
    this.orderservice.GetOrdersComeToMyBranch(this.filter, this.paging).subscribe(response => {
      if (response)
        if (response.data.length <= 0)
          this.noDataFound = true;
        else {
          this.noDataFound = false;
        }
      this.dataSource = new MatTableDataSource(response.data);
      if (!this.filter.Phone && !this.filter.Code)
        this.totalCount = response.total;
      this.tempOrders = JSON.parse(JSON.stringify(response.data));

      if (this.selectAll) {
        this.dataSource.data.forEach(row => {
          this.selection.select(row);
        });
      }
      else
        if (this.lastMasterSelectionChoise) {

          this.dataSource.data.filter(row => this.unSelectIds.indexOf(row.id) == -1)
            .forEach(row => {
              this.selection.select(row);
            });
        }
        else {
          this.dataSource.data.filter(row => this.ordersIds.indexOf(row.id) >= 0)
            .forEach(row => {
              this.selection.select(row);
            });
        }

      if (this.orders.length > 0) {
        this.dataSource.data.forEach(row => {
          let o = this.orders.find(o => o.id === row.id);
          if (o) {
            row.cost = Number(o.cost);
            row.deliveryCost = Number(o.deliveryCost);
            row.agent = o.agent;
            row.region = o.region;
          }
        })
      }
      this.dataSource.data.forEach(row => {
        this.setAgentAndRegion(row);
      });
    },
      err => {

      });
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length;
    this.paging.RowCount = event.pageSize;
    this.paging.Page = event.pageIndex + 1;
    this.getAllOrders();
  }
  ReceiveOrders() {
    if (this.totalCount == 0 || (this.orders.length == 0 && !this.lastMasterSelectionChoise)) {
      this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    this.customOrdersAgent = [];
    if (this.orders.filter(order => !order.agent && order.targetBranchId == this.authService.getUser().branche.id).length > 0) {
      this.notifications.create('error', '  يجب اختيار مندوب', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    this.orders.forEach(item => {
      let order = this.dataSource.data.find(data => data.id == item.id)
      this.customOrderAgent = {
        orderId: order.id,
        agentId: order.agent?.id,
        regionId: order.region?.id,
        deliveryCost: Number(order.deliveryCost),
        cost: Number(order.cost),
      }
      this.customOrdersAgent.push(this.customOrderAgent);
    })
    this.receiveOrdersToMyBranch.AgentId = this.agent.id;
    this.receiveOrdersToMyBranch.RegionId = this.region?.id;
    this.receiveOrdersToMyBranch.CustomOrderAgent = this.customOrdersAgent;
    this.receiveOrdersToMyBranch.SelectedIds = this.ordersIds;
    this.receiveOrdersToMyBranch.ExceptIds = this.unSelectIds;
    this.receiveOrdersToMyBranch.IsSelectedAll = this.lastMasterSelectionChoise;
    this.receiveOrdersToMyBranch.OrderFilter = this.filter;
    this.receiveOrdersToMyBranch.Paging = this.paging;

    this.orderservice.ReceiveOrdersToMyBranch(this.receiveOrdersToMyBranch).subscribe(res => {
      this.notifications.success('success', 'تم نقل الطلبات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.selection.clear()
      this.orders = [];
      this.customOrdersAgent = [];
      this.filter=new OrderFilter();
      this.filtering()
    })
  }

  disapprove(element: any) {
    this.totalCount -= 1;
    if (this.selectAll) {
      this.setCountSelectOrder(this.countSelectOrder - 1);
    }
    else if (this.selection.isSelected(element)) {

      if (!this.lastMasterSelectionChoise) {
        this.ordersIds = this.ordersIds.filter(c => c != element.id);
        this.orders = this.orders.filter(c => c != element);
      }
      this.setCountSelectOrder(this.countSelectOrder - 1);
    }
    if (this.countSelectOrder == this.totalCount) {
      this.setIsAllSelected(true);
      this.lastMasterSelectionChoise = true;
    }

    this.spinner.show();
    this.orderservice.DisApproveOrderComeToMyBranch(element.id).subscribe(res => {
      this.dataSource.data = this.dataSource.data.filter(c => c.id != element.id);
      this.dataSource._updateChangeSubscription();
      this.spinner.hide();
      this.notifications.success('success', 'تم الرفض بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.totalCount -= 1;
    },
      err => {
        this.spinner.hide();
      }
    )
  }
  getItemIndex(i: number): number {
    if (this.paging.Page == 1) {
      return i;
    }
    return i + (this.paging.RowCount * (this.paging.Page - 1));
  }

}
