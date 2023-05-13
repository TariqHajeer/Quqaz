import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';
import { OrderService } from 'src/app/services/order.service';
import { City } from 'src/app/Models/Cities/city.Model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { OrderItem } from 'src/app/Models/order/create-orders-from-employee.model';
import { CreateMultipleOrder } from 'src/app/Models/order/create-multiple-order';
import { OrderType } from 'src/app/Models/OrderTypes/order-type.model';
import { User } from 'src/app/Models/user/user.model';
import { Client } from '../../client/client.model';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { AuthService } from 'src/app/shared/auth.service';
import { IndexesTypeEnum } from 'src/app/Models/Enums/IndexesTypeEnum';
import { IndexesService } from 'src/app/services/indexes.service';

@Component({
  selector: 'app-createmultiple-order-from-client',
  templateUrl: './createmultiple-order-from-client.component.html',
  styleUrls: ['./createmultiple-order-from-client.component.scss']
})
export class CreatemultipleOrderFromClientComponent implements OnInit {

  constructor(private orderservice: OrderService,
    private authService: AuthService,
    public userService: UserService,
    private notifications: NotificationsService,
    public spinner: NgxSpinnerService,
    private indexesService: IndexesService,
  ) {

  }

  Order: CreateMultipleOrder
  EditOrder: CreateMultipleOrder
  submitted = false;
  Editsubmitted = false
  clients: Client[] = []
  countries: City[] = []
  Agents: User[] = []
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
  Orders: any[] = []
  ngOnInit(): void {
    this.Order = new CreateMultipleOrder();
    this.EditOrder = new CreateMultipleOrder();
    this.submitted = false;
    this.getIndexes()
    var clientid = JSON.parse(localStorage.getItem('ClientId'))
    if (clientid) {
      this.ClientId = clientid
    }
    var order = JSON.parse(localStorage.getItem('refrshorderclient'))
    if (order && order.length != 0) {
      this.Orders = order
      this.changeClientId()
    }

  }
  getIndexes() {
    this.indexesService.getIndexes([IndexesTypeEnum.Countries, IndexesTypeEnum.Clients]).subscribe(response => {
      this.countries = response.countries;
      this.clients = response.clients;
    })
  }

  changeCountry() {
    var city = this.countries.find(c => c.id == this.Order.CountryId)
    if (city.requiredAgent) {
      this.disabledAddAgent = false;
      this.Agents = city.agents;
      if (this.Agents.length != 0 && this.Agents.length == 1)
        this.Order.AgentId = this.Agents[0].id
      else this.Order.AgentId = null
    } else {
      this.disabledAddAgent = true;
      this.Order.AgentId = null;
    }
    this.Order.DeliveryCost = city.deliveryCost

  }
  changeCountryEdit() {
    var city = this.countries.find(c => c.id == this.EditOrder.CountryId)
    if (city.requiredAgent) {
      this.disabledEditAgent = false;
      this.Agents = city.agents;
      if (this.Agents.length != 0 && this.Agents.length == 1)
        this.EditOrder.AgentId = this.Agents[0].id
      else this.EditOrder.AgentId = null
    }
    else {
      this.disabledEditAgent = true;
      this.EditOrder.AgentId = null;
    }
    this.EditOrder.DeliveryCost = city.deliveryCost
  }
  //#region changeClientId
  tempOrder: any[] = []
  changeClientId() {
    localStorage.setItem('ClientId', this.ClientId)
    this.orderservice.CheckMulieCode(this.Orders.map(o => o.Code), this.ClientId).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        this.Orders[i].ClientId = this.ClientId
        if (this.Orders.find(o => o.Code == res[i].code && res[i].avilabe == false)) {
          this.Orders[i].beforCode = this.Orders[i].Code
          this.tempOrder.push({ ...this.Orders[i] })
        }
      }
      if (this.tempOrder.length != 0)
        document.getElementById("openModalButton").click();

    })

  }
  showMessageCodeChange = false
  CheckCodeForChange(code) {
    if (!code || !this.ClientId) return
    this.orderservice.chekcCode(code, this.ClientId).subscribe(res => {
      if (res || this.Orders.filter(o => o.Code == code && this.ClientId == o.ClientId).length > 0) {
        this.showMessageCodeChange = true
        return
      } else
        this.showMessageCodeChange = false
    })
    localStorage.setItem('ClientId', this.ClientId)
  }
  changeCodeAfterChecked(order) {
    this.orderservice.chekcCode(order.Code, this.ClientId).subscribe(res => {
      if (res) {
        this.showMessageCodeChange = true
        return
      }
      else if (!this.showMessageCodeChange) {
        this.showMessageCodeChange = false
        var find = this.Orders.find(o => o.Code == order.beforCode)
        find.Code = order.Code
        this.tempOrder = this.tempOrder.filter(o => o != order)
        if (this.tempOrder.length == 0)
          document.getElementById("closeModalButton").click();
        localStorage.setItem('refrshorderclient', JSON.stringify(this.Orders))
      }
      else return
    })


  }
  deleteCodeAfterChecked(order) {
    var find = this.Orders.find(o => o.Code == order.beforCode)
    this.Orders = this.Orders.filter(o => o != find)
    this.tempOrder = this.tempOrder.filter(o => o != order)
    if (this.tempOrder.length == 0)
      document.getElementById("closeModalButton").click();
    localStorage.setItem('refrshorderclient', JSON.stringify(this.Orders))
  }
  //#endregion

  showMessageCode: boolean = false

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
    localStorage.setItem('ClientId', this.ClientId)
  }
  tempcode
  showEditMessageCode = false
  CheckCodeForEdit() {
    this.tempcode = this.EditOrder
    if (!this.EditOrder.Code || !this.ClientId) return
    if (this.EditOrder.Code != null) {
      this.orderservice.chekcCode(this.EditOrder.Code, this.ClientId).subscribe(res => {
        if (this.EditOrder.CanEdit == true)
          if (res || this.Orders.filter(o => o.Code == this.EditOrder.Code && o != this.tempcode).length > 0) {

            this.showEditMessageCode = true
          } else
            this.showEditMessageCode = false
      })
    }
  }
  RecipientPhoneslength = ""
  @ViewChild('code') codeElement: ElementRef;
  disabledAddAgent: boolean = false;
  disabledEditAgent: boolean = false;
  userLogin: UserLogin = this.authService.getUser(); checkLengthPhoneNumber(phone) {
    if (phone && phone.length < 11) {
      this.RecipientPhoneslength = " لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم"
      return true
    } else {
      this.RecipientPhoneslength = ""
      return false
    }
  }
  RecipientPhoneslengthEdit = ""
  checkLengthPhoneNumberEdit(phone) {
    if (phone && phone.length < 11) {
      this.RecipientPhoneslengthEdit = " لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم"
      return true
    } else {
      this.RecipientPhoneslengthEdit = ""
      return false
    }
  }
  onEnter() {
    this.Order.Country = this.countries.find(c => c.id == this.Order.CountryId)
    this.Order.ClientId = this.ClientId
    if (this.checkLengthPhoneNumber(this.Order.RecipientPhones))
      return
    if (!this.Order.Code || !this.Order.ClientId ||
      !this.Order.RecipientPhones || this.showMessageCode) {
      this.submitted = true
      return
    } else this.submitted = false
    this.Order.CountryName = this.Order.Country?.name
    var client = this.clients.find(c => c.id == this.Order.ClientId)
    this.Order.ClientName = client?.name
    var agent = this.Agents.find(c => c.id == this.Order.AgentId)
    this.Order.AgentName = agent?.name
    this.Order.Cost = this.Order.Cost * 1
    this.Orders.push(this.Order)
    localStorage.setItem('refrshorderclient', JSON.stringify(this.Orders))
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
    this.EditOrder = order;
    var city = this.countries.find(c => c.id == this.EditOrder.CountryId)
    if (city.requiredAgent)
      this.disabledEditAgent = false;
    else
      this.disabledEditAgent = true;
    this.Agents = city.agents;
  }
  Save(order: CreateMultipleOrder) {
    if (!this.EditOrder.Code || !this.EditOrder.ClientId ||
      !this.EditOrder.RecipientPhones
      || order.showEditMessageCode) {
      this.Editsubmitted = true
      return
    } else this.Editsubmitted = false
    if (this.checkLengthPhoneNumberEdit(this.EditOrder.RecipientPhones))
      return
    this.EditOrder.CanEdit = false
    this.EditOrder.CountryId = this.EditOrder.Country.id
    this.EditOrder.CountryName = this.EditOrder.Country.name
    var client = this.clients.find(c => c.id == this.EditOrder?.ClientId)
    this.EditOrder.ClientName = client?.name
    this.EditOrder.DeliveryCost = this.EditOrder.DeliveryCost * 1
    this.EditOrder.Cost = this.EditOrder.Cost * 1
    var agent = this.Agents.find(c => c.id == this.EditOrder?.AgentId)
    this.EditOrder.AgentName = agent?.name
    order = Object.assign(order, this.EditOrder);
    localStorage.setItem('refrshorderclient', JSON.stringify(this.Orders))


  }

  CansleEdit(order: CreateMultipleOrder) {
    this.tempEdit.CanEdit = false
    order.showEditMessageCode = false
    this.Editsubmitted = false
    order = Object.assign(order, this.tempEdit);
  }
  delete(order) {
    this.Orders = this.Orders.filter(o => o != order)
    localStorage.setItem('refrshorderclient', JSON.stringify(this.Orders))

  }
  submitedSave = false
  AddOrder() {
    if (this.Order.Code) {
      this.onEnter()
      if (this.submitted == true)
        return
    }

    if (!this.ClientId || this.Orders.length == 0) {
      this.submitedSave = true
      return
    }
    this.Orders.forEach(o => {
      o.Cost = o.Cost * 1
      o.DeliveryCost = o.DeliveryCost * 1
      o.Date = moment().format()

    })
    this.spinner.show()
    console.log(this.Orders)
    this.orderservice.createMultiple(this.Orders).subscribe(res => {
      this.spinner.hide()
      this.notifications.create('success', 'تم اضافة الطلبات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.Orders = []
      this.ClientId = null
      localStorage.setItem('ClientId', this.ClientId)

      localStorage.setItem('refrshorderclient', JSON.stringify(this.Orders))

    }, err => {
      this.spinner.hide()
    })

  }
  @ViewChild('myTr') inputEl: ElementRef;
  changed(index) {
    if (index == 6) { this.onEnter(); return }
    const inputs = this.inputEl.nativeElement.querySelectorAll('input');
    if (inputs.length > index + 1) {
      if (inputs[index + 1].disabled)
        inputs[index + 2].focus();
      else
        inputs[index + 1].focus();
    }
  }
}
