import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { GetOrdersByAgentRegionAndCode } from 'src/app/Models/order/get-orders-by-agent-region-and-code.model';
import { User } from 'src/app/Models/user/user.model';
import { CustomService } from 'src/app/services/custom.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-move-orders-to-agent-by-code',
  templateUrl: './move-orders-to-agent-by-code.component.html',
  styleUrls: ['./move-orders-to-agent-by-code.component.scss']
})
export class MoveOrdersToAgentByCodeComponent implements OnInit {

  constructor(private userService: UserService,
    private customService: CustomService,
    private orderService: OrderService,
    private notifications: NotificationsService,
  ) { }
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['index', 'code', 'client', 'country', 'note', 'edit'];
  noDataFound: string;
  ordersByAgentRegionAndCode: GetOrdersByAgentRegionAndCode = new GetOrdersByAgentRegionAndCode();
  agents: User[] = [];
  cities: any[] = [];
  cityApiName: string = 'Country';
  newAgents: User[] = [];
  newAgentId: number;
  ordersfilter: any[] = [];
  orders: any[] = [];
  moveOrder: {
    NewAgentId: number;
    Ids: number[];
  };
  ngOnInit(): void {
    this.getAgent();
  }
  getAgent() {
    this.userService.ActiveAgent().subscribe((res) => {
      this.agents = res;
    });
  }
  ChangeAgentId() {
    this.cities = this.agents.find(a => a.id == this.ordersByAgentRegionAndCode.AgentId).countries;
    this.resetDataSource();
  }
  ChangeCountry() {
    this.customService.getAll(this.cityApiName).subscribe(res => {
      this.newAgents = res.find(c => c.id == this.ordersByAgentRegionAndCode.CountryId).agnets.filter(a => a.id != this.ordersByAgentRegionAndCode.AgentId);
      this.resetDataSource();
    })
  }
  resetDataSource() {
    this.ordersfilter = [];
    this.orders = [];
    this.dataSource = new MatTableDataSource([]);
  }
  getData() {
    this.ordersfilter = [];
    if (this.ordersByAgentRegionAndCode.AgentId && this.ordersByAgentRegionAndCode.Code
      && this.ordersByAgentRegionAndCode.CountryId) {
      this.orderService.GetOrdersByAgentRegionAndCode(this.ordersByAgentRegionAndCode).subscribe(res => {
        if (res.length > 1) {
          this.ordersfilter = res;
        }
        else if (res.length == 1) {
          this.ordersfilter = [];
          if (this.findOrderInTable()) {
            this.notifications.create('error', 'الشحنة مضافة مسبقاً', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
            return;
          }
          else {
            this.orders.unshift(res[0]);
            this.addOrder();
          }
        }
        else if (res.length == 0) {
          this.notifications.create('error', 'الشحنة  غير موجودة', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        }
      }, err => {        
        this.notifications.create('error', err.error.message, NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      })
    }
    else {
      this.notifications.create('error', 'يجب تعبئة جميع الحقول', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    }
  }
  findOrderInTable(): boolean {
    return this.orders.filter(o => o.code == this.ordersByAgentRegionAndCode.Code).length > 0;
  }
  addOrder() {
    this.dataSource = new MatTableDataSource(this.orders);
    this.ordersByAgentRegionAndCode = new GetOrdersByAgentRegionAndCode();
  }
  showTable(): boolean {
    return this.ordersfilter.length > 0;
  }
  add(order) {
    if (this.orders.filter(o => o.code == order.Code && o.client.id == order.client.id).length > 0) {
      this.cancel(order);
      return;
    }
    else {
      this.orders.unshift(order);
      this.addOrder();
      this.cancel(order);
    }
  }
  cancel(order) {
    this.ordersfilter = this.ordersfilter.filter(o => o != order);
  }
  removeOrderInsideTable(order) {
    this.orders = this.orders.filter(o => o != order);
    this.addOrder();
  }
  moveOrders() {
    if (this.dataSource.data.length == 0) {
      this.notifications.create(
        'error',
        '   لم يتم اختيار طلبات ',
        NotificationType.Error,
        { theClass: 'success', timeOut: 6000, showProgressBar: false }
      );
      return;
    }
    this.moveOrder = {
      NewAgentId: this.newAgentId,
      Ids: this.orders.map((o) => o.id),
    };
    this.orderService.changeAgentOrders(this.moveOrder).subscribe((res) => {
      this.ordersByAgentRegionAndCode = new GetOrdersByAgentRegionAndCode();
      this.newAgents = [];
      this.newAgentId = null;
      this.cities = [];
      this.orders = [];
      this.dataSource = new MatTableDataSource([]);
      this.notifications.create(
        'Success',
        '   تم النقل بنجاح ',
        NotificationType.Success,
        { theClass: 'success', timeOut: 6000, showProgressBar: false }
      );
    });
  }
}
