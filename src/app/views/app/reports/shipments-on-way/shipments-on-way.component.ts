import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/Models/user/user.model';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { Router } from '@angular/router';
import { OrderState } from 'src/app/Models/order/order.model';
import { GetOrder, OrderPlacedStateService } from 'src/app/services/order-placed-state.service';
import { formatDate } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-shipments-on-way',
  templateUrl: './shipments-on-way.component.html',
  styleUrls: ['./shipments-on-way.component.scss']
})
export class ShipmentsOnWayComponent implements OnInit {

  thead: string[] = ['اختر', 'ترقيم', 'الكود', 'العميل', 'المحافظة', 'المنطقة'
    , 'كلفة توصيل المندوب ', 'كلفة الطلب', 'كلفة التوصيل', 'تسليم المبلغ للعميل', 'حالة الشحنة', 'موقع المبلغ', 'رقم طياعة المندوب', 'رقم طباعة العميل'];
  ids: any[] = []
  orders: any[] = []
  moenyPlaced
  MoenyPlaced: any[] = []
  constructor(
    private orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    public orderplacedstate: OrderPlacedStateService,
    private spinner: NgxSpinnerService,

  ) { }
  AgentId
  Agent
  Agents: User[] = []
  Orderplaced
  orderPlace: NameAndIdDto[] = []
  filtering: OrderFilter
  noDataFound: boolean = false
  canEditCost: boolean[] = []
  temporderscost: any[] = []
  tempordersmonePlaced: any[] = []
  tempordersOrderPlaced: any[] = []
  getorders: GetOrder[] = []
  temporder: GetOrder[] = []
  getorder: GetOrder = new GetOrder()
  orderstates: OrderState[] = []
  orderstate: OrderState = new OrderState()
  selectAll: boolean;
  totalCost: number = 0;
  totalDelaveryCost: number = 0;
  endTotal: number = 0;
  getMoenyPlaced
  countriesAgent: [] = []

  ngOnInit(): void {
    this.getAgent()
    this.GetMoenyPlaced()
    this.GetorderPlace()
    this.filtering = new OrderFilter
    localStorage.removeItem('printordersagent')
    localStorage.removeItem('printagent')
  }
  selectAllOrders() {
    if (this.selectAll) {
      this.getorders.forEach(order => {
        this.selectOrder(order);
      })
    }
    else {
      this.getorders.forEach(order => {
        this.unSelectOrder(order, this.getorders.indexOf(order));
        this.orders = [];
      })
    }
    this.changeAllOrderPlaced()
  }
  selectOrder(order: GetOrder) {
    order.canEditOrder = true;
    this.selectOrderPrint(order.order)
  }
  unSelectOrder(order: GetOrder, index: number) {
    order.canEditOrder = false;
    order.canEditCost = false;
    this.canselChange(order, index);
    this.unSelectOrderPrint(order.order.id);
  }
  canSelectAllOrders(order: GetOrder, index: number) {
    if (this.getorders.filter(o => o.canEditOrder == true).length == this.getorders.length)
      this.selectAll = true;
    else
      this.selectAll = false;
    if (!order.canEditOrder) {
      this.unSelectOrder(order, index);
    }
    else {
      this.selectOrder(order);
    }
    this.changeAllOrderPlaced();
  }
  selectOrderPrint(order) {
    this.orders.push(order)
  }
  unSelectOrderPrint(orderId: number) {
    this.orders = this.orders.filter(o => o.id != orderId);
  }
  GetMoenyPlaced() {
    this.orderservice.MoenyPlaced().subscribe(res => {
      this.MoenyPlaced = res;
      this.getMoenyPlaced = [...res];

      // this.MoenyPlaced = this.MoenyPlaced.filter(o => o.id != 4)
    })
  }
  GetorderPlace() {
    this.orderservice.orderPlace().subscribe(res => {
      this.orderPlace = res
      this.orderPlace = this.orderPlace.filter(o => o.id != 1 && o.id != 2)
    })
  }
  changeMoenyPlaced() {
    if (this.getorders.length != 0) {
      this.getorders.filter(o => o.canEditOrder == true).forEach(o => {
        if (o.MoenyPlaced.filter(m => m == this.moenyPlaced).length == 0) {
          o.order.monePlaced = { ...o.MoenyPlaced[0] }
          return;
        }
        o.order.monePlaced = { ...this.MoenyPlaced.find(m => m.id == this.moenyPlaced.id) }
        if (this.Orderplaced.id == 4 && this.moenyPlaced.id == 4) {
          if (o.order.isClientDiliverdMoney) {
            o.order.monePlaced = { ... this.MoenyPlaced.find(m => m.id == 4) }
          }
          else {
            o.order.monePlaced = { ...this.MoenyPlaced.find(m => m.id == 3) }
          }
        }
      })
    }
    this.total()
  }
  changeAllOrderPlaced() {
    this.changeMoenyPlacedArray();
    if (this.Orderplaced)
      this.getorders.filter(o => o.canEditOrder == true).forEach(order => {
        order.order.orderplaced = { ...this.Orderplaced }
        this.ChangeOrderplacedId(order, this.getorders.indexOf(order))
      })
  }
  changeMoenyPlacedArray() {
    this.getMoenyPlaced = [...this.MoenyPlaced]
    this.moenyPlaced = null
    if (this.Orderplaced) {
      this.getMoenyPlaced = this.orderplacedstate.ChangeOrderPlace(this.Orderplaced.id, this.getMoenyPlaced)
      this.total()
    }
  }
  ChangeOrderplacedId(element: GetOrder, index: number) {
    this.orderplacedstate.canChangeCost(element, this.MoenyPlaced, this.temporderscost[index])
    this.orderplacedstate.sentDeliveredHanded(element, this.MoenyPlaced, this.tempordersmonePlaced[index])
    this.orderplacedstate.onWay(element, this.MoenyPlaced)
    this.orderplacedstate.unacceptable(element, this.MoenyPlaced)
    this.orderplacedstate.isClientDiliverdMoney(element, this.MoenyPlaced)
    this.total()
  }
  canselChange(element, index) {
    element.order.cost = Object.assign(this.temporderscost[index], this.temporderscost[index]);
    element.order.orderplaced = Object.assign(this.tempordersOrderPlaced[index], this.tempordersOrderPlaced[index]);
    element.order.monePlaced = Object.assign(this.tempordersmonePlaced[index], this.tempordersmonePlaced[index]);
  }
  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agents = res
    })
  }
  ChangeAgentId() {
    if (this.Agent) {
      this.countriesAgent = []
      this.filtering.AgentId = this.Agent.id
      this.countriesAgent = this.Agent.countries
      this.filtering.OrderplacedId = 3
      if (this.filtering.AgentPrintStartDate)
        this.filtering.AgentPrintStartDate = formatDate(this.filtering.AgentPrintStartDate, 'MM/dd/yyyy', 'en');
      if (this.filtering.AgentPrintEndDate)
        this.filtering.AgentPrintEndDate = formatDate(this.filtering.AgentPrintEndDate, 'MM/dd/yyyy', 'en');
      this.getOrders();
    }
  }
  getOrders() {
    this.orderservice.WithoutPaging(this.filtering).subscribe(response => {
      this.getorders = []
      if (response)
        if (response.data.length == 0)
          this.noDataFound = true
        else this.noDataFound = false
      response.data.forEach(element => {
        this.getorder.order = element
        this.getorder.MoenyPlaced = this.MoenyPlaced
        this.getorder.OrderPlaced = this.orderPlace
        this.getorder.canEditCost = false
        this.orderplacedstate.onWay(this.getorder, this.MoenyPlaced)
        if (this.getorder.order.orderplaced.id == 1 || this.getorder.order.orderplaced.id == 2)
          this.getorder.order.orderplaced = this.getorder.OrderPlaced[0]
        this.getorder.order.date = this.getorder.order.date.split('T')[0]
        this.getorder.order.date = new Date(this.getorder.order.date)
        this.getorders.push(this.getorder)
        this.getorder = new GetOrder()
      });
      this.temporderscost = Object.assign({}, this.getorders.map(o => o.order.cost));
      this.tempordersOrderPlaced = Object.assign({}, this.getorders.map(o => o.order.orderplaced));
      this.tempordersmonePlaced = Object.assign({}, this.getorders.map(o => o.order.monePlaced));
      this.temporder = this.getorders
      this.total()
    },
      err => {

      });
  }
  saveEdit() {
    for (let i = 0; i < this.orders.length; i++) {
      this.orderstate.Id = this.orders[i].id
      this.orderstate.Cost = this.orders[i].cost * 1
      this.orderstate.DeliveryCost = this.orders[i].deliveryCost * 1
      this.orderstate.AgentCost = this.orders[i].agentCost * 1
      this.orderstate.Note = this.orders[i].note
      this.orderstate.MoenyPlacedId = this.orders[i].monePlaced.id
      this.orderstate.OrderplacedId = this.orders[i].orderplaced.id
      this.orderstates.push(this.orderstate)
      this.orderstate = new OrderState
    }
    this.spinner.show();
    this.orderservice.UpdateOrdersStatusFromAgent(this.orderstates).subscribe(res => {
      this.getOrders()
      this.spinner.hide()
      this.orderstates = []
      this.notifications.create('success', 'تم تعديل الطلبيات  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    }, err => {
      this.spinner.hide()
    })
  }
  print() {
    if (this.noDataFound == true || this.orders.length == 0) {
      this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    var agent = this.Agents.find(c => c.id == this.filtering.AgentId)
    // console.log(agent)
    localStorage.setItem('printagent', JSON.stringify(agent))
    localStorage.setItem('printordersagent', JSON.stringify(this.orders))
    this.route.navigate(['app/reports/printagentpreview'])

  }
  total() {
    this.totalCost = 0
    this.totalDelaveryCost = 0
    this.endTotal = 0
    this.getorders.forEach(d => {
      if (d.order.orderplaced.id == 4 || d.order.orderplaced.id == 6)
        this.totalCost += d.order.cost
      if (d.order.orderplaced.id == 4 || d.order.orderplaced.id == 6 || d.order.orderplaced.id == 7)
        this.totalDelaveryCost += d.order.deliveryCost
    })
    this.endTotal = this.totalCost - this.totalDelaveryCost
  }
}
