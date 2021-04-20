import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { ClientService } from '../../client/client.service';
import { City } from 'src/app/Models/Cities/city.Model';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { OrderItem } from 'src/app/Models/order/create-orders-from-employee.model';
import { CreateMultipleOrder } from 'src/app/Models/order/create-multiple-order';
import { OrderType } from 'src/app/Models/OrderTypes/order-type.model';
import { Region } from 'src/app/Models/Regions/region.model';
import { User } from 'src/app/Models/user/user.model';
import { Client } from '../../client/client.model';

@Component({
  selector: 'app-createmultiple-order-from-client',
  templateUrl: './createmultiple-order-from-client.component.html',
  styleUrls: ['./createmultiple-order-from-client.component.scss']
})
export class CreatemultipleOrderFromClientComponent implements OnInit {

  constructor(private orderservice: OrderService,

    private clientService: ClientService
    , private customerService: CustomService,
    public userService: UserService,
    private notifications: NotificationsService) {

  }

  Order: CreateMultipleOrder
  EditOrder: CreateMultipleOrder
  submitted = false;
  Editsubmitted = false
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
  EditorderType: OrderType
  EditOrderItem: OrderItem
  Editcount
  count
  filter: OrderFilter
  CountryId
  ClientId
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
    this.submitted = false;
    this.int()

  }
  int() {
    this.GetorderPlace()
    this.Getcities()
    this.GetClient()
    this.getAgent()
  }

  addNewCountry() {
    var find=this.cities.find(c => c.name == this.Order.Country.name)
    console.log(find)
    if (!find) {
      this.customerService.Create(this.cityapi, this.Order.Country).subscribe(res => {
        this.Order.Country = res
        this.Getcities()

      })
    }

  }
  editNewCountry() {
    if (!this.cities.find(c => c.name == this.EditOrder.Country.name)) {
      this.customerService.Create(this.cityapi, this.EditOrder.Country).subscribe(res => {
        this.EditOrder.Country = res
        this.Getcities()
      })
    }

  }
  GetorderPlace() {
    this.orderservice.orderPlace().subscribe(res => {
      this.orderPlace = res
      this.Order.OrderplacedId = this.orderPlace[1].id

    })
  }

  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.GetAgents = res
      this.Agents = this.GetAgents.filter(a => a.countryId == this.Order.CountryId)
      // if (this.Agents.length != 0)
      //   this.Order.AgentId = this.Agents[0].id
      // else this.Order.AgentId = null

    })
  }

  GetClient() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res
      // this.Order.ClientId = res[0].id
    })
  }
  Getcities() {
    this.customerService.getAll(this.cityapi).subscribe(res => {
      this.cities = res
      // if (this.cities.length != 0)
      //   this.Order.CountryId = this.cities[0].id
      this.Order.Country = this.cities.find(c => c.id == this.Order.CountryId)
      this.changeCountry()
    })
  }

  changeCountry() {

    var city = this.cities.find(c => c == this.Order.Country)
    this.Agents = this.Agents.filter(a => a.countryId == this.Order.Country.id)
    // if (this.Agents.length != 0)
    //   this.Order.AgentId = this.Agents[0].id
    // else this.Order.AgentId = null
    this.Order.DeliveryCost = city.deliveryCost

  }
  changeCountryEdit() {
    var city = this.cities.find(c => c.id == this.EditOrder.Country)
    this.Agents = this.Agents.filter(a => a.countryId == this.EditOrder.Country.id)
    if (this.Agents.length != 0)
      this.EditOrder.AgentId = this.Agents[0].id
    else this.EditOrder.AgentId = null
    this.EditOrder.DeliveryCost = city.deliveryCost
  }
  showMessageCode: boolean = false
  changeClientId() {
    this.Orders.map(o => o.Code).forEach(element => {
      this.orderservice.chekcCode(element, this.ClientId).subscribe(res => {
        if (res) {
          this.showMessageCode = true
        } else
          this.showMessageCode = false
      })
    });



  }
  CheckCode() {
    if (!this.Order.Code || !this.ClientId) return
    if (this.Order.Code != null && this.Order.Code != undefined) {
      this.orderservice.chekcCode(this.Order.Code, this.ClientId).subscribe(res => {
        if (res || this.Orders.filter(o => o.Code == this.Order.Code && this.ClientId == o.ClientId).length > 0) {
          this.showMessageCode = true
        } else
          this.showMessageCode = false
      })
    }
  }
  tempcode
  CheckCodeForEdit() {
    this.tempcode = this.EditOrder
    if (!this.EditOrder.Code || !this.ClientId) return
    if (this.EditOrder.Code != null) {
      this.orderservice.chekcCode(this.EditOrder.Code, this.ClientId).subscribe(res => {
        if (this.EditOrder.CanEdit == true)
          if (res || this.Orders.filter(o => o.Code == this.EditOrder.Code && o != this.tempcode).length > 0) {

            this.showMessageCode = true
          } else
            this.showMessageCode = false
      })
    }
  }
  RecipientPhoneslength = ""
  @ViewChild('code') codeElement: ElementRef;
  checkLengthPhoneNumber(phone) {
    if (phone&&phone.length < 11) {
      this.RecipientPhoneslength = " لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم"
      return true
    } else {
      this.RecipientPhoneslength = ""
      return false
    }
  }
  RecipientPhoneslengthEdit = ""
  checkLengthPhoneNumberEdit(phone) {
    if (phone&&phone.length < 11) {
      this.RecipientPhoneslengthEdit = " لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم"
      return true
    } else {
      this.RecipientPhoneslengthEdit = ""
      return false
    }
  }
  onEnter() {
    this.addNewCountry()
    this.Order.CountryId = this.Order.Country.id
    this.Order.ClientId=this.ClientId
console.log(this.Order)
    if (this.checkLengthPhoneNumber(this.Order.RecipientPhones))
      return
    if (!this.Order.Code || !this.Order.ClientId ||
      !this.Order.RecipientPhones
      || !this.Order.AgentId || this.showMessageCode) {
      this.submitted = true
      return
    } else this.submitted = false

    // var country = this.cities.find(c => c.id == this.Order.CountryId)
    this.Order.CountryName = this.Order.Country.name
    var orderplace = this.orderPlace.find(c => c.id == this.Order.OrderplacedId)
    this.Order.OrderplacedName = orderplace.name
    var client = this.clients.find(c => c.id == this.Order.ClientId)
    this.Order.ClientName = client.name
    var agent = this.Agents.find(c => c.id == this.Order.AgentId)
    this.Order.AgentName = agent.name
    this.Orders.push(this.Order)
    this.submitted = false
    this.Order = new CreateMultipleOrder
    setTimeout(() => {
      this.codeElement.nativeElement.focus();
    }, 0);
    this.int()
  }
  tempEdit: CreateMultipleOrder
  Edit(order: CreateMultipleOrder) {
    this.EditOrder = new CreateMultipleOrder
    this.Orders.forEach(o => {
      if (o != order)
        o.CanEdit = false

    })
    order.CanEdit = true
    this.tempEdit = Object.assign({}, order);
    this.EditOrder = order
  }
  Save(order: CreateMultipleOrder) {

    this.editNewCountry()
    if (!this.EditOrder.Code || !this.EditOrder.ClientId ||
      !this.EditOrder.RecipientPhones
      || !this.EditOrder.AgentId || !this.EditOrder.OrderplacedId
      || order.showEditMessageCode) {
      this.Editsubmitted = true
      return
    } else this.Editsubmitted = false
    if (this.checkLengthPhoneNumberEdit(this.EditOrder.RecipientPhones))
    return
    this.EditOrder.CanEdit = false
    this.EditOrder.CountryId = this.EditOrder.Country.id
    this.EditOrder.CountryName = this.EditOrder.Country.name
    var orderplace = this.orderPlace.find(c => c.id == this.EditOrder.OrderplacedId)
    this.EditOrder.OrderplacedName = orderplace.name
    var client = this.clients.find(c => c.id == this.EditOrder.ClientId)
    this.EditOrder.ClientName = client.name
    var agent = this.Agents.find(c => c.id == this.EditOrder.AgentId)
    this.EditOrder.AgentName = agent.name
    order = Object.assign(order, this.EditOrder);

  }

  CansleEdit(order: CreateMultipleOrder) {
    this.tempEdit.CanEdit = false
    order.showEditMessageCode = false
    this.Editsubmitted = false
    order = Object.assign(order, this.tempEdit);
  }
  delete(order) {
    this.Orders = this.Orders.filter(o => o != order)
  }
  submitedSave = false
  AddOrder() {
    if (this.Order.Code) {
      this.onEnter()
      if (this.submitted == true)
        return
    }

    if (!this.ClientId || this.Orders == []) {
      this.submitedSave = true
      return
    }
    // this.Orders.forEach(o => {

    //   o.ClientId = this.ClientId
    // })
    this.orderservice.createMultiple(this.Orders).subscribe(res => {
      this.notifications.create('success', 'تم اضافة الطلبات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.Orders = []
    })

  }

}
