import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { City } from 'src/app/Models/Cities/city.Model';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { CreateMultipleOrder } from 'src/app/Models/order/create-multiple-order';
import { OrderItem } from 'src/app/Models/order/create-orders-from-employee.model';
import { OrderType } from 'src/app/Models/OrderTypes/order-type.model';
import { Region } from 'src/app/Models/Regions/region.model';
import { User } from 'src/app/Models/user/user.model';
import { CustomService } from 'src/app/services/custom.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';

@Component({
  selector: 'app-createmultipulorderagent',
  templateUrl: './createmultipulorderagent.component.html',
  styleUrls: ['./createmultipulorderagent.component.scss']
})
export class CreatemultipulorderagentComponent implements OnInit {

  test(e) {
    e.target.blur();
  }
  constructor(private orderservice: OrderService,

    private clientService: ClientService
    , private customerService: CustomService,
    public userService: UserService,
    private notifications: NotificationsService,
    public spinner: NgxSpinnerService,
   
  ) { }

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
  AgentId
  //tempPhone: string;
  // EdittempPhone: string
  //selectedOrder: any;
  cityapi = "Country"
  regionapi = "Region"
  ordertypeapi = "OrderType";
  Orders: any[] = []
  //CanEdit: boolean[] = []
  @ViewChild('code') codeElement: ElementRef;

  ngOnInit(): void {
    this.Order = new CreateMultipleOrder();
    this.EditOrder = new CreateMultipleOrder();
    this.submitted = false;
    this.int()
    var order = JSON.parse(localStorage.getItem('refrshorder'))
    if (order && order.length != 0) {
      this.Orders = order
    }
    var agent = JSON.parse(localStorage.getItem('agentid'))
    if (agent ) {
      this.AgentId = agent
    }
  }

  int() {
    this.Getcities()
    this.GetClient()
    this.getAgent()
  }
  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agents = res     
    })
  }
  // disabldAgentId=false
  changeAgentId(){
    // if(this.Orders.length>0)
    // this.disabldAgentId=true
    // else
    // this.disabldAgentId=false
    localStorage.setItem('agentid',this.AgentId)
  var find=this.Agents.find(a=>a.id==this.AgentId)
  this.cities=find.countries
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

  changeCountry() {
    var city = this.cities.find(c => c.id == this.Order.CountryId)
    this.Order.DeliveryCost = city.deliveryCost
  }
  changeCountryEdit() {
    var city = this.cities.find(c => c.id == this.EditOrder.CountryId)
    this.EditOrder.DeliveryCost = city.deliveryCost
  }
  showMessageCode: boolean = false
  CheckCode() {
    if (!this.Order.Code || !this.Order.ClientId) return
    if (this.Order.Code != null && this.Order.Code != undefined) {
      this.orderservice.chekcCode(this.Order.Code, this.Order.ClientId).subscribe(res => {

        if (res || this.Orders.filter(o => o.Code == this.Order.Code && this.Order.ClientId == o.ClientId).length > 0) {
          this.showMessageCode = true
        } else
          this.showMessageCode = false
      })
    }
  }
  tempcode
  CheckCodeForEdit(order) {
    this.tempcode = this.EditOrder
    if (!this.EditOrder.Code || !this.EditOrder.ClientId) return
    if (this.EditOrder.Code != null) {
      this.orderservice.chekcCode(this.EditOrder.Code, this.EditOrder.ClientId).subscribe(res => {
        if (this.EditOrder.CanEdit == true)
          if (res || this.Orders.filter(o => o.Code == this.EditOrder.Code && o != this.tempcode && this.EditOrder.ClientId == o.ClientId).length > 0) {
            order.showEditMessageCode = true
          } else
            order.showEditMessageCode = false
      })
    }
  }
  RecipientPhoneslength = ""
  checkLengthPhoneNumber(phone) {
    if (phone && phone.length < 11) {
      this.RecipientPhoneslength = " لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم"
      return true
    }
    else {
      this.RecipientPhoneslength = ""
      return false
    }
  }
  RecipientPhoneslengthEdit = ""
  checkLengthPhoneNumberForEdit(phone) {
    if (phone && phone.length < 11) {
      this.RecipientPhoneslengthEdit = " لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم"
      return true
    }
    else {
      this.RecipientPhoneslengthEdit = ""
      return false
    }
  }
  
  onEnter() {
    this.Order.AgentId=this.AgentId
    if (!this.Order.Code || !this.Order.ClientId ||
      !this.Order.CountryId || !this.Order.RecipientPhones
      || !this.Order.AgentId || this.showMessageCode) {
        console.log("fff")
      this.submitted = true
      return
    } else this.submitted = false
    if (this.checkLengthPhoneNumber(this.Order.RecipientPhones))
      return
    var country = this.cities.find(c => c.id == this.Order.CountryId)
    this.Order.CountryName = country.name
    var client = this.clients.find(c => c.id == this.Order.ClientId)
    this.Order.ClientName = client.name
    var agent = this.Agents.find(c => c.id == this.Order.AgentId)
    this.Order.AgentName = agent.name
    this.Order.Cost = this.Order.Cost * 1
    this.Orders.push(this.Order)
    localStorage.setItem('refrshorder', JSON.stringify(this.Orders))
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
    this.Agents = this.GetAgents.filter(a => a.countryId == this.EditOrder.CountryId)

  }
  Save(order: CreateMultipleOrder) {
    if (!this.EditOrder.Code || !this.EditOrder.ClientId ||
      !this.EditOrder.CountryId || !this.EditOrder.RecipientPhones
      || !this.EditOrder.AgentId 
      || order.showEditMessageCode) {
      this.Editsubmitted = true
      return
    } else this.Editsubmitted = false
    if (this.checkLengthPhoneNumberForEdit(this.EditOrder.RecipientPhones))
      return
    this.EditOrder.CanEdit = false
    var country = this.cities.find(c => c.id == this.EditOrder.CountryId)
    this.EditOrder.CountryName = country.name
    var client = this.clients.find(c => c.id == this.EditOrder.ClientId)
    this.EditOrder.ClientName = client.name
    var agent = this.Agents.find(c => c.id == this.EditOrder.AgentId)
    this.EditOrder.DeliveryCost = this.EditOrder.DeliveryCost * 1
    this.EditOrder.Cost = this.EditOrder.Cost * 1
    //  this.EditOrder.AgentName = agent.name
    order = Object.assign(order, this.EditOrder);
    localStorage.setItem('refrshorder', JSON.stringify(this.Orders))


  }

  CansleEdit(order: CreateMultipleOrder) {
    this.tempEdit.CanEdit = false
    order.showEditMessageCode = false
    this.Editsubmitted = false
    order = Object.assign(order, this.tempEdit);
  }
  delete(order) {
    this.Orders = this.Orders.filter(o => o != order)
    localStorage.setItem('refrshorder', JSON.stringify(this.Orders))
  }
  submitedSave = false
  AddOrder() {
    if (this.Order.Code) {
      this.onEnter()
      if (this.submitted == true)
        return
    }
    if (this.Orders == []) {
      //this.submitedSave=true
      return
    }
    this.Orders.forEach(o => {
      o.Cost = o.Cost * 1
      o.DeliveryCost = o.DeliveryCost * 1
      o.Date=new Date

    })
    this.spinner.show()
    this.orderservice.createMultiple(this.Orders).subscribe(res => {
      this.spinner.hide()
      this.notifications.create('success', 'تم اضافة الطلبات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.Orders = []
      localStorage.setItem('refrshorder', JSON.stringify(this.Orders))

    }, err => {
      this.spinner.hide()
    })

  }
  @ViewChild('myTr') inputEl:ElementRef;
  changed(index) {
    if(index==6){this.onEnter(); return}
    const inputs = this.inputEl.nativeElement.querySelectorAll('input');
    if (inputs.length > index + 1) {
      inputs[index + 1].focus();
    }
  }
  @ViewChild('TrFor') inputEle:ElementRef;
  changedngFor(index) {
    const inputs = this.inputEle.nativeElement.querySelectorAll('input');
    if (inputs.length > index + 1) {
      inputs[index + 1].focus();
    }
  }
}
