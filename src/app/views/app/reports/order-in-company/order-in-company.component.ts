import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';
import { GetOrder, OrderPlacedStateService } from 'src/app/services/order-placed-state.service';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { Router } from '@angular/router';
import { ClientService } from '../../client/client.service';
import { Client } from '../../client/client.model';
import { OrderplacedEnum } from 'src/app/Models/Enums/OrderplacedEnum';
@Component({
  selector: 'app-order-in-company',
  templateUrl: './order-in-company.component.html',
  styleUrls: ['./order-in-company.component.scss']
})
export class OrderInCompanyComponent implements OnInit {

  displayedColumns: string[] = [ 'code', 'agent', 'oldCost', 'cost',  'clientCost', 'country', 'region'
  , 'monePlaced', 'orderplaced', 'date', 'agentPrintNumber', 'clientPrintNumber', 'note', 'isClientDiliverdMoney','edit'];
  dataSource = new MatTableDataSource([]);
  selection = new SelectionModel<any>(true, []);
  Code
  ids: any[] = []
  orders: any[] = []
  getorders: GetOrder[] = []
  getorder: GetOrder = new GetOrder()
  temporders: GetOrder[] = []
  statu
  MoenyPlacedId
  MoenyPlaced: any[] = []
  getMoenyPlaced: any[] = []
  OrderplacedId
  ClientId
  Clients: Client[] = []
  orderPlace: NameAndIdDto[] = []
  noDataFound: boolean = false
  canEditCount: boolean[] = []
  temporderscost: any[] = []
  @Input() totalCount: number;
  constructor(
    private orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    public orderplacedstate: OrderPlacedStateService,
    public clientService: ClientService,
  ) { }


  ngOnInit(): void {
    this.getClients()
    this.dataSource = new MatTableDataSource([])
    this.getorder = new GetOrder
  }
  showcount = false
  findorder
  addOrder() {
    this.showTable = false
    if (!this.ClientId) {
      this.notifications.create("error", "يجب اختيار عميل", NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      return
    }
    if (this.Code) {
      this.orderservice.OrderInCompany(this.ClientId, this.Code).subscribe(res => {
        this.findorder = res
        if (this.findorder) {
          this.addOrders()
        }
        else {
          this.notifications.create("error", "ليس هناك شحنة لهذا الكود", NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
        }
      }, err => {
        this.notifications.create("error", err.error.message, NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      }
      )


    } else this.notifications.create("error", "    يجب اضافة كود الشحنة  ", NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });

  }
  addOrders() {
    this.getorder.order = { ...this.findorder }
    if (this.getorders.filter(o => o.order.code == this.getorder.order.code && o.order.client.id == this.getorder.order.client.id).length > 0) {
      this.notifications.create("error", "الشحنة مضافة مسبقا", NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      return
    }
    if (this.getorder.order.orderplaced.id == OrderplacedEnum.PartialReturned || this.getorder.order.orderplaced.id == OrderplacedEnum.Delivered
      || this.getorder.order.orderplaced.id == OrderplacedEnum.Way)
      this.getorder.canEditCount = false
    else
      this.getorder.canEditCount = true
    this.getorders.unshift({ ...this.getorder })
    this.temporders.unshift({ ...this.getorder })
    this.sumCost()
    this.showcount = true
    this.dataSource = new MatTableDataSource(this.getorders)
    this.totalCount = this.dataSource.data.length
    this.temporderscost = Object.assign({}, this.getorders.map(o => o.order.cost));
    this.Code = ""
    this.getorder = new GetOrder
  }
  showTable: boolean = false


  changeCost(element) {
    element.order.cost = element.order.cost * 1
    this.sumCost()
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

  print() {
    localStorage.setItem('orderincompany', JSON.stringify(this.getorders))
    localStorage.setItem('temporderincompany', JSON.stringify(this.temporders))
    localStorage.setItem('clientorderincompany', JSON.stringify(this.Clients.find(c => c.id == this.ClientId)))
    this.route.navigate(['/app/reports/printorderincompany'])
  }

  CancelOrder(order) {
    this.getorders = this.getorders.filter(o => o != order);
    var index = this.dataSource.data.indexOf(order);
    this.dataSource.data.splice(index, 1);
    this.dataSource._updateChangeSubscription();
    this.sumCost()

  }
  getClients() {
    this.clientService.getClients().subscribe(res => {
      this.Clients = res
    })
  }
  changeClientId() {
    this.Code = null
    this.getorders = []
    this.dataSource = new MatTableDataSource(this.getorders)

  }

}
