import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { OrderState } from 'src/app/Models/order/order.model';
import { OrderPlacedStateService, GetOrder } from 'src/app/services/order-placed-state.service';
import { UserService } from 'src/app/services/user.service';
import { AgentOrderService } from 'src/app/services/agent-order.service';
import { OrderplacedEnum } from 'src/app/Models/Enums/OrderplacedEnum';
import orderPlaceds from 'src/app/data/orderPlaced';
import { Paging } from 'src/app/Models/paging';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-orders-on-way',
  templateUrl: './orders-on-way.component.html',
  styleUrls: ['./orders-on-way.component.scss']
})
export class OrdersOnWayComponent implements OnInit {
  displayedColumns: string[] = ['select', 'index', 'code', 'client', 'country', 'region'
    , 'agentCost', 'cost', 'orderplaced', 'agentRequestStatus', 'agentPrintNumber'];
  dataSource = new MatTableDataSource([]);
  ids: any[] = []
  orders: any[] = []
  temporder: any[] = []
  OrderplacedId
  orderPlace: NameAndIdDto[] = []
  filtering: OrderFilter
  paging: Paging = new Paging();
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
    this.orderPlace = [...orderPlaceds];
    this.orderPlace = this.orderPlace.filter(o => o.id != 1 && o.id != 2)
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
    let order = this.dataSource.data.find(o => o.order.id == row)
    if (this.selection.isSelected(row))
      if (this.ids.filter(d => d == row).length > 0)
        return
      else {
        this.ids.push(row)
        this.orders.push(order.order)
        if (this.OrderplacedId) {
          order.order.orderplaced = { ...this.OrderplacedId }
        }
        order.order.canEditCount = true
      }
    if (!this.selection.isSelected(row)) {
      order.order = { ...this.temporder.find(o => o.id == row) }
      order.order.canEditCount = false
      this.ids = this.ids.filter(i => i != row)
      this.orders = this.orders.filter(o => o.id != row)
    }
  }


  allFilter() {
    this.orderservice.InWay(this.filtering, this.paging).subscribe(response => {
      this.getorders = []
      this.temporder = response
      if (this.temporder)
        if (this.temporder.length == 0)
          this.noDataFound = true
        else this.noDataFound = false
      this.temporder.forEach(element => {
        this.getorder.order = element
        this.getorder.OrderPlaced = this.orderPlace
        this.getorder.canEditCount = false
        this.getorder.order.date = this.getorder.order.date.split('T')[0]
        this.getorder.order.date = new Date(this.getorder.order.date)
        this.getorders.push(this.getorder)
        this.getorder = new GetOrder()
      });
      this.dataSource = new MatTableDataSource(this.getorders)
      this.totalCount = response.length
    },
      err => {

      });
  }
  fillter() {
    this.allFilter();
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.allFilter();
  }
  ChengeOrderplaced() {
    let array = this.dataSource.data.filter(o => o.order.canEditCount == true)
    array.forEach(o => {
      o.order.orderplaced = { ...this.OrderplacedId }
    })
  }
  saveEdit() {
    this.orderstates = []
    if (this.noDataFound == true || this.orders.length == 0) {
      this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    if (this.orders.filter(o => o.orderplaced.id == OrderplacedEnum.Way).length > 0) {
      this.notifications.create('error', 'لايمكن ان تكون الطلبات في الطريق', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    for (let i = 0; i < this.orders.length; i++) {
      this.orderstate.Id = this.orders[i].id
      this.orderstate.Cost = this.orders[i].cost * 1
      this.orderstate.AgentCost = this.orders[i].agentCost * 1
      this.orderstate.OrderplacedId = this.orders[i].orderplaced.id
      this.orderstates.push(this.orderstate)
      this.orderstate = new OrderState
    }
    this.spinner.show();
    this.orderservice.SetOrderPlaced(this.orderstates).subscribe(res => {
      this.spinner.hide()
      this.orderstates = []
      this.orders.forEach(o => {
        this.dataSource.data = this.dataSource.data.filter(d => d.order != o)
      })
      this.orders = []
      this.notifications.create('success', 'تم تعديل الطلبيات  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    }, err => {
      console.log(err)
      this.spinner.hide()
    })
  }
  totalCost: number = 0
  totalDelaveryCost: number = 0
  endTotal: number = 0
}
