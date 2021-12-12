import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { MoneyPalcedEnum } from 'src/app/Models/Enums/MoneyPalcedEnum';
import { OrderplacedEnum } from 'src/app/Models/Enums/OrderplacedEnum';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { OrderState } from 'src/app/Models/order/order.model';
import { Paging } from 'src/app/Models/paging';
import { User } from 'src/app/Models/user/user.model';
import { GetOrder, OrderPlacedStateService } from 'src/app/services/order-placed-state.service';
import { UserService } from 'src/app/services/user.service';
import { SelectionModel } from '@angular/cdk/collections';
import { AgentOrderService } from 'src/app/services/agent-order.service';


@Component({
  selector: 'app-order-by-code',
  templateUrl: './order-by-code.component.html',
  styleUrls: ['./order-by-code.component.scss']
})
export class OrderByCodeComponent implements OnInit {

  displayedColumns: string[] = ['index', 'code', 'client', 'country'
    , 'cost', 'orderplaced','deliveryCost',  'edit'];
  dataSource = new MatTableDataSource([]);
  selection = new SelectionModel<any>(true, []);
  Code
  ids: any[] = []
  orders: any[] = []
  getorders: GetOrder[] = []
  getorder: GetOrder = new GetOrder()
  statu
  MoenyPlacedId
  MoenyPlaced: any[] = []
  getMoenyPlaced: any[] = []
  OrderplacedId
  constructor(
    private agentService: AgentOrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    public orderplacedstate: OrderPlacedStateService,
    private spinner: NgxSpinnerService,

  ) { }
  AgentId

  orderPlace: NameAndIdDto[] = []
  Agents: User[] = []
  paging: Paging
  filtering: OrderFilter
  noDataFound: boolean = false
  canEditCount: boolean[] = []
  temporderscost: any[] = []
  tempagentCost: any[] = []
  tempdeliveryCost: any[] = []
  tempordersmonePlaced: GetOrder[] = []
  tempisClientDiliverdMoney: any[] = []
  orderstates: OrderState[] = []
  orderstate: OrderState = new OrderState()
  @Input() totalCount: number;

  ngOnInit(): void {
    this.GetorderPlace()
    this.paging = new Paging
    this.filtering = new OrderFilter
    this.dataSource = new MatTableDataSource([])
    this.getorder = new GetOrder();
    this.getorder.order.index = 0;
  }

 
  GetorderPlace() {
    this.agentService.orderPlace().subscribe(res => {
      this.orderPlace = res
      this.orderPlace = this.orderPlace.filter(o => o.id != 1 && o.id != 2)
    })
  }
  changeOrderPlaced() {
    if (this.getorders.length != 0) {
      this.getorders.forEach(o => {
        o.order.orderplaced = { ...this.OrderplacedId }
        this.ChangeAllOrderplacedId(o, this.getorders.indexOf(o))
      })
      this.MoenyPlacedId = null
      this.getMoenyPlaced = this.orderplacedstate.ChangeOrderPlace(this.OrderplacedId.id, this.MoenyPlaced)
     console.log( this.getMoenyPlaced )
      // if (this.OrderplacedId.id == 4)
      //   this.getMoenyPlaced = [{ id: 2, name: "مندوب" }, { id: 4, name: "تم تسليمها/داخل الشركة" }]

    }

  }
 
  showcount = false
  findorder
  Ordersfilter: any[] = []
  addOrder() {
    this.Ordersfilter = []
    this.showTable = false
    if (this.Code) {
      this.agentService.InWayByCode(this.Code).subscribe(res => {
        console.log(res)
        this.findorder = res
        if (this.findorder) {
          if (this.findorder.length == 1) {
            this.addOrders()
          }
          else if (this.findorder.length > 1) {
            this.showTable = true
            this.Ordersfilter = res as []
          }
        }
        else {
          this.notifications.create("error", "ليس هناك شحنة لهذا الكود", NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
        }
      }, err => {
        this.notifications.create("error", err.error.message, NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      }
      )


    } else this.notifications.create("error", " يجب اضافة كود الشحنة  ", NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });

  }
  addOrders() {

    this.getorder.order = { ...this.findorder[0] }
    this.getorder.MoenyPlaced = [...this.MoenyPlaced]
    this.getorder.OrderPlaced = [...this.orderPlace]
    this.getorder.canEditCount = true
    this.orderplacedstate.canChangeCost(this.getorder, this.MoenyPlaced)
    this.orderplacedstate.sentDeliveredHanded(this.getorder, this.MoenyPlaced)
    this.orderplacedstate.onWay(this.getorder, this.MoenyPlaced)
    this.orderplacedstate.unacceptable(this.getorder, this.MoenyPlaced)
    this.orderplacedstate.isClientDiliverdMoney(this.getorder, this.MoenyPlaced)
    this.orderplacedstate.EditDeliveryCostAndAgentCost(this.getorder, this.getorder.order.deliveryCost, this.getorder.order.agentCost)

    if (this.getorder.order.orderplaced.id == 1 || this.getorder.order.orderplaced.id == 2) {
      this.getorder.order.orderplaced = this.getorder.OrderPlaced.find(o => o.id == 3)
    }
    if (this.getorders.filter(o => o.order.code == this.getorder.order.code && o.order.client.id == this.getorder.order.client.id).length > 0) {
      this.notifications.create("error", "الشحنة مضافة مسبقا", NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      return
    }
    this.getorder.order.Cost = this.getorder.order.Cost * 1
    this.getorder.order.index = this.getorders.length + 1;
    this.getorders.unshift({ ...this.getorder })
    this.sumCost()
    this.showcount = true
    this.dataSource = new MatTableDataSource(this.getorders)
    this.totalCount = this.dataSource.data.length
    this.temporderscost = Object.assign({}, this.getorders.map(o => o.order.cost));
    this.tempdeliveryCost = Object.assign({}, this.getorders.map(o => o.order.deliveryCost));
    this.tempagentCost = Object.assign({}, this.getorders.map(o => o.order.agentCost));
    this.tempordersmonePlaced = Object.assign({}, this.getorders.map(o => o.order.monePlaced));
    this.tempisClientDiliverdMoney = Object.assign({}, this.getorders.map(o => o.order.isClientDiliverdMoney));
    this.Code = ""
    this.getorder = new GetOrder
  }
  showTable: boolean = false
  add(order) {
    this.findorder = this.Ordersfilter.filter(o => o == order)
    this.addOrders()
    this.Ordersfilter = this.Ordersfilter.filter(o => o != order)
    if (this.Ordersfilter.length == 0) {
      this.showTable = false
      this.Code = ""

    }
  }
  cancel(order) {
    this.Ordersfilter = this.Ordersfilter.filter(o => o != order)
    if (this.Ordersfilter.length == 0) {
      this.showTable = false
      this.Code = ""

    }
  }
  ChangeAllOrderplacedId(element, index) {
    try{
      this.orderplacedstate.canChangeCost(element, this.MoenyPlaced, this.temporderscost[index])
      this.orderplacedstate.sentDeliveredHanded(element, this.MoenyPlaced)
      this.orderplacedstate.onWay(element, this.MoenyPlaced)
      this.orderplacedstate.unacceptable(element, this.MoenyPlaced)
      this.orderplacedstate.isClientDiliverdMoney(element, this.MoenyPlaced)
      this.orderplacedstate.EditDeliveryCostAndAgentCost(element, this.tempdeliveryCost[index], this.tempagentCost[index])
      this.sumCost()
    }catch{
      this.notifications.create("error", "يوجد خطأ في 237", NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });

    }
   
  }
  ChangeOrderplacedId(element, index) {
    // this.GetMoenyPlaced()
    this.OrderplacedId = null
    this.MoenyPlacedId = null
    this.getMoenyPlaced = []
    this.orderplacedstate.canChangeCost(element, this.MoenyPlaced, this.temporderscost[index])
    this.orderplacedstate.sentDeliveredHanded(element, this.MoenyPlaced)
    this.orderplacedstate.onWay(element, this.MoenyPlaced)
    this.orderplacedstate.unacceptable(element, this.MoenyPlaced)
    this.orderplacedstate.isClientDiliverdMoney(element, this.MoenyPlaced)
    this.orderplacedstate.EditDeliveryCostAndAgentCost(element, this.tempdeliveryCost[index], this.tempagentCost[index])
    this.sumCost()
  }

  changeCost(element, index) {
    this.orderplacedstate.canChangeCost(element, this.MoenyPlaced, this.temporderscost[index])
  }
  count = 0
  agentCost
  deliveryCostCount
  sumCost() {
    this.count = 0
    this.deliveryCostCount = 0
    this.agentCost = 0
    if (this.getorders)
      this.getorders.forEach(o => {
        this.count += o.order.cost * 1
        this.deliveryCostCount += o.order.deliveryCost * 1
        this.agentCost += o.order.agentCost * 1
      })
    return this.count
  }

  saveEdit() {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      this.orderstate.Id = this.dataSource.data[i].order.id
      this.orderstate.Cost = this.dataSource.data[i].order.cost * 1
      this.orderstate.OrderplacedId = this.dataSource.data[i].order.orderplaced.id
      // console.log(this.orderstate)
      this.orderstates.push(this.orderstate)
      this.orderstate = new OrderState
    }
    this.spinner.show();
    // console.log(this.orderstates)
    this.agentService.SetOrderPlaced(this.orderstates).subscribe(res => {
      this.spinner.hide();
      this.orderstates = []
      this.dataSource = new MatTableDataSource([])
      this.getorders = []
      this.sumCost()
      this.OrderplacedId = null
      this.MoenyPlacedId = null
      this.getMoenyPlaced = []
      this.notifications.create('success', 'تم تعديل الطلبيات  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    }, err => {
      this.spinner.hide();
    })
  }
  tempOrders: any[] = []
  CancelOrder(order) {
    this.getorders = this.getorders.filter(o => o.order.id != order.order.id);
    var index = 0
    this.tempOrders = []
    this.getorders.forEach(o => {
      o.order.index = index + 1;
      index++;
      this.tempOrders.push({ ...o })
    })
    this.dataSource = new MatTableDataSource(this.tempOrders)
    this.totalCount = this.dataSource.data.length
    this.temporderscost = Object.assign({}, this.getorders.map(o => o.order.cost));
    this.tempordersmonePlaced = Object.assign({}, this.getorders.map(o => o.order.monePlaced));
    this.tempisClientDiliverdMoney = Object.assign({}, this.getorders.map(o => o.order.isClientDiliverdMoney));
    this.tempdeliveryCost = Object.assign({}, this.getorders.map(o => o.order.deliveryCost));
    this.tempagentCost = Object.assign({}, this.getorders.map(o => o.order.agentCost));
    // var index = this.dataSource.data.indexOf(order);
    // this.dataSource.data.splice(index, 1);
    // this.dataSource._updateChangeSubscription();
    this.sumCost()

  }
  keyPressNumbers(event, cost) {
    // console.log(cost)
    // console.log("1")
    var charCode = (event.which) ? event.which : event.keyCode;
    // console.log(charCode)

    if (charCode == 45 && cost == 0) {
      // console.log("2")
      return true
    }
    else
      // Only Numbers 0-9
      if ((charCode < 48 || charCode > 57)) {
        // console.log("3")
        event.preventDefault();
        return false;
      } else {
        // console.log("4")
        return true;
      }
  }

}
