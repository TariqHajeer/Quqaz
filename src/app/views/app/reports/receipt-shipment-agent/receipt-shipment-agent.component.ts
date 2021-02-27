import { Component, Input, OnChanges, OnInit } from '@angular/core';
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
  selector: 'app-receipt-shipment-agent',
  templateUrl: './receipt-shipment-agent.component.html',
  styleUrls: ['./receipt-shipment-agent.component.scss']
})
export class ReceiptShipmentAgentComponent implements OnInit {

  displayedColumns: string[] = ['code', 'country', 'region'
    , 'cost', 'orderplaced', 'monePlaced', 'edit'];
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
  temporders: any[] = []
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
  }
  GetMoenyPlaced() {
    this.orderservice.MoenyPlaced().subscribe(res => {
      this.MoenyPlaced = res

    })
  }
  GetorderPlace() {
    this.orderservice.orderPlace().subscribe(res => {
      this.orderPlace = res


    })
  }
  getAgent() {
    this.userService.GetAgent().subscribe(res => {
      this.Agents = res
    })
  }
  ChangeAgentId() {
    if (this.AgentId != null) {
      this.filtering.AgentId = this.AgentId
      this.allFilter();
    }
  }
  showcount = false
  addOrder() {
    if (this.Code && this.AgentId) {
      let findorder = this.orders.find(o => o.code == this.Code)
      if (findorder) {
        if (this.getorders.filter(o => o == findorder).length > 0) {
          this.notifications.create("error", "الشحنة مضافة مسبقا", NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });

          return
        }
        this.getorder.order = findorder
        this.getorder.MoenyPlaced = this.MoenyPlaced
console.log( this.getorder.order )
        if (this.getorder.order.isClientDiliverdMoney == true) {
          this.getorder.MoenyPlaced = this.MoenyPlaced.filter(m => m.id == 2 || m.id == 4)
          this.getorder.order.monePlaced = this.getorder.MoenyPlaced[0]
        }
        this.getorders.push(this.getorder)
        for (let i = 0; i < this.getorders.length; i++) {
          this.canEditCount.push(true)
        }
        this.sumCost()
        this.showcount = true
        this.dataSource = new MatTableDataSource(this.getorders)

        this.totalCount = this.dataSource.data.length
        this.temporders = Object.assign({}, this.getorders.map(o => o.order.cost));
        this.Code = ""
        this.getorder = new GetOrder
      } else {
        this.notifications.create("error", "ليس هناك شحنة لهذا الكود", NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      }

    } else this.notifications.create("error", " يجب اختيار مندوب واضافة كود الشحنة  ", NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });

  }
  ChangeOrderplacedId(element, index) {
    if (element.order.orderplaced.id == 6)
      this.canEditCount[index] = false
    else {
      this.canEditCount[index] = true
      element.order.cost = Object.assign(this.temporders[index], this.temporders[index]);

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
      //this.temporders = Object.assign({}, response.data.map(o => o.deliveryCost));
      this.orders = response.data
      // this.dataSource = new MatTableDataSource(response.data)

      //this.totalCount = response.total
    },
      err => {

      });
  }
  count = 0

  sumCost() {
    this.count = 0
    if (this.getorders)
      this.getorders.forEach(o => {
        this.count += o.order.cost
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


}
export class GetOrder {
  constructor() {
    this.MoenyPlaced = []
  }
  order
  MoenyPlaced: NameAndIdDto[]
}