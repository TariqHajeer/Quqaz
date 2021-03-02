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
@Component({
  selector: 'app-shipments-on-way',
  templateUrl: './shipments-on-way.component.html',
  styleUrls: ['./shipments-on-way.component.scss']
})
export class ShipmentsOnWayComponent implements OnInit {

  displayedColumns: string[] = ['code', 'country', 'region'
    , 'cost', 'orderplaced', 'monePlaced'];
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
    public route: Router
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
    if (element.orderplaced.id == 6)
      this.canEditCount[index] = false
    else {
      this.canEditCount[index] = true
      element.cost = Object.assign(this.temporderscost[index], this.temporderscost[index]);

    }
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
      this.temporderscost = Object.assign({}, response.data.map(o => o.cost));
      this.tempordersmonePlaced = Object.assign({}, response.data.map(o => o.monePlaced));
      this.tempisClientDiliverdMoney = Object.assign({}, response.data.map(o => o.isClientDiliverdMoney));
      this.dataSource = new MatTableDataSource(response.data)
      for (let i = 0; i < this.dataSource.data.length; i++) {
        this.canEditCount.push(true)
      }
      this.totalCount = response.total
    },
      err => {

      });
  }
  saveEdit() {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      this.orderstate.Id = this.dataSource.data[i].id
      this.orderstate.Cost = this.dataSource.data[i].cost
      this.orderstate.MoenyPlacedId = this.dataSource.data[i].monePlaced.id
      this.orderstate.OrderplacedId = this.dataSource.data[i].orderplaced.id
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
