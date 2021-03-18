import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/Models/user/user.model';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { Paging } from 'src/app/Models/paging';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { OrderState } from 'src/app/Models/order/order.model';
import { GetOrder, OrderPlacedStateService } from 'src/app/services/order-placed-state.service';
@Component({
  selector: 'app-shipments-on-way',
  templateUrl: './shipments-on-way.component.html',
  styleUrls: ['./shipments-on-way.component.scss']
})
export class ShipmentsOnWayComponent implements OnInit {

  displayedColumns: string[] = ['code', 'country', 'region'
    , 'cost','isClientDiliverdMoney', 'orderplaced', 'monePlaced','agentPrintNumber','clientPrintNumber'];
  dataSource = new MatTableDataSource([]);
  selection = new SelectionModel<any>(true, []);
  ids: any[] = []
  orders: any[] = []
  statu
  MoenyPlacedId
  MoenyPlaced: any[] = []
  constructor(
    private orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    public orderplacedstate: OrderPlacedStateService
  ) { }
  AgentId
  OrderplacedId
  orderPlace: NameAndIdDto[] = []
  Agents: User[] = []
  paging: Paging
  filtering: OrderFilter
  noDataFound: boolean = false
  canEditCount: boolean[] = []
  temporderscost: any[] = []
  tempordersmonePlaced: any[] = []
  tempisClientDiliverdMoney: any[] = []
  getorders: GetOrder[] = []
  getorder: GetOrder = new GetOrder()
  orderstates: OrderState[] = []
  orderstate: OrderState = new OrderState()
  @Input() totalCount: number;
  ngOnInit(): void {
    this.getAgent()
    this.GetMoenyPlaced()
    this.GetorderPlace()
    this.paging = new Paging
    this.filtering = new OrderFilter
  }
  GetMoenyPlaced() {
    this.orderservice.MoenyPlaced().subscribe(res => {
      this.MoenyPlaced = res
     // this.MoenyPlaced = this.MoenyPlaced.filter(o => o.id != 4)
    })
  }
  GetorderPlace() {
    this.orderservice.orderPlace().subscribe(res => {
      this.orderPlace = res
      this.orderPlace = this.orderPlace.filter(o => o.id != 1 && o.id != 2)
    })
  }
  getAgent() {
    this.userService.GetAgent().subscribe(res => {
      this.Agents = res
    })
  }
  ChangeAgentId() {
    if (this.AgentId != null) {
      this.filtering.OrderplacedId = 3
      this.filtering.AgentId = this.AgentId
      this.allFilter();
    }
  }
  ChangeOrderplacedId(element, index) {
    this.orderplacedstate.canChangeCost(element, this.MoenyPlaced, this.temporderscost[index])
    this.orderplacedstate.sentDeliveredHanded(element, this.MoenyPlaced, this.tempordersmonePlaced[index], this.tempisClientDiliverdMoney[index])
    this.orderplacedstate.onWay(element,this.MoenyPlaced)
    this.orderplacedstate.unacceptable(element,this.MoenyPlaced)
    this.orderplacedstate.isClientDiliverdMoney(element,this.MoenyPlaced)
  }
  changeCost(element, index) {
    if (this.orderplacedstate.rangeCost(element, this.temporderscost[index])) {
     element.messageCost=""
    }else
    element.messageCost=" الكلفة لايمكن أن تتجاوز "+this.temporderscost[index]
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.allFilter();
  }
  allFilter() {
    this.orderservice.GetAll(this.filtering, this.paging).subscribe(response => {
      this.getorders = []
      console.log(response)
      if (response)
        if (response.data.length == 0)
          this.noDataFound = true
        else this.noDataFound = false
        response.data.forEach(element => {
          this.getorder.order=element
          this.getorder.MoenyPlaced = this.MoenyPlaced
          this.getorder.OrderPlaced = this.orderPlace
          this.getorder.canEditCount = true
          this.orderplacedstate.onWay(this.getorder,this.MoenyPlaced)
         if (this.getorder.order.orderplaced.id == 1 || this.getorder.order.orderplaced.id == 2)
            this.getorder.order.orderplaced = this.getorder.OrderPlaced[0]
          this.getorders.push(this.getorder)
          this.getorder=new GetOrder()
        });
      this.temporderscost = Object.assign({},  this.getorders .map(o => o.order.cost));
      this.tempordersmonePlaced = Object.assign({},  this.getorders .map(o => o.order.monePlaced));
      this.tempisClientDiliverdMoney = Object.assign({},  this.getorders .map(o => o.order.isClientDiliverdMoney));
      this.dataSource = new MatTableDataSource( this.getorders )
      
      this.totalCount = response.total
    },
      err => {

      });
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
      this.notifications.create('success', 'تم تعديل الطلبيات  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    })
  }

}
