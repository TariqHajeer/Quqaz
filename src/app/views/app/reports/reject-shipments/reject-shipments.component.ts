import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';
import {
  GetOrder,
  OrderPlacedStateService,
} from 'src/app/services/order-placed-state.service';
import { User } from 'src/app/Models/user/user.model';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { Paging } from 'src/app/Models/paging';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { OrderState } from 'src/app/Models/order/order.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderplacedEnum } from 'src/app/Models/Enums/OrderplacedEnum';
import { MoneyPalcedEnum } from 'src/app/Models/Enums/MoneyPalcedEnum';
@Component({
  selector: 'reject-shipments',
  templateUrl: './reject-shipments.component.html',
  styleUrls: ['./reject-shipments.component.scss'],
})
export class RejectShipmentsComponent implements OnInit {
  displayedColumns: string[] = [
    'index',
    'code',
    'client',
    'country',
    'cost',
    'isClientDiliverdMoney',
    'orderplaced',
    'monePlaced',
    'deliveryCost',
    'agentCost',
    'note',
    'edit',
  ];
  dataSource = new MatTableDataSource([]);
  selection = new SelectionModel<any>(true, []);
  Code;
  ids: any[] = [];
  orders: any[] = [];
  getorders: GetOrder[] = [];
  getorder: GetOrder = new GetOrder();
  statu;
  MoenyPlacedId;
  MoenyPlaced: any[] = [];
  getMoenyPlaced: any[] = [];
  OrderplacedId;
  constructor(
    private orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    public orderplacedstate: OrderPlacedStateService,
    private spinner: NgxSpinnerService
  ) {}
  AgentId;

  orderPlace: NameAndIdDto[] = [];
  orderPleacedFilters: NameAndIdDto[] = [];
  Agents: User[] = [];
  paging: Paging;
  filtering: OrderFilter;
  noDataFound: boolean = false;
  canEditCount: boolean[] = [];
  temporderscost: any[] = [];
  tempagentCost: any[] = [];
  tempdeliveryCost: any[] = [];
  tempordersmonePlaced: GetOrder[] = [];
  tempisClientDiliverdMoney: any[] = [];
  orderstates: OrderState[] = [];
  orderstate: OrderState = new OrderState();
  @Input() totalCount: number;

  ngOnInit(): void {
    this.getAgent();
    this.GetMoenyPlaced();
    this.GetorderPlace();
    this.paging = new Paging();
    this.filtering = new OrderFilter();
    this.dataSource = new MatTableDataSource([]);
    this.getorder = new GetOrder();
    this.getorder.order.index = 0;
  }

  GetMoenyPlaced() {
    this.orderservice.MoenyPlaced().subscribe((res) => {
      this.MoenyPlaced = res;
      this.getMoenyPlaced = [...res];
    });
  }
  getmony() {
    this.orderservice.MoenyPlaced().subscribe((res) => {
      this.MoenyPlaced = res;
    });
  }
  changeMoenyPlaced() {
    if (this.getorders.length != 0) {
      this.getorders.forEach((o) => {
        var find = o.MoenyPlaced.find((m) => m.id == this.MoenyPlacedId.id);
        if (!find) o.order.monePlaced = o.MoenyPlaced[0];
        else o.order.monePlaced = find;
        //تم تسليمها/داخل الشركة
        if (
          this.OrderplacedId.id == OrderplacedEnum.Delivered &&
          this.MoenyPlacedId.id == MoneyPalcedEnum.Delivered
        ) {
          if (o.order.isClientDiliverdMoney) {
            o.order.monePlaced = this.MoenyPlaced.find(
              (m) => m.id == MoneyPalcedEnum.Delivered
            );
          } else {
            o.order.monePlaced = this.MoenyPlaced.find(
              (m) => m.id == MoneyPalcedEnum.InsideCompany
            );
          }
        }

        if (
          o.order.orderplaced.id == OrderplacedEnum.PartialReturned &&
          o.order.isClientDiliverdMoney
        ) {
          o.order.monePlaced = o.MoenyPlaced[0];
        }
      });
    }
  }
  GetorderPlace() {
    this.orderservice.orderPlace().subscribe((res) => {
      this.orderPlace = res;
      this.orderPlace = this.orderPleacedFilters = this.orderPlace.filter(
        (o) =>
          o.id == OrderplacedEnum.CompletelyReturned ||
          o.id == OrderplacedEnum.Unacceptable ||
          o.id == OrderplacedEnum.Delayed
      );
    });
  }
  changeOrderPlaced() {
    if (this.getorders.length != 0) {
      this.getorders.forEach((o) => {
        o.order.orderplaced = { ...this.OrderplacedId };
        this.ChangeAllOrderplacedId(o, this.getorders.indexOf(o));
      });
      this.MoenyPlacedId = null;
      this.getMoenyPlaced = this.orderplacedstate.ChangeOrderPlace(
        this.OrderplacedId.id,
        this.MoenyPlaced
      );
    }
  }
  getAgent() {
    this.userService.ActiveAgent().subscribe((res) => {
      this.Agents = res;
    });
  }
  showcount = false;
  findorder;
  Ordersfilter: any[] = [];
  addOrder() {
    this.Ordersfilter = [];
    this.showTable = false;
    if (this.Code) {
      this.orderservice.GetOrderToReciveFromAgent(this.Code).subscribe(
        (res) => {
          this.findorder = res.data;
          if (this.findorder) {
            if (this.findorder.length == 1) {
              this.addOrders();
            } else if (this.findorder.length > 1) {
              this.Ordersfilter = res.data as [];
              if (this.dataSource.data.length > 0)
                this.Ordersfilter = this.Ordersfilter.filter(
                  (orderf) =>
                    !this.dataSource.data.some(
                      (order) =>
                        order.order.code === orderf.code &&
                        order.order.client.id == orderf.client.id
                    )
                );
              if (this.Ordersfilter.length == 0)
                this.notifications.create(
                  'error',
                  'الشحنة مضافة مسبقا',
                  NotificationType.Error,
                  { theClass: 'error', timeOut: 6000, showProgressBar: false }
                );
              if (this.Ordersfilter.length > 1) this.showTable = true;
              if (this.Ordersfilter.length == 1) {
                this.addOrders();
              }
            }
          } else {
            this.notifications.create(
              'error',
              'ليس هناك شحنة لهذا الكود',
              NotificationType.Error,
              { theClass: 'error', timeOut: 6000, showProgressBar: false }
            );
          }
        },
        (err) => {
          this.notifications.create(
            'error',
            err.error.message,
            NotificationType.Error,
            { theClass: 'error', timeOut: 6000, showProgressBar: false }
          );
        }
      );
    } else
      this.notifications.create(
        'error',
        ' يجب اضافة كود الشحنة  ',
        NotificationType.Error,
        { theClass: 'error', timeOut: 6000, showProgressBar: false }
      );
  }
  addOrders() {
    this.getorder.order = { ...this.findorder[0] };
    this.getorder.MoenyPlaced = [...this.MoenyPlaced];
    this.getorder.OrderPlaced = [...this.orderPlace];
    this.getorder.canEditCount = true;
    this.disabledOrderPlaec(this.getorder.order.orderplaced);
    this.orderplacedstate.canChangeCost(this.getorder, this.MoenyPlaced);
    this.orderplacedstate.sentDeliveredHanded(this.getorder, this.MoenyPlaced);
    this.orderplacedstate.onWay(this.getorder, this.MoenyPlaced);
    this.orderplacedstate.unacceptable(this.getorder, this.MoenyPlaced);
    this.orderplacedstate.isClientDiliverdMoney(
      this.getorder,
      this.MoenyPlaced
    );
    this.orderplacedstate.EditDeliveryCostAndAgentCost(
      this.getorder,
      this.getorder.order.deliveryCost,
      this.getorder.order.agentCost
    );

    if (
      this.getorder.order.orderplaced.id == 1 ||
      this.getorder.order.orderplaced.id == 2
    ) {
      this.getorder.order.orderplaced = this.getorder.OrderPlaced.find(
        (o) => o.id == 3
      );
    }
    if (
      this.getorders.filter(
        (o) =>
          o.order.code == this.getorder.order.code &&
          o.order.client.id == this.getorder.order.client.id
      ).length > 0
    ) {
      this.notifications.create(
        'error',
        'الشحنة مضافة مسبقا',
        NotificationType.Error,
        { theClass: 'error', timeOut: 6000, showProgressBar: false }
      );
      return;
    }
    this.getorder.order.Cost = this.getorder.order.Cost * 1;
    this.getorder.order.index = this.getorders.length + 1;
    this.getorders.unshift({ ...this.getorder });
    this.sumCost();
    this.showcount = true;
    this.dataSource = new MatTableDataSource(this.getorders);
    this.totalCount = this.dataSource.data.length;
    this.temporderscost = Object.assign(
      {},
      this.getorders.map((o) => o.order.cost)
    );
    this.tempdeliveryCost = Object.assign(
      {},
      this.getorders.map((o) => o.order.deliveryCost)
    );
    this.tempagentCost = Object.assign(
      {},
      this.getorders.map((o) => o.order.agentCost)
    );
    this.tempordersmonePlaced = Object.assign(
      {},
      this.getorders.map((o) => o.order.monePlaced)
    );
    this.tempisClientDiliverdMoney = Object.assign(
      {},
      this.getorders.map((o) => o.order.isClientDiliverdMoney)
    );
    this.Code = '';
    this.getorder = new GetOrder();
  }
  disabledOrderPlaec(orderplaced) {
    if (!this.getorder.OrderPlaced.find((o) => o.id == orderplaced.id))
      this.getorder.OrderPlaced.push({ ...orderplaced });
  }
  showTable: boolean = false;
  add(order) {
    this.findorder = this.Ordersfilter.filter((o) => o == order);
    this.addOrders();
    this.Ordersfilter = this.Ordersfilter.filter((o) => o != order);
    if (this.Ordersfilter.length == 0) {
      this.showTable = false;
      this.Code = '';
    }
  }
  cancel(order) {
    this.Ordersfilter = this.Ordersfilter.filter((o) => o != order);
    if (this.Ordersfilter.length == 0) {
      this.showTable = false;
      this.Code = '';
    }
  }
  ChangeAllOrderplacedId(element, index) {
    try {
      this.getmony();
      this.orderplacedstate.canChangeCost(
        element,
        this.MoenyPlaced,
        this.temporderscost[index]
      );
      this.orderplacedstate.sentDeliveredHanded(element, this.MoenyPlaced);
      this.orderplacedstate.onWay(element, this.MoenyPlaced);
      this.orderplacedstate.unacceptable(element, this.MoenyPlaced);
      this.orderplacedstate.isClientDiliverdMoney(element, this.MoenyPlaced);
      this.orderplacedstate.EditDeliveryCostAndAgentCost(
        element,
        this.tempdeliveryCost[index],
        this.tempagentCost[index]
      );
      this.sumCost();
    } catch {
      this.notifications.create(
        'error',
        'يوجد خطأ في 237',
        NotificationType.Error,
        { theClass: 'error', timeOut: 6000, showProgressBar: false }
      );
    }
  }
  ChangeOrderplacedId(element, index) {
    this.OrderplacedId = null;
    this.MoenyPlacedId = null;
    this.getMoenyPlaced = [];
    this.getmony();
    this.orderplacedstate.canChangeCost(
      element,
      this.MoenyPlaced,
      this.temporderscost[index]
    );
    this.orderplacedstate.sentDeliveredHanded(element, this.MoenyPlaced);
    this.orderplacedstate.onWay(element, this.MoenyPlaced);
    this.orderplacedstate.unacceptable(element, this.MoenyPlaced);
    this.orderplacedstate.isClientDiliverdMoney(element, this.MoenyPlaced);
    this.orderplacedstate.EditDeliveryCostAndAgentCost(
      element,
      this.tempdeliveryCost[index],
      this.tempagentCost[index]
    );
    this.sumCost();
  }

  changeCost(element, index) {
    this.orderplacedstate.canChangeCost(
      element,
      this.MoenyPlaced,
      this.temporderscost[index]
    );
  }
  changeDeliveryCost(element, index) {
    this.orderplacedstate.changeDeliveryCost(
      element,
      this.tempdeliveryCost[index],
      this.MoenyPlaced
    );
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length;
    this.paging.RowCount = event.pageSize;
    this.paging.Page = event.pageIndex + 1;
    this.allFilter();
  }
  allFilter() {
    this.orderservice.GetAll(this.filtering, this.paging).subscribe(
      (response) => {
        this.canEditCount = [];
        if (response)
          if (response.data.length == 0) this.noDataFound = true;
          else this.noDataFound = false;
        this.orders = response.data;
      },
      (err) => {}
    );
  }
  count = 0;
  agentCost;
  deliveryCostCount;
  sumCost() {
    this.count = 0;
    this.deliveryCostCount = 0;
    this.agentCost = 0;
    if (this.getorders)
      this.getorders.forEach((o) => {
        this.count += o.order.cost * 1;
        this.deliveryCostCount += o.order.deliveryCost * 1;
        this.agentCost += o.order.agentCost * 1;
      });
    return this.count;
  }

  saveEdit() {
    for (let i = 0; i < this.dataSource.data.length; i++) {
      this.orderstate.Id = this.dataSource.data[i].order.id;
      this.orderstate.Cost = this.dataSource.data[i].order.cost * 1;
      this.orderstate.DeliveryCost =
        this.dataSource.data[i].order.deliveryCost * 1;
      this.orderstate.AgentCost = this.dataSource.data[i].order.agentCost * 1;
      this.orderstate.Note = this.dataSource.data[i].order.note;
      this.orderstate.MoenyPlacedId =
        this.dataSource.data[i].order.monePlaced.id;
      this.orderstate.OrderplacedId =
        this.dataSource.data[i].order.orderplaced.id;
      this.orderstates.push(this.orderstate);
      this.orderstate = new OrderState();
    }
    this.spinner.show();
    this.orderservice.ReceiptOfTheStatusOfTheReturnedShipment(this.orderstates).subscribe(
      (res) => {
        this.allFilter();
        this.spinner.hide();
        this.orderstates = [];
        this.dataSource = new MatTableDataSource([]);
        this.getorders = [];
        this.sumCost();
        this.OrderplacedId = null;
        this.MoenyPlacedId = null;
        this.getMoenyPlaced = [];
        this.notifications.create(
          'success',
          'تم تعديل الطلبيات  بنجاح',
          NotificationType.Success,
          { theClass: 'success', timeOut: 6000, showProgressBar: false }
        );
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  tempOrders: any[] = [];
  CancelOrder(order) {
    this.getorders = this.getorders.filter((o) => o.order.id != order.order.id);
    var index = 0;
    this.tempOrders = [];
    this.getorders.forEach((o) => {
      o.order.index = index + 1;
      index++;
      this.tempOrders.push({ ...o });
    });
    this.dataSource = new MatTableDataSource(this.tempOrders);
    this.totalCount = this.dataSource.data.length;
    this.temporderscost = Object.assign(
      {},
      this.getorders.map((o) => o.order.cost)
    );
    this.tempordersmonePlaced = Object.assign(
      {},
      this.getorders.map((o) => o.order.monePlaced)
    );
    this.tempisClientDiliverdMoney = Object.assign(
      {},
      this.getorders.map((o) => o.order.isClientDiliverdMoney)
    );
    this.tempdeliveryCost = Object.assign(
      {},
      this.getorders.map((o) => o.order.deliveryCost)
    );
    this.tempagentCost = Object.assign(
      {},
      this.getorders.map((o) => o.order.agentCost)
    );
    this.sumCost();
  }
  keyPressNumbers(event, cost) {
    var charCode = event.which ? event.which : event.keyCode;

    if (charCode == 45 && cost == 0) {
      return true;
    }
    // Only Numbers 0-9
    else if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}
