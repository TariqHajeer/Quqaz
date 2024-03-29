import { formatDate } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, delay, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { City } from 'src/app/Models/Cities/city.Model';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { CreateOrdersFromEmployee, OrderItem } from 'src/app/Models/order/create-orders-from-employee.model';
import { Order } from 'src/app/Models/order/order.model';
import { OrderType } from 'src/app/Models/OrderTypes/order-type.model';
import { Region } from 'src/app/Models/Regions/region.model';
import { User } from 'src/app/Models/user/user.model';
import { CustomService } from 'src/app/services/custom.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';

@Component({
  selector: 'app-add-orders',
  templateUrl: './add-orders.component.html',
  styleUrls: ['./add-orders.component.scss']
})
export class AddOrdersComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private elementRef: ElementRef,
    private clientService: ClientService
    , private customerService: CustomService,
    public userService: UserService,
    private notifications: NotificationsService,
    public spinner: NgxSpinnerService) { }

  Order: CreateOrdersFromEmployee
  submitted = false;
  orderPlace: NameAndIdDto[] = []
  MoenyPlaced: NameAndIdDto[] = []
  clients: Client[] = []
  cities: City[] = []
  Region: Region[] = []
  Regions: Region[] = []
  Agents: User[] = []
  GetAgents: User[] = []
  orderTypes: OrderType[] = []
  orderType: OrderType
  OrderItem: OrderItem
  count
  filter: OrderFilter
  tempPhone: string;
  //selectedOrder: any;
  cityapi = "Country"
  regionapi = "Region"
  ordertypeapi = "OrderType";

  EditorderType: OrderType
  EditOrderItem: OrderItem
  Editcount
  ngOnInit(): void {
    this.Order = new CreateOrdersFromEmployee();
    this.orderType = new OrderType
    this.OrderItem = new OrderItem
    this.EditorderType = new OrderType
    this.EditOrderItem = new OrderItem
    this.submitted = false;

    this.int()

  }
  int() {
    this.Order = new CreateOrdersFromEmployee()
    this.submitted = false;
    this.GetMoenyPlaced()
    this.GetorderPlace()
    this.GetRegion()
    this.Getcities()
    this.GetClient()
    this.ActiveAgent()
    this.getOrderTypes()
  }
  AddOrder() {

    if (this.tempPhone != '' && this.tempPhone != undefined) {
      this.Order.RecipientPhones.push(this.tempPhone);
      this.tempPhone = ''
    }

    if (this.showMessageCode || this.Order.RecipientPhones.length == 0 ||
      !this.Order.Cost || !this.Order.Code || !this.Order.ClientId
      || !this.Order.AgentId || !this.Order.CountryId
      || !this.Order.OrderplacedId || !this.Order.MoenyPlacedId ||
      this.RecipientPhoneslengthEdit != null || this.RecipientPhoneslength != null) {
      this.submitted = true;
      return
    } else
      this.submitted = false;

    if (isNaN(this.Order.RegionId)) {
      this.Order.RegionName = this.Order.RegionId.label;
      this.Order.RegionId = null;
    }
    this.spinner.show()
    this.Order.DeliveryCost = Number(this.Order.DeliveryCost)
    this.Order.Cost = Number(this.Order.Cost)
    this.Order.Date = moment().format()
    this.orderservice.Creat(this.Order).subscribe(res => {
      this.notifications.create('success', 'تم اضافة طلب بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.int()
      this.spinner.hide()
    }, err => {
      this.spinner.hide()
    });

  }
  changeCost(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    console.log(k)
  }
  GetorderPlace() {
    this.orderservice.orderPlace().subscribe(res => {
      this.orderPlace = res
      this.Order.OrderplacedId = this.orderPlace[1].id

    })
  }
  GetMoenyPlaced() {
    this.orderservice.MoenyPlaced().subscribe(res => {
      this.MoenyPlaced = res
      this.Order.MoenyPlacedId = this.MoenyPlaced[0].id
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
  ActiveAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.GetAgents = res
    })
  }
  AllorderTypes: any[] = []
  getOrderTypes() {
    this.customerService.getAll(this.ordertypeapi).subscribe(
      res => {
        this.orderTypes = res;
        this.AllorderTypes = res
      }
    )
  }
  submitordertype: boolean = false
  AddOrderType() {
    if (!this.orderType || !this.count) {
      this.submitordertype = true
      return
    }
    else this.submitordertype = false
    if (this.orderTypes.filter(o => o.name == this.orderType.name).length < 1) {

      this.customerService.Create(this.ordertypeapi, this.orderType).subscribe(res => {
      })
    }
    this.OrderItem.OrderTypeId = this.orderType.id
    this.OrderItem.OrderTypeName = this.orderType.name
    this.OrderItem.Count = this.count
    this.Order.OrderTypeDtos.push(this.OrderItem)
    this.orderTypes = this.orderTypes.filter(o => o != this.orderType)
    this.OrderItem = new OrderItem
    this.orderType = new OrderType
    this.count = null

  }
  changeCountry() {
    this.Region = []
    this.Order.RegionId = null
    var city = this.cities.find(c => c.id == this.Order.CountryId)
    this.Order.DeliveryCost = city.deliveryCost
    this.Region = this.Regions.filter(r => r.country.id == this.Order.CountryId)
    if (this.Region.length != 0)
      this.Order.RegionId = this.Region[0].id
    this.Agents = this.GetAgents.filter(a => a.countries.map(c => c.id).filter(co => co == this.Order.CountryId).length > 0)
    if (this.Agents.length != 0)
      this.Order.AgentId = this.Agents[0].id
  }
  showMessageCode: boolean = false
  CheckCode() {
    if (this.Order.ClientId != null && this.Order.ClientId != undefined) {
      this.orderservice.chekcCode(this.Order.Code, this.Order.ClientId).subscribe(res => {
        if (res) {
          this.showMessageCode = true
        } else
          this.showMessageCode = false
      })
    }
  }
  //input inside ng for
  onTrackBy(index) {
    return index;
  }
  addNewPhone() {
    if (this.checkLengthPhoneNumber(this.tempPhone))
      return
    this.Order.RecipientPhones.push(this.tempPhone);
    this.tempPhone = '';
  }
  deletePhone(phone) {
    this.Order.RecipientPhones = this.Order.RecipientPhones.filter(p => p != phone)
  }
  RecipientPhoneslength = null
  checkLengthPhoneNumber(phone) {
    if (phone && phone.length < 11) {
      this.RecipientPhoneslength = " لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم"
      return true
    }
    else {
      this.RecipientPhoneslength = null
      return false
    }
  }
  RecipientPhoneslengthEdit = null
  checkLengthPhoneNumberForEdit(phone) {
    if (phone && phone.length < 11) {
      this.RecipientPhoneslengthEdit = " لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم"
      return true
    }
    else {
      this.RecipientPhoneslengthEdit = null
      return false
    }
  }
  tempEditOrderType
  EditOrderType(OrderType: OrderItem) {
    OrderType.CanEdit = true
    this.EditorderType = this.AllorderTypes.find(o => o.id == OrderType.OrderTypeId)
    this.Editcount = OrderType.Count
    this.tempEditOrderType = Object.assign({}, OrderType);
  }
  SaveOrderType(OrderType) {
    this.EditOrderItem.CanEdit = false
    this.EditOrderItem.Count = this.Editcount
    this.EditOrderItem.OrderTypeName = this.EditorderType.name
    this.EditOrderItem.OrderTypeId = this.EditorderType.id
    OrderType = Object.assign(OrderType, this.EditOrderItem);
  }

  deleteOrderType(OrderType) {
    this.Order.OrderTypeDtos = this.Order.OrderTypeDtos.filter(o => o != OrderType)

  }
  CansleEditOrderType(OrderType) {
    this.tempEditOrderType.CanEdit = false
    OrderType = Object.assign(OrderType, this.tempEditOrderType);

  }
  index = 0
  changeIndex(number) {
    this.index = number
  }

}
