import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionEventArgs, EditSettingsModel, GridComponent, IEditCell, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';
import { Coin } from 'src/app/Models/Coins/coin.model';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment.prod';
import { OrderService } from 'src/app/services/order.service';
import { ClientService } from '../../client/client.service';

import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, delay, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { City } from 'src/app/Models/Cities/city.Model';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { CreateOrdersFromEmployee, OrderItem } from 'src/app/Models/order/create-orders-from-employee.model';
import { CreateMultipleOrder } from 'src/app/Models/order/create-multiple-order';
import { OrderType } from 'src/app/Models/OrderTypes/order-type.model';
import { Region } from 'src/app/Models/Regions/region.model';
import { User } from 'src/app/Models/user/user.model';
import { Client } from '../../client/client.model';

@Component({
  selector: 'app-create-mulitple-order',
  templateUrl: './create-mulitple-order.component.html',
  styleUrls: ['./create-mulitple-order.component.scss']
})
export class CreateMulitpleOrderComponent implements OnInit {

  constructor(private orderservice: OrderService,

    private clientService: ClientService
    , private customerService: CustomService,
    public userService: UserService,
    private notifications: NotificationsService) { }

  Order: CreateMultipleOrder
  EditOrder: CreateMultipleOrder
  submitted = false;
  Editsubmitted=false
  orderPlace: NameAndIdDto[] = []
  MoenyPlaced: NameAndIdDto[] = []
  clients: Client[] = []
  cities: City[] = []
  Region: Region[] = []
  Regions: Region[] = []
  Agents: User[] = []
  orderTypes: OrderType[] = []
  orderType: OrderType
  OrderItem: OrderItem
  EditorderType: OrderType
  EditOrderItem: OrderItem
  Editcount
  count
  filter: OrderFilter
  //tempPhone: string;
 // EdittempPhone: string
  //selectedOrder: any;
  cityapi = "Country"
  regionapi = "Region"
  ordertypeapi = "OrderType";
  Orders: any[] = []
  //CanEdit: boolean[] = []
  ngOnInit(): void {
    this.Order = new CreateMultipleOrder();
    this.EditOrder = new CreateMultipleOrder();
    this.orderType = new OrderType
    this.EditorderType = new OrderType
    this.OrderItem = new OrderItem
    this.EditOrderItem = new OrderItem
    this.submitted = false;
    // this.GetMoenyPlaced()
    this.GetorderPlace() 
    this.GetRegion()
    this.Getcities()
     this.GetClient()
     this.getAgent()
    this.getOrderTypes()
    this.int()

  }
  int() {

  }


  GetorderPlace() {
    this.orderservice.orderPlace().subscribe(res => {
      this.orderPlace = res
      this.Order.OrderplacedId = this.orderPlace[1].id

    })
  }
  // GetMoenyPlaced() {
  //   this.orderservice.MoenyPlaced().subscribe(res => {
  //     this.MoenyPlaced = res
  //     this.Order.MoenyPlacedId = this.MoenyPlaced[0].id
  //   })
  // }
  getAgent() {
    this.userService.GetAgent().subscribe(res => {
      this.Agents = res
    })
  }

  GetClient() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res
    })
  }
  Getcities() {
    this.customerService.getAll(this.cityapi).subscribe(res => {
      this.cities = res
    })
  }
  GetRegion() {
    this.customerService.getAll(this.regionapi).subscribe(res => {
      this.Regions = res
    })
  }
  AllorderTypes:any[]=[]
  getOrderTypes() {
    this.customerService.getAll(this.ordertypeapi).subscribe(
      res => {
        this.orderTypes = res;
        this.AllorderTypes=res
      }
    )
  }
  // submitordertype: boolean = false
  // AddOrderType() {
  //   if (!this.orderType || !this.count) {
  //     this.submitordertype = true
  //     return
  //   }
  //   else this.submitordertype = false
  //   if (this.orderTypes.filter(o => o.name == this.orderType.name).length < 1) {
  //     this.customerService.Create(this.ordertypeapi, this.orderType).subscribe(res => {
  //       //console.log(res)
  //     })
  //   }
  //   this.OrderItem.OrderTypeId = this.orderType.id
  //   this.OrderItem.OrderTypeName = this.orderType.name
  //   this.OrderItem.Count = this.count
  //   this.Order.OrderItem.push(this.OrderItem)
  //   this.orderTypes = this.orderTypes.filter(o => o != this.orderType)
  //   this.OrderItem = new OrderItem
  //   this.orderType = new OrderType
  //   this.count = null

  // }
  // ///// edit ordertype: add and delete ordertype 
  // EditAddOrderType() {
  //   if (!this.orderType || !this.count) {
  //     this.submitordertype = true
  //     return
  //   }
  //   else this.submitordertype = false
  //   if (this.orderTypes.filter(o => o.name == this.orderType.name).length < 1) {
  //     this.customerService.Create(this.ordertypeapi, this.orderType).subscribe(res => {
  //       //console.log(res)
  //     })
  //   }
  //   this.OrderItem.OrderTypeId = this.orderType.id
  //   this.OrderItem.OrderTypeName = this.orderType.name
  //   this.OrderItem.Count = this.count
  //   this.EditOrder.OrderItem.push(this.OrderItem)
  //   this.orderTypes = this.orderTypes.filter(o => o != this.orderType)
  //   this.OrderItem = new OrderItem
  //   this.orderType = new OrderType
  //   this.count = null

  // }
  // clickOrderItem(order) {
  //   this.EditOrder = order
  // }
  // tempEditOrderType
  // EditOrderType(OrderType: OrderItem) {
  //   OrderType.CanEdit = true
  //   this.EditorderType =this.AllorderTypes.find(o=>o.id==OrderType.OrderTypeId) 
  //   this.Editcount = OrderType.Count
  //   this.tempEditOrderType = Object.assign({}, OrderType);
  // }
  // SaveOrderType(OrderType) {
  //   this.EditOrderItem.CanEdit = false
  //   this.EditOrderItem.Count = this.Editcount
  //   this.EditOrderItem.OrderTypeName = this.EditorderType.name
  //   this.EditOrderItem.OrderTypeId = this.EditorderType.id
  //   OrderType = Object.assign(OrderType, this.EditOrderItem);
  // }
  // deleteOrderTypeOnEdit(OrderType) {
  //   this.EditOrder.OrderItem = this.EditOrder.OrderItem.filter(o => o != OrderType)

  // }
  // deleteOrderType(OrderType) {
  //   this.Order.OrderItem = this.Order.OrderItem.filter(o => o != OrderType)

  // }
  // CansleEditOrderType(OrderType) {
  //   this.tempEditOrderType.CanEdit = false
  //   OrderType = Object.assign(OrderType, this.tempEditOrderType);

  // }
  changeCountry() {
    // this.Region = []
    // this.Order.RegionId = null
    var city = this.cities.find(c => c.id == this.Order.CountryId)
    this.Order.Cost = city.deliveryCost
    // this.Region = this.Regions.filter(r => r.country.id == this.Order.CountryId)
    // this.Order.RegionId = this.Region[0].id
  }
  showMessageCode: boolean = false
  CheckCode() {
    if (this.Order.Code != null && this.Order.Code != undefined) {
      this.orderservice.chekcCode(this.Order.Code, this.Order.ClientId).subscribe(res => {
       
        if (res||this.Orders.filter(o=>o.Code==this.Order.Code).length>0) {
          this.showMessageCode = true
        } else
          this.showMessageCode = false
      })
    }
  }
  tempcode
  CheckCodeForEdit(){
    this.tempcode=this.EditOrder.Code
    if (this.Order.Code != null && this.Order.Code != undefined) {
      this.orderservice.chekcCode(this.Order.Code, this.Order.ClientId).subscribe(res => {
       
        if (res||this.Orders.filter(o=>o.Code==this.EditOrder.Code&&o.Code!=this.tempcode).length>0) {
          this.showMessageCode = true
        } else
          this.showMessageCode = false
      })
    }
  }
  // addNewPhone() {
  //   this.Order.RecipientPhones.push(this.tempPhone);
  //   this.tempPhone = '';
  // }
  // EditaddNewPhone() {
  //   this.EditOrder.RecipientPhones.push(this.EdittempPhone);
  //   this.EdittempPhone = '';
  // }

  onEnter() {
   
   

    if (!this.Order.Code||!this.Order.ClientId||
      !this.Order.CountryId||!this.Order.RecipientPhone
      ||!this.Order.AgentId ) {
      this.submitted = true
      return
    }else  this.submitted = false
    var country = this.cities.find(c => c.id == this.Order.CountryId)
    this.Order.CountryName = country.name
    // var regin = this.Regions.find(c => c.id == this.Order.RegionId)
    // this.Order.RegionName = regin.name
    var orderplace = this.orderPlace.find(c => c.id == this.Order.OrderplacedId)
    this.Order.OrderplacedName = orderplace.name
    var client = this.clients.find(c => c.id == this.Order.ClientId)
    this.Order.ClientName = client.name
    var agent = this.Agents.find(c => c.id == this.Order.AgentId)
    this.Order.AgentName = agent.name
    this.Orders.push(this.Order)
    this.submitted = false
    this.Order = new CreateMultipleOrder
   // this.tempPhone = ''
  }
  tempEdit: CreateMultipleOrder
  Edit(order: CreateMultipleOrder) {
    order.CanEdit = true
   // this.EdittempPhone=order.RecipientPhone
    this.tempEdit = Object.assign({}, order);
    this.EditOrder = order
  }
  Save(order: CreateMultipleOrder) {
    if (!this.EditOrder.Code||!this.EditOrder.ClientId||
      !this.EditOrder.CountryId||!this.EditOrder.RecipientPhone
      ||!this.EditOrder.AgentId||!this.EditOrder.OrderplacedId ) {
      this.Editsubmitted = true
      return
    }else this.Editsubmitted = false
    this.EditOrder.CanEdit = false
    var country = this.cities.find(c => c.id == this.EditOrder.CountryId)
    this.EditOrder.CountryName = country.name
    // var regin = this.Regions.find(c => c.id == this.Order.RegionId)
    // this.Order.RegionName = regin.name
    var orderplace = this.orderPlace.find(c => c.id == this.EditOrder.OrderplacedId)
    this.EditOrder.OrderplacedName = orderplace.name
    var client = this.clients.find(c => c.id == this.EditOrder.ClientId)
    this.EditOrder.ClientName = client.name
    var agent = this.Agents.find(c => c.id == this.EditOrder.AgentId)
    this.EditOrder.AgentName = agent.name
   // this.EditOrder.RecipientPhone= this.EdittempPhone
    order = Object.assign(order, this.EditOrder);

  }

  CansleEdit(order: CreateMultipleOrder) {
    this.tempEdit.CanEdit = false
    order = Object.assign(order, this.tempEdit);
  }
  delete(order) {
    this.Orders = this.Orders.filter(o => o != order)
  }

  AddOrder() {
    this.orderservice.createMultiple(this.Orders).subscribe(res => {
      this.notifications.create('success', 'تم اضافة الطلبات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.Orders = []
    })

  }
}
