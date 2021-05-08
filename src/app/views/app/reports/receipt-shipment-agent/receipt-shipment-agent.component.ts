import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';
import { GetOrder, OrderPlacedStateService } from 'src/app/services/order-placed-state.service';
import { User } from 'src/app/Models/user/user.model';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { Paging } from 'src/app/Models/paging';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { OrderState } from 'src/app/Models/order/order.model';
@Component({
  selector: 'app-receipt-shipment-agent',
  templateUrl: './receipt-shipment-agent.component.html',
  styleUrls: ['./receipt-shipment-agent.component.scss']
})
export class ReceiptShipmentAgentComponent implements OnInit {

  displayedColumns: string[] = ['code','client', 'country', 'region'
    , 'cost', 'isClientDiliverdMoney', 'orderplaced', 'monePlaced', 'edit'];
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
    private orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    public orderplacedstate: OrderPlacedStateService
  ) { }
  AgentId

  orderPlace: NameAndIdDto[] = []
  Agents: User[] = []
  paging: Paging
  filtering: OrderFilter
  noDataFound: boolean = false
  canEditCount: boolean[] = []
  temporderscost: any[] = []
  tempordersmonePlaced: GetOrder[] = []
  tempisClientDiliverdMoney: any[] = []
  orderstates: OrderState[] = []
  orderstate: OrderState = new OrderState()
  @Input() totalCount: number;

  ngOnInit(): void {
    this.getAgent()
    this.GetMoenyPlaced()
    this.GetorderPlace()
    this.paging = new Paging
    this.filtering = new OrderFilter
    this.dataSource = new MatTableDataSource([])
    this.getorder = new GetOrder

  }

  GetMoenyPlaced() {
    this.orderservice.MoenyPlaced().subscribe(res => {
      this.MoenyPlaced = res
      this.getMoenyPlaced = [...res]
      // this.MoenyPlaced = this.MoenyPlaced.filter(o => o.id != 4)

    })
  }
  getmony() {
    this.orderservice.MoenyPlaced().subscribe(res => {
      this.MoenyPlaced = res

    })
  }
  changeMoenyPlaced() {
    if (this.getorders.length != 0) {
      this.getorders.forEach(o => {
        o.order.monePlaced = this.MoenyPlaced.find(m => m.id == this.MoenyPlacedId.id)
        if (this.OrderplacedId.id == 4 && this.MoenyPlacedId.id == 4) {
          if (o.order.isClientDiliverdMoney) {
            o.order.monePlaced = this.MoenyPlaced.find(m => m.id == 4)
          }
          else {
            o.order.monePlaced = this.MoenyPlaced.find(m => m.id == 3)
          }
        }


      })

    }
  }

  GetorderPlace() {
    this.orderservice.orderPlace().subscribe(res => {
      this.orderPlace = res
      console.log(res)
      this.orderPlace = this.orderPlace.filter(o => o.id != 1 && o.id != 2)
    })
  }
  changeOrderPlaced() {
    if (this.getorders.length != 0) {
      this.getorders.forEach(o => {
        o.order.orderplaced = { ...this.OrderplacedId }
        this.ChangeOrderplacedId(o, this.getorders.indexOf(o))
      })
      this.MoenyPlacedId = null
      this.getMoenyPlaced = [...this.getorders[0].MoenyPlaced]
      if (this.OrderplacedId.id == 4)
        this.getMoenyPlaced = [{ id: 2, name: "مندوب" }, { id: 4, name: "تم تسليمها/داخل الشركة" }]

    }

  }
  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agents = res
    })
  }
  // ChangeAgentId() {
  //   if (this.AgentId != null) {
  //     this.filtering.AgentId = this.AgentId
  //     this.allFilter();
  //   }
  // }
  showcount = false
  findorder
  Ordersfilter: any[] = []
  addOrder() {
    this.Ordersfilter=[]
    this.showTable = false

    if (this.Code) {
      this.orderservice.GetOrderByAgent(this.Code).subscribe(res => {
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
  addOrders(){
    
    this.getorder.order = { ...this.findorder[0] }
    this.getorder.MoenyPlaced = [...this.MoenyPlaced]
    this.getorder.OrderPlaced = [...this.orderPlace]
    this.getorder.canEditCount = true
    this.orderplacedstate.canChangeCost(this.getorder, this.MoenyPlaced)
    this.orderplacedstate.sentDeliveredHanded(this.getorder, this.MoenyPlaced)
    this.orderplacedstate.onWay(this.getorder, this.MoenyPlaced)
    this.orderplacedstate.unacceptable(this.getorder, this.MoenyPlaced)
    this.orderplacedstate.isClientDiliverdMoney(this.getorder, this.MoenyPlaced)
    if (this.getorder.order.orderplaced.id == 1 || this.getorder.order.orderplaced.id == 2) {
      this.getorder.order.orderplaced = this.getorder.OrderPlaced.find(o => o.id == 3)
    }
    if (this.getorders.filter(o => o.order.code == this.getorder.order .code&&o.order.client.id==this.getorder.order.client.id).length > 0) {
      this.notifications.create("error", "الشحنة مضافة مسبقا", NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      return
    }
    this.getorder.order.Cost= this.getorder.order.Cost*1
    this.getorders.unshift({ ...this.getorder })
    this.sumCost()
    this.showcount = true
    this.dataSource = new MatTableDataSource(this.getorders)
    this.totalCount = this.dataSource.data.length
    this.temporderscost = Object.assign({}, this.getorders.map(o => o.order.cost));
    this.tempordersmonePlaced = Object.assign({}, this.getorders.map(o => o.order.monePlaced));
    this.tempisClientDiliverdMoney = Object.assign({}, this.getorders.map(o => o.order.isClientDiliverdMoney));
    this.Code = ""
    this.getorder = new GetOrder
  }
  showTable: boolean = false
  add(order) {
    this.findorder=this.Ordersfilter.filter(o=>o==order)
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
  ChangeOrderplacedId(element, index) {
    // this.GetMoenyPlaced()
    this.getmony()
    this.orderplacedstate.canChangeCost(element, this.MoenyPlaced, this.temporderscost[index])
    this.orderplacedstate.sentDeliveredHanded(element, this.MoenyPlaced)
    this.orderplacedstate.onWay(element, this.MoenyPlaced)
    this.orderplacedstate.unacceptable(element, this.MoenyPlaced)
    this.orderplacedstate.isClientDiliverdMoney(element, this.MoenyPlaced)
  }

  changeCost(element, index) {
    element.order.cost=element.order.cost*1
    // if (this.orderplacedstate.rangeCost(element, this.temporderscost[index])) {
    //   element.messageCost = ""
    // } else
    //   element.messageCost = " الكلفة لايمكن أن تتجاوز " + this.temporderscost[index]
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.allFilter();
  }
  allFilter() {
    this.orderservice.GetAll(this.filtering, this.paging).subscribe(response => {
      this.canEditCount = []
      if (response)
        if (response.data.length == 0)
          this.noDataFound = true
        else this.noDataFound = false
      this.orders = response.data

    },
      err => {

      });
  }
  count = 0

  deliveryCostCount
  sumCost() {
    this.count = 0
    this.deliveryCostCount = 0
    if (this.getorders)
      this.getorders.forEach(o => {
        this.count += o.order.cost
        this.deliveryCostCount += o.order.deliveryCost
      })
    return this.count
  }

  saveEdit() {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      this.orderstate.Id = this.dataSource.data[i].order.id
      this.orderstate.Cost = this.dataSource.data[i].order.cost
      this.orderstate.MoenyPlacedId = this.dataSource.data[i].order.monePlaced.id
      this.orderstate.OrderplacedId = this.dataSource.data[i].order.orderplaced.id
      this.orderstates.push(this.orderstate)
      this.orderstate = new OrderState
    }

    this.orderservice.UpdateOrdersStatusFromAgent(this.orderstates).subscribe(res => {
      this.allFilter()
      this.orderstates = []
      this.dataSource = new MatTableDataSource([])
      this.getorders = []
      this.sumCost()
      this.notifications.create('success', 'تم تعديل الطلبيات  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    })
  }

  CancelOrder(order){
    this.getorders=this.getorders.filter(o=>o!=order);
    var index = this.dataSource.data.indexOf(order);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
    this.sumCost()

  }
}
