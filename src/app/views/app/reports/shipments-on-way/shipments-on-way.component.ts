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
import { DatePipe, formatDate } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-shipments-on-way',
  templateUrl: './shipments-on-way.component.html',
  styleUrls: ['./shipments-on-way.component.scss']
})
export class ShipmentsOnWayComponent implements OnInit {

  displayedColumns: string[] = ['select','index','code', 'client', 'country', 'region'
    ,'agentCost', 'cost', 'deliveryCost', 'isClientDiliverdMoney', 'orderplaced', 'monePlaced', 'agentPrintNumber', 'clientPrintNumber'];
  dataSource = new MatTableDataSource([]);
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
    public orderplacedstate: OrderPlacedStateService,
    private spinner: NgxSpinnerService,

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
    localStorage.removeItem('printordersagent')
    localStorage.removeItem('printagent')
  }
  selection = new SelectionModel<any>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => { this.selection.select(row) });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    this.checkboxId(row)
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
 
  client = this.orders.map(o => o.agent)[0]
  orderplaced = this.orders.map(o => o.orderplaced)[0]
  checkboxId(row) {
    if (this.selection.isSelected(row))
      if (this.ids.filter(d => d == row.order.id).length > 0)
        return
      else {
        this.ids.push(row.order.id)
        this.orders.push(row.order)
        localStorage.setItem('printordersagent', JSON.stringify(this.orders))
       // this.client = this.orders.map(o => o.order.client)[0]
        //this.orderplaced = this.orders.map(o => o.order.orderplaced)[0]
      }
    if (!this.selection.isSelected(row)) {
      this.ids = this.ids.filter(i => i != row.order.id)
      this.orders = this.orders.filter(o => o != row.order)
    }
  }
  GetMoenyPlaced() {
    this.orderservice.MoenyPlaced().subscribe(res => {
      this.MoenyPlaced = res
      this.getMoenyPlaced = [...res]

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
    this.total()
  }

  getMoenyPlaced
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
    this.total()
  }
  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
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
    this.orderplacedstate.onWay(element, this.MoenyPlaced)
    this.orderplacedstate.unacceptable(element, this.MoenyPlaced)
    this.orderplacedstate.isClientDiliverdMoney(element, this.MoenyPlaced)
    this.total()

  }
  changeCost(element, index) {
    if (this.orderplacedstate.rangeCost(element, this.temporderscost[index])) {
      element.messageCost = ""
    } else
      element.messageCost = " الكلفة لايمكن أن تتجاوز " + this.temporderscost[index]
      this.total()
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.allFilter();
  }
  todate
  fordate
  tempdate
  temporder
  filterOfDate() {
    this.getorders = this.temporder
    if (this.fordate && this.todate) {
      this.todate = formatDate(this.todate, 'MM/dd/yyyy', 'en');
      this.fordate = formatDate(this.fordate, 'MM/dd/yyyy', 'en');
      this.getorders.forEach(o => {
        o.order.date = formatDate(o.order.date, 'MM/dd/yyyy', 'en');
      })
      this.getorders = [...this.getorders.filter(o => o.order.date >= this.todate &&
        o.order.date <= this.fordate)]
        console.log(this.getorders)
      this.dataSource = new MatTableDataSource(this.getorders)
    }


  }
  allFilter() {
    this.orderservice.GetAll(this.filtering, this.paging).subscribe(response => {
      this.getorders = []
      if (response)
        if (response.data.length == 0)
          this.noDataFound = true
        else this.noDataFound = false
      response.data.forEach(element => {
        this.getorder.order = element
        this.getorder.MoenyPlaced = this.MoenyPlaced
        this.getorder.OrderPlaced = this.orderPlace
        this.getorder.canEditCount = true
        this.orderplacedstate.onWay(this.getorder, this.MoenyPlaced)
        if (this.getorder.order.orderplaced.id == 1 || this.getorder.order.orderplaced.id == 2)
          this.getorder.order.orderplaced = this.getorder.OrderPlaced[0]
        this.getorder.order.date = this.getorder.order.date.split('T')[0]
        this.getorder.order.date = new Date(this.getorder.order.date)
        this.getorders.push(this.getorder)
        this.getorder = new GetOrder()
      });
      this.temporderscost = Object.assign({}, this.getorders.map(o => o.order.cost));
      this.tempordersmonePlaced = Object.assign({}, this.getorders.map(o => o.order.monePlaced));
      this.tempisClientDiliverdMoney = Object.assign({}, this.getorders.map(o => o.order.isClientDiliverdMoney));
      this.temporder = this.getorders
      this.total()
      this.dataSource = new MatTableDataSource(this.getorders)
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
    this.spinner.show();
    console.log(this.orderstates)
    this.orderservice.UpdateOrdersStatusFromAgent(this.orderstates).subscribe(res => {
      this.allFilter()
      this.spinner.hide()
      this.orderstates = []
      this.notifications.create('success', 'تم تعديل الطلبيات  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    }, err => {
      this.spinner.hide()
    })
  }
  print() {
    if (this.noDataFound == true || this.getorders.length == 0) {
      this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    localStorage.setItem('printagent', JSON.stringify(this.Agents.find(c => c.id == this.AgentId)))
     localStorage.setItem('printordersagent', JSON.stringify(this.orders))
    this.route.navigate(['app/reports/printagentpreview'])

  }
  totalCost:number=0
  totalDelaveryCost:number=0
  endTotal:number=0
  total() {
    this.totalCost=0
    this.totalDelaveryCost=0
    this.endTotal=0
    this.getorders.forEach(d => {
      if(d.order.orderplaced.id==4||d.order.orderplaced.id==6)
      this.totalCost += d.order.cost
      if(d.order.orderplaced.id==4||d.order.orderplaced.id==6||d.order.orderplaced.id==7)
      this.totalDelaveryCost+=d.order.deliveryCost
    })
    this.endTotal=this.totalCost-this.totalDelaveryCost
  }
}
