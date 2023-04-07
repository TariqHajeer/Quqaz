import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
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
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderplacedEnum } from 'src/app/Models/Enums/OrderplacedEnum';
import * as moment from 'moment';
import { UserLogin } from 'src/app/Models/userlogin.model';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-add-multipul-orders-agent-with-region',
  templateUrl: './add-multipul-orders-agent-with-region.component.html',
  styleUrls: ['./add-multipul-orders-agent-with-region.component.scss']
})
export class AddMultipulOrdersAgentWithRegionComponent implements OnInit {

  test(e) {
    e.target.blur();
  }
  constructor(private orderservice: OrderService,
    private clientService: ClientService
    , private customService: CustomService,
    public userService: UserService,
    private notifications: NotificationsService,
    public spinner: NgxSpinnerService,
    private authService: AuthService

  ) { }

  Order: CreateMultipleOrder
  EditOrder: CreateMultipleOrder
  submitted = false;
  Editsubmitted = false
  orderPlace: NameAndIdDto[] = []
  MoenyPlaced: NameAndIdDto[] = []
  clients: Client[] = []
  cities: City[] = []
  regions: Region[] = []
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
  disabledAddAgent: boolean = false;
  disabledEditAgent: boolean = false;
  userLogin: UserLogin = this.authService.getUser();
  ngOnInit(): void {
    this.Order = new CreateMultipleOrder();
    this.EditOrder = new CreateMultipleOrder();
    this.submitted = false;
    this.int()
    var order = JSON.parse(localStorage.getItem('refrshorder'))
    if (order && order.length != 0) {
      this.Orders = order
    }

  }

  int() {
    this.GetClient()
    this.getAgent()
  }
  GetClient() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res
    })
  }
  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agents = res
      var agent = JSON.parse(localStorage.getItem('agentid'))
      if (agent) {
        this.AgentId = agent
        var find = this.Agents.find(a => a.id == this.AgentId)
        this.cities = find.countries
        var country = JSON.parse(localStorage.getItem('countryid'))
        if (country) {
          this.CountryId = country
          var findcountry = this.cities.find(c => c.id == this.CountryId)
          if (findcountry) {
            this.Order.DeliveryCost = findcountry.deliveryCost
            this.getRegions()
          }
        }

      }
    })
  }
  changeAgentId() {
    localStorage.setItem('agentid', this.AgentId)
    var find = this.Agents.find(a => a.id == this.AgentId)
    this.cities = find.countries
    this.CountryId = null;
  }
  changeCountryId() {
    localStorage.setItem('countryid', this.CountryId)
    var city = this.cities.find(c => c.id == this.CountryId)
    this.Order.DeliveryCost = city.deliveryCost
    this.getRegions()
  }
  getRegions() {
    this.customService.getAll('Region').subscribe(
      res => {
        this.regions = res;
        this.regions = this.regions.filter(a => a.country.id == this.CountryId)
      }
    )
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
    this.Order.CountryId = this.CountryId
    if (!this.Order.Code || !this.Order.ClientId ||
      !this.Order.CountryId || !this.Order.RecipientPhones
      || !this.Order.AgentId || this.showMessageCode) {
      this.submitted = true
      return
    } else this.submitted = false
    if (this.checkLengthPhoneNumber(this.Order.RecipientPhones))
      return
    var country = this.cities.find(c => c.id == this.Order.CountryId)
    this.Order.CountryName = country?.name
    var region = this.regions.find(r => r.id == this.Order.RegionId)
    this.Order.RegionName = region?.name
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
    this.Agents = this.GetAgents.filter(
      (a) =>
        a.countries
          .map((c) => c.id)
          .filter((co) => co == this.EditOrder.CountryId).length > 0
    );
  }
  Save(order: CreateMultipleOrder) {
    this.EditOrder.AgentId = this.AgentId;
    this.EditOrder.CountryId = this.CountryId;
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
    var region = this.regions.find(c => c.id == this.EditOrder.RegionId)
    this.EditOrder.RegionName = region?.name
    var client = this.clients.find(c => c.id == this.EditOrder.ClientId)
    this.EditOrder.ClientName = client?.name
    var agent = this.Agents.find(c => c.id == this.EditOrder.AgentId)
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
      if (inputs[index + 1].disabled)
        inputs[index + 2].focus();
      else
        inputs[index + 1].focus();
    }
  }
}
