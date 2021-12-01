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
  temporder: any[] = []
  OrderplacedId
  orderPlace: NameAndIdDto[] = []
  filtering: OrderFilter
  noDataFound: boolean = false
  getorders: GetOrder[] = []
  getorder: GetOrder = new GetOrder()
  orderstates: OrderState[] = []
  orderstate: OrderState = new OrderState()
  @Input() totalCount: number;
  constructor(
    private orderservice: AgentOrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    public orderplacedstate: OrderPlacedStateService,
    private spinner: NgxSpinnerService,

  ) { }
 
  ngOnInit(): void {
    this.filtering = new OrderFilter
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
      this.dataSource.data.forEach(row => { this.selection.select(row.order.id) });
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
    let order=this.dataSource.data.find(o=>o.order.id==row)
    if (this.selection.isSelected(row))
      if (this.ids.filter(d => d == row).length > 0)
        return
      else {
        this.ids.push(row)
        this.orders.push(order.order)
        if (this.OrderplacedId) {
          order.order.orderplaced = {...this.OrderplacedId}
        }
        order.order.canEditCount=true
      }
    if (!this.selection.isSelected(row)) {
      order.order={...this.temporder.find(o => o.id == row)}
      order.order.canEditCount=false
      this.ids = this.ids.filter(i => i != row)
      this.orders = this.orders.filter(o => o.id != row)
    }
  }

 
  allFilter() {
    // console.log(this.filtering)
    this.orderservice.InWay().subscribe(response => {
      // console.log(response)
      this.getorders = []
      if (response)
        if (response.length == 0)
          this.noDataFound = true
        else this.noDataFound = false
      response.forEach(element => {
        this.getorder.order = element
        this.getorder.OrderPlaced = this.orderPlace
        this.getorder.canEditCount = false
        this.getorder.order.date = this.getorder.order.date.split('T')[0]
        this.getorder.order.date = new Date(this.getorder.order.date)
        this.getorders.push(this.getorder)
        this.getorder = new GetOrder()
      });
      this.temporder = [...this.getorders.map(o=>o.order)]
      console.log(this.temporder)
      // this.total()
      this.dataSource = new MatTableDataSource(this.getorders)
      this.getorders = response
      this.totalCount = response.length
    },
      err => {

      });
  }
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
  ChengeOrderplaced(){
    let array=this.dataSource.data.filter(o=>o.order.canEditCount==true)
    array.forEach(o=>{
      o.order.orderplaced = {...this.OrderplacedId}
    })
  }
  saveEdit() {
    this.orderstates=[]
    if (this.noDataFound == true || this.orders.length == 0) {
      this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    if(this.orders.filter(o=>o.orderplaced.id==3).length>0){
      this.notifications.create('error', 'لايمكن ان تكون الطلبات في الطريق', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
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
    // console.log(this.orders)
    this.orderservice.SetOrderPlaced(this.orderstates).subscribe(res => {
      // this.allFilter()
      this.spinner.hide()
      this.orderstates = []
      this.orders.forEach(o=>{
        this.dataSource.data=this.dataSource.data.filter(d=>d.order!=o)
      })
      this.orders=[]
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

  
  
}
