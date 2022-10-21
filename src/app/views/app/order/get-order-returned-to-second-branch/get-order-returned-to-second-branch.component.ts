import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';
import { Paging } from 'src/app/Models/paging';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { OrderState } from 'src/app/Models/order/order.model';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-get-order-returned-to-second-branch',
  templateUrl: './get-order-returned-to-second-branch.component.html',
  styleUrls: ['./get-order-returned-to-second-branch.component.scss']
})
export class GetOrderReturnedToSecondBranchComponent implements OnInit {

  displayedColumns: string[] = ['index', 'code', 'client', 'country'
    , 'cost', 'isClientDiliverdMoney', 'orderplaced', 'monePlaced', 'deliveryCost', 'agentCost', 'note'];
  dataSource = new MatTableDataSource([]);
  selection = new SelectionModel<any>(true, []);
  Code
  orders: any[] = []
  constructor(
    private orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    private spinner: NgxSpinnerService,

  ) { }
  paging: Paging
  filtering: OrderFilter
  noDataFound: boolean = false
  orderstates: OrderState[] = []
  orderstate: OrderState = new OrderState()
  @Input() totalCount: number;

  ngOnInit(): void {
    this.paging = new Paging
    this.filtering = new OrderFilter
    this.dataSource = new MatTableDataSource([])
  }


  findorder
  Ordersfilter: any[] = []
  addOrder() {
    this.Ordersfilter = []
    this.showTable = false
    if (this.Code) {
      this.orderservice.GetOrderReturnedToSecondBranch(this.Code).subscribe(res => {
        this.findorder = res
        if (this.findorder) {
          if (this.findorder.length == 1) {
            this.addOrders()
            return
          }
          else if (this.findorder.length > 1) {
            this.Ordersfilter = res as []
            if (this.dataSource.data.length > 0)
              this.Ordersfilter = this.Ordersfilter.filter(orderf => !this.dataSource.data.some(order => order.order.code === orderf.code && order.order.client.id == orderf.client.id));
            if (this.Ordersfilter.length == 0)
              this.notifications.create("error", "الشحنة مضافة مسبقا", NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
            if (this.Ordersfilter.length > 1)
              this.showTable = true
            if (this.Ordersfilter.length == 1) {
              this.addOrders()
              return
            }
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
    this.orders.unshift(this.findorder[0])
    this.dataSource = new MatTableDataSource(this.orders);
    this.totalCount = this.dataSource.data.length
    this.Code = ""
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

  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.allFilter();
  }
  allFilter() {
    this.orderservice.GetAll(this.filtering, this.paging).subscribe(response => {
      if (response)
        if (response.data.length == 0)
          this.noDataFound = true
        else this.noDataFound = false
      this.orders = response.data

    },
      err => {

      });
  }


  moveOrders() {
    if (this.dataSource.data.length == 0) {
      this.notifications.create('error', 'يجب اختيار الطلبات المراد نقلها', NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      return
    }
    this.spinner.show();
    this.orderservice.SendOrdersReturnedToSecondBranch(this.orders.map(order => order.id)).subscribe(res => {
      this.allFilter()
      this.spinner.hide();
      this.dataSource = new MatTableDataSource([])
      this.orders = []
      this.notifications.create('success', 'تم نقل الطلبيات  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    }, err => {
      this.spinner.hide();
    })
  }
}
