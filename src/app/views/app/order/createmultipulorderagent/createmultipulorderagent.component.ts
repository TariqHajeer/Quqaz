import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { City } from 'src/app/Models/Cities/city.Model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { CreateMultipleOrder } from 'src/app/Models/order/create-multiple-order';
import { OrderItem } from 'src/app/Models/order/create-orders-from-employee.model';
import { OrderType } from 'src/app/Models/OrderTypes/order-type.model';
import { Region } from 'src/app/Models/Regions/region.model';
import { User } from 'src/app/Models/user/user.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import IIndex from 'src/app/shared/interfaces/IIndex';
import { Client } from '../../client/client.model';
import { IndexesTypeEnum } from 'src/app/Models/Enums/IndexesTypeEnum';
import { IndexesService } from 'src/app/services/indexes.service';

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
    public userService: UserService,
    private notifications: NotificationsService,
    public spinner: NgxSpinnerService,
    private indexesService: IndexesService,
  ) { }

  Order: CreateMultipleOrder
  EditOrder: CreateMultipleOrder
  submitted = false;
  Editsubmitted = false
  orderPlace: IIndex[] = []
  MoenyPlaced: IIndex[] = []
  clients: Client[] = []
  cities: City[] = []
  allCountires: City[] = [];
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
  cityapi = "Country"
  regionapi = "Region"
  ordertypeapi = "OrderType";
  Orders: any[] = []
  @ViewChild('code') codeElement: ElementRef;
  ngOnInit(): void {
    this.Order = new CreateMultipleOrder();
    this.EditOrder = new CreateMultipleOrder();
    this.submitted = false;
    this.getIndexes()
    var order = JSON.parse(localStorage.getItem('refrshorder'))
    if (order && order.length != 0) {
      this.Orders = order
    }

  }

  getIndexes() {
    this.indexesService.getIndexes([IndexesTypeEnum.Countries, IndexesTypeEnum.Clients]).subscribe(response => {
      this.allCountires = response.countries;
      console.log(this.allCountires);
      this.Agents = this.indexesService.getAllAgents(this.allCountires);
      this.clients = response.clients;
    })
  }
  changeAgentId() {

    this.cities = this.indexesService.getCountriesByAgentId(this.allCountires, this.AgentId);
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
    this.Order.AgentId = this.AgentId
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
    this.Order.CountryName = country?.name
    var client = this.clients.find(c => c.id == this.Order.ClientId)
    this.Order.ClientName = client?.name
    var agent = this.Agents.find(c => c.id == this.Order.AgentId)
    this.Order.AgentName = agent?.name
    this.Order.Cost = this.Order.Cost * 1
    this.Orders.push(this.Order)
    localStorage.setItem('refrshorder', JSON.stringify(this.Orders))
    this.submitted = false
    this.Order = new CreateMultipleOrder
    setTimeout(() => {
      this.codeElement.nativeElement.focus();
    }, 0);
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
    this.Agents = this.GetAgents.filter(
      (a) =>
        a.countries
          .map((c) => c.id)
          .filter((co) => co == this.EditOrder.CountryId).length > 0
    );

  }
  Save(order: CreateMultipleOrder) {
    if (!this.EditOrder.Code || !this.EditOrder.ClientId ||
      !this.EditOrder.CountryId || !this.EditOrder.RecipientPhones
      || order.showEditMessageCode) {
      this.Editsubmitted = true
      return
    } else this.Editsubmitted = false
    if (this.checkLengthPhoneNumberForEdit(this.EditOrder.RecipientPhones))
      return
    this.EditOrder.CanEdit = false
    var country = this.cities.find(c => c.id == this.EditOrder.CountryId)
    this.EditOrder.CountryName = country?.name
    var client = this.clients.find(c => c.id == this.EditOrder.ClientId)
    this.EditOrder.ClientName = client?.name
    this.EditOrder.DeliveryCost = this.EditOrder.DeliveryCost * 1
    this.EditOrder.Cost = this.EditOrder.Cost * 1
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
    if (this.Orders.length == 0) {
      //this.submitedSave=true
      return
    }
    this.Orders.forEach(o => {
      o.Cost = o.Cost * 1
      o.DeliveryCost = o.DeliveryCost * 1
      o.Date = moment().format()

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
  @ViewChild('myTr') inputEl: ElementRef;
  changed(index) {
    if (index == 6) { this.onEnter(); return }
    const inputs = this.inputEl.nativeElement.querySelectorAll('input');
    if (inputs.length > index + 1) {
      inputs[index + 1].focus();
    }
  }
  @ViewChild('TrFor') inputEle: ElementRef;
  changedngFor(index) {
    const inputs = this.inputEle.nativeElement.querySelectorAll('input');
    if (inputs.length > index + 1) {
      if (inputs[index + 1].disabled)
        inputs[index + 2].focus();
      else
        inputs[index + 1].focus();
    }
  }
}
