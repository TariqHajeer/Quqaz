import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { OrderState } from 'src/app/Models/order/order.model';
import { Paging } from 'src/app/Models/paging';
import { User } from 'src/app/Models/user/user.model';
import { OrderPlacedStateService, GetOrder } from 'src/app/services/order-placed-state.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { AgentOrderService } from 'src/app/services/agent-order.service';

@Component({
  selector: 'app-orders-on-way',
  templateUrl: './orders-on-way.component.html',
  styleUrls: ['./orders-on-way.component.scss']
})
export class OrdersOnWayComponent implements OnInit {


  displayedColumns: string[] = ['select', 'index', 'code', 'client', 'country', 'region'
    , 'agentCost', 'cost', 'deliveryCost', 'orderplaced', 'agentRequestStatus','agentPrintNumber'];
  dataSource = new MatTableDataSource([]);
  ids: any[] = []
  orders: any[] = []
  statu
  MoenyPlacedId
  MoenyPlaced: any[] = []
  constructor(
    private orderservice: AgentOrderService,
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
    this.paging = new Paging
    this.filtering = new OrderFilter
    localStorage.removeItem('ordersagent')
    localStorage.removeItem('printagent')
    this.GetorderPlace();
    this.allFilter()
  }
  GetorderPlace() {
    this.orderservice.orderPlace().subscribe(res => {
      this.orderPlace = res
      this.orderPlace = this.orderPlace.filter(o => o.id != 1 && o.id != 2)
    })
  }
  selection = new SelectionModel<any>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.orders = []
    this.ids = []
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
        if (this.OrderplacedId) {
          row.order.orderplaced = this.OrderplacedId
        }
        row.order.canEditCount=true
        // if (this.MoenyPlacedId) {
        //   row.order.monePlaced = this.MoenyPlacedId
        //   if (this.OrderplacedId.id == 4 && this.MoenyPlacedId.id == 4) {
        //     if (row.order.isClientDiliverdMoney) {
        //       row.order.monePlaced = this.MoenyPlaced.find(m => m.id == 4)
        //     }
        //     else {
        //       row.order.monePlaced = this.MoenyPlaced.find(m => m.id == 3)
        //     }
        //   }
        // }
        //this.orderplaced = this.orders.map(o => o.order.orderplaced)[0]
      }
    if (!this.selection.isSelected(row)) {
      this.ids = this.ids.filter(i => i != row.order.id)
      this.orders = this.orders.filter(o => o != row.order)
    }
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
      // console.log(this.getorders)
      this.dataSource = new MatTableDataSource(this.getorders)
    }

  }
  printNumber
  filterprintNumber() {
    this.getorders = this.temporder
    this.getorders = [...this.getorders.filter(o => o.order.agentPrintNumber == this.printNumber)]
    if (!this.printNumber)
      this.getorders = this.temporder
    this.dataSource = new MatTableDataSource(this.getorders)
  }

  allFilter() {
    // console.log(this.filtering)
    this.orderservice.InWay().subscribe(response => {
      console.log(response)
      this.getorders = []
      if (response)
        if (response.length == 0)
          this.noDataFound = true
        else this.noDataFound = false
      response.forEach(element => {
        this.getorder.order = element
        // this.getorder.MoenyPlaced = this.MoenyPlaced
        this.getorder.OrderPlaced = this.orderPlace
        this.getorder.canEditCount = false
        // this.orderplacedstate.onWay(this.getorder, this.MoenyPlaced)
        // if (this.getorder.order.orderplaced.id == 1 || this.getorder.order.orderplaced.id == 2)
          // this.getorder.order.orderplaced = this.getorder.OrderPlaced[0]
        this.getorder.order.date = this.getorder.order.date.split('T')[0]
        this.getorder.order.date = new Date(this.getorder.order.date)
        this.getorders.push(this.getorder)
        this.getorder = new GetOrder()
      });
      this.temporderscost = Object.assign({}, this.getorders.map(o => o.order.cost));
      // this.tempordersmonePlaced = Object.assign({}, this.getorders.map(o => o.order.monePlaced));
      // this.tempisClientDiliverdMoney = Object.assign({}, this.getorders.map(o => o.order.isClientDiliverdMoney));
      this.temporder = this.getorders
      // this.total()
      this.dataSource = new MatTableDataSource(this.getorders)
      this.getorders = response
      this.totalCount = response.length
    },
      err => {

      });
  }
  saveEdit() {
    this.orderstates=[]
    if (this.noDataFound == true || this.orders.length == 0) {
      this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    for (let i = 0; i < this.orders.length; i++) {
      this.orderstate.Id = this.orders[i].id
      this.orderstate.Cost = this.orders[i].cost*1
      this.orderstate.AgentCost = this.orders[i].agentCost*1
      this.orderstate.OrderplacedId = this.orders[i].orderplaced.id
      this.orderstates.push(this.orderstate)
      this.orderstate = new OrderState
    }
    this.spinner.show();
    // console.log(this.orderstates)
    this.orderservice.SetOrderPlaced(this.orderstates).subscribe(res => {
      this.allFilter()
      this.spinner.hide()
      this.orderstates = []
      this.notifications.create('success', 'تم تعديل الطلبيات  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    }, err => {
      console.log(err)
      this.spinner.hide()
    })
  }
 
  totalCost: number = 0
  totalDelaveryCost: number = 0
  endTotal: number = 0
  // total() {
  //   this.totalCost = 0
  //   this.totalDelaveryCost = 0
  //   this.endTotal = 0
  //   this.getorders.forEach(d => {
  //     if (d.order.orderplaced.id == 4 || d.order.orderplaced.id == 6)
  //       this.totalCost += d.order.cost
  //     if (d.order.orderplaced.id == 4 || d.order.orderplaced.id == 6 || d.order.orderplaced.id == 7)
  //       this.totalDelaveryCost += d.order.deliveryCost
  //   })
  //   this.endTotal = this.totalCost - this.totalDelaveryCost
  // }

  fillter() {
    this.dataSource.data = this.getorders
    if (this.filtering.AgentPrintNumber) {
      this.dataSource.data = this.dataSource.data.filter(o => o.agentPrintNumber == this.filtering.AgentPrintNumber)
    }
    if (this.filtering.Code) {
      this.dataSource.data = this.dataSource.data.filter(o => o.code == this.filtering.Code)
    }
    if (this.filtering.AgentPrintEndDate && this.filtering.AgentPrintStartDate) {
      this.dataSource.data = this.dataSource.data.filter(o => o.date >= this.filtering.AgentPrintStartDate &&
        o.date <= this.filtering.AgentPrintEndDate)
    }
  }
  ChangeOrderplacedId(element, index) {
    this.orderplacedstate.canChangeCost(element, this.MoenyPlaced, this.temporderscost[index])
    this.orderplacedstate.sentDeliveredHanded(element, this.MoenyPlaced, this.tempordersmonePlaced[index], this.tempisClientDiliverdMoney[index])
    this.orderplacedstate.onWay(element, this.MoenyPlaced)
    this.orderplacedstate.unacceptable(element, this.MoenyPlaced)
    this.orderplacedstate.isClientDiliverdMoney(element, this.MoenyPlaced)
    // this.total()

  }
}
