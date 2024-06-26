import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import moneyPlaceds from 'src/app/data/moneyPalced';
import orderPlaceds from 'src/app/data/orderPlaced';
import { City } from 'src/app/Models/Cities/city.Model';
import { OrderplacedEnum } from 'src/app/Models/Enums/OrderplacedEnum';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { CreateOrdersFromEmployee, OrderItem } from 'src/app/Models/order/create-orders-from-employee.model';
import { Order } from 'src/app/Models/order/order.model';
import { Resend } from 'src/app/Models/order/resend.model';
import { OrderType } from 'src/app/Models/OrderTypes/order-type.model';
import { Region } from 'src/app/Models/Regions/region.model';
import { User } from 'src/app/Models/user/user.model';
import { CustomService } from 'src/app/services/custom.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';
import { IndexesTypeEnum } from 'src/app/Models/Enums/IndexesTypeEnum';
import { IndexesService } from 'src/app/services/indexes.service';
import { AuthService } from 'src/app/shared/auth.service';
import { MoneyPalcedEnum } from 'src/app/Models/Enums/MoneyPalcedEnum';
@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-orders.component.html',
  styleUrls: ['./edit-orders.component.scss']
})
export class EditOrdersComponent implements OnInit {


  constructor(private orderservice: OrderService,
    private clientService: ClientService,
    private customerService: CustomService,
    public userService: UserService,
    private notifications: NotificationsService,
    private router: Router,
    public spinner: NgxSpinnerService,
    private orderService: OrderService,
    private getroute: ActivatedRoute,
    private indexesService: IndexesService,
    private authService: AuthService
  ) { }

  Order: CreateOrdersFromEmployee
  tempOrdercode
  submitted = false;
  orderPlace: NameAndIdDto[] = []
  MoenyPlaced: NameAndIdDto[] = []
  clients: Client[] = []
  cities: City[] = []
  Region: Region[] = []
  Regions: Region[] = []
  Agents: User[] = []
  Agentsresend: User[] = []
  Regionsresend: Region[] = []
  orderTypes: OrderType[] = []
  orderType: OrderType
  OrderItem: OrderItem
  count
  filter: OrderFilter
  tempPhone: string;
  cityapi = "Country"
  regionapi = "Region"
  ordertypeapi = "OrderType";
  EditorderType: OrderType
  EditOrderItem: OrderItem
  Editcount
  ngOnInit(): void {
    this.orderType = new OrderType
    this.OrderItem = new OrderItem
    this.EditorderType = new OrderType
    this.EditOrderItem = new OrderItem
    this.submitted = false;
    this.int()
  }
  orderResend: Resend = new Resend()
  showRsendButton: boolean = false
  changeCountryResend() {
    var city = this.cities.find(c => c.id == this.orderResend.CountryId)
    this.orderResend.DeliveryCost = city.deliveryCost
    this.orderResend.RegionId = null
    this.Regionsresend = this.tempRegions.filter(r => r.country.id == this.orderResend.CountryId)
    this.Agentsresend = this.tempAgent.filter(a => a.countries.map(c => c.id).filter(co => co == this.orderResend.CountryId).length > 0)
    if (this.Agentsresend.length == 1)
      this.orderResend.AgnetId = this.Agentsresend[0].id
    else
      this.orderResend.AgnetId = null
    if (this.Regionsresend.length == 1)
      this.orderResend.RegionId = this.Regionsresend[0].id
    else
      this.orderResend.RegionId = null
  }
  Resend() {
    this.orderResend.DeliveryCost = this.orderResend.DeliveryCost * 1
    this.orderservice.ReSend(this.orderResend).subscribe(res => {
      this.notifications.create('success', 'تمت  اعادة الارسال بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.router.navigate(['/app/order'])
    })
  }
  completelyReturn() {
    this.orderservice.MakeStoreOrderCompletelyReturned(this.Order.Id).subscribe(res => {
      this.router.navigate(['/app/order'])
    })
  }
  int() {
    this.Order = new CreateOrdersFromEmployee()
    this.submitted = false;
    this.GetMoenyPlaced()
    this.GetorderPlace()
    this.getOrderTypes()
    this.displayedColumns = ['code', 'deliveryCost', 'cost', 'oldCost', 'recipientName',
      'recipientPhones', 'client', 'country', 'region'
      , 'agent', 'monePlaced', 'orderplaced', 'address'
      , 'isClientDiliverdMoney', 'isSync', 'updatedBy', 'updatedDate', 'date', 'diliveryDate', 'note', 'systemNote'];
    this.getorder()

  }
  getIndexes() {
    if (!this.hasDisabledNotEqualBranchId())
      var index = [IndexesTypeEnum.Countries, IndexesTypeEnum.Clients];
    else
      index = [IndexesTypeEnum.Countries];
    this.indexesService.getIndexes(index).subscribe(response => {
      if (!this.hasDisabledNotEqualBranchId())
        this.clients = response.clients;
      this.cities = response.countries;
      let city = this.cities.find(c => c.id == this.Order.CountryId)
      this.Regions = city.regions;
      if (city.requiredAgent) {
        this.hideAgent = false;
        this.Agents = city.agents;
        console.log(this.Agents);

      }
      else {
        this.hideAgent = true;
      }
    })
  }
  canResned
  id
  order: Order = new Order
  displayedColumns: string[];
  dataSource
  editorder
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  show = false
  getorder() {
    this.getroute.params.subscribe(par => {
      this.id = par['id'] as string
    });
    this.spinner.show()
    this.orderService.GetById(this.id).subscribe(res => {
      this.spinner.hide()
      this.order = res
      this.editorder = res
      this.show = true
      this.editorder.recipientPhones = this.editorder.recipientPhones.split(',')
      if (this.editorder.orderplaced.id == OrderplacedEnum.CompletelyReturned || this.editorder.orderplaced.id == OrderplacedEnum.Unacceptable || this.editorder.orderplaced.id == OrderplacedEnum.Delayed)
        this.showRsendButton = true
      else
        this.showRsendButton = false
      this.orderResend.Id = this.editorder.id
      this.orderResend.AgnetId = this.editorder?.agent?.id
      this.orderResend.CountryId = this.editorder.country?.id
      this.orderResend.RegionId = this.editorder.region ? this.editorder.region?.Id : null
      this.Regionsresend = this.Regions.filter(r => r.country?.id == this.orderResend.CountryId)
      this.Agentsresend = this.Agents.filter(r => r.countryId == this.orderResend.CountryId)
      this.Order.Id = this.editorder.id
      this.Order.Address = this.editorder.address
      this.Order.AgentId = this.editorder.agent?.id
      this.Order.Agent = this.editorder?.agent
      this.Order.Code = this.editorder.code
      this.tempOrdercode = this.editorder.code
      this.Order.Cost = this.editorder.cost
      this.Order.CountryId = this.editorder.country?.id;
      this.Order.Country = this.editorder.country;
      this.Order.Client = this.editorder.client;
      this.Order.ClientId = this.editorder.client?.id
      this.Order.Date = this.editorder.date
      this.Order.DiliveryDate = this.editorder.diliveryDate
      this.Order.DeliveryCost = this.editorder.deliveryCost
      this.Order.MoenyPlacedId = this.editorder.monePlaced?.id
      this.Order.Note = this.editorder.note
      this.Order.OrderTypeDtos = this.editorder.orderItems
      this.Order.OrderplacedId = this.editorder.orderplaced?.id
      this.Order.RecipientName = this.editorder.recipientName
      this.Order.RecipientPhones = this.editorder.recipientPhones
      this.Order.OldCost = this.editorder.oldCost
      this.Order.orderLogs = this.editorder.orderLogs
      this.Order.printedTimes = this.editorder.printedTimes
      this.dataSource = new MatTableDataSource(this.Order.orderLogs)
      this.Order.RegionId = this.editorder.region ? this.editorder.region?.Id : null;
      this.Order.branchId = res.branchId;
      this.Order.currentBranchId = res.currentBranchId;
      if (this.Order.currentBranchId == this.authService.getUser().branche.id
        && this.Order.MoenyPlacedId == MoneyPalcedEnum.OutSideCompany
        && this.Order.OrderplacedId == OrderplacedEnum.Store)
        this.disabledAgent = false;
      else
        this.disabledAgent = true;
      this.getIndexes();
    }, err => {
      this.spinner.hide()

    })
  }
  hasDisabledNotEqualBranchId(): boolean {    
    return !(this.Order.branchId == this.authService.getUser().branche.id);
  }
  onTrackBy(index) {
    return index;
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
  AddOrder() {
    if (!this.hideAgent) {
      if (!this.Order.AgentId)
        return;
    }
    if (
      this.showMessageCode ||
      this.Order.RecipientPhones.length == 0 ||
      !this.Order.Cost ||
      !this.Order.Code ||
      !this.Order.ClientId ||
      !this.Order.CountryId ||
      !this.Order.OrderplacedId ||
      !this.Order.MoenyPlacedId ||
      this.RecipientPhoneslengthEdit != null ||
      this.RecipientPhoneslength != null
    ) {
      this.submitted = true;
      return;
    } else this.submitted = false;
    this.submitted = true;
    if (this.tempPhone != '' && this.tempPhone != undefined) {
      this.Order.RecipientPhones.push(this.tempPhone);
      this.tempPhone = ''
    }
    if (this.Order.RecipientPhones.length == 0) {
      return;
    }

    if (isNaN(this.Order.RegionId)) {
      this.Order.RegionName = this.Order?.RegionId?.label;
      this.Order.RegionId = null;
    }
    this.Order.DeliveryCost = Number(this.Order.DeliveryCost)
    this.Order.Cost = Number(this.Order.Cost)
    this.Order.RecipientPhones = [this.Order.RecipientPhones + ""]
    this.spinner.show()
    this.orderservice.Update(this.Order).subscribe(res => {
      this.spinner.hide()
      this.notifications.create('success', 'تم تعديل  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.int()
      localStorage.removeItem('editorder')
      this.router.navigate(['/app/order/'])

    }, err => {
      this.spinner.hide()
    });

  }
  GetorderPlace() {
    this.orderPlace = [...orderPlaceds]
  }
  GetMoenyPlaced() {
    this.MoenyPlaced = [...moneyPlaceds]
  }
  GetClient() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res
    })
  }
  Getcities() {
    this.customerService.getAll(this.cityapi).subscribe(res => {
      this.cities = res
      var country = this.cities.find(c => c.id == this.Order.CountryId)
      this.orderResend.DeliveryCost = country?.deliveryCost ? country.deliveryCost : 0
      if (this.tempRegions)
        this.Regionsresend = this.tempRegions.filter(r => r.country.id == this.orderResend.CountryId)
      if (this.tempAgent)
        this.Agentsresend = this.tempAgent.filter(r => r.countryId == this.orderResend.CountryId)
      if (this.tempRegions)
        this.Regions = this.tempRegions.filter(r => r.country.id == this.Order.CountryId)
      if (this.tempAgent)
        this.Agents = this.tempAgent.filter(r => r.countryId == this.Order.CountryId)


    })
  }
  tempRegions
  GetRegion() {
    this.customerService.getAll(this.regionapi).subscribe(res => {
      this.Regionsresend = res
      this.tempRegions = res
    })
  }
  tempAgent
  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agentsresend = res
      this.tempAgent = res
      this.Agents = this.tempAgent.filter(a => a.countries.map(c => c.id).filter(co => co == this.Order.CountryId).length > 0)

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
  disabledselect = false
  hideAgent: boolean;
  disabledAgent: boolean;
  changeCountry() {
    this.Region = []
    this.Order.RegionId = null
    var city = this.cities.find(c => c.id == this.Order.CountryId)
    this.Order.DeliveryCost = city.deliveryCost
    this.Regions = city.regions;
    if (city.requiredAgent) {
      this.hideAgent = false;
      this.disabledAgent = false;
      this.Agents = city.agents;
      if (this.Agents.length == 1)
        this.Order.AgentId = this.Agents[0].id
      else
        this.Order.AgentId = null
    }
    else {
      this.hideAgent = true;
      this.Order.AgentId = null;
    }
    if (this.Region.length == 1)
      this.Order.RegionId = this.Region[0].id
    else
      this.Order.RegionId = null
    this.Order.OrderplacedId = this.orderPlace[1].id
    this.Order.MoenyPlacedId = this.MoenyPlaced[0].id
    this.disabledselect = true
  }
  changeAgentOrClient() {
    this.Order.OrderplacedId = this.orderPlace[1].id
    this.Order.MoenyPlacedId = this.MoenyPlaced[0].id
    this.disabledselect = true
  }
  showMessageCode: boolean = false
  CheckCode() {
    if (this.Order.ClientId && this.Order.Code != this.tempOrdercode) {
      this.orderservice.chekcCode(this.Order.Code, this.Order.ClientId).subscribe(res => {
        if (res) {
          this.showMessageCode = true
        } else
          this.showMessageCode = false
      })
    }
  }

  addNewPhone() {
    this.Order.RecipientPhones.push(this.tempPhone);
    this.tempPhone = '';
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
  @HostListener('window:keydown', ['$event'])
  onKeyPress($event: KeyboardEvent) {
    if ($event.keyCode == 13) {
      this.AddOrder()
      return false
    }
  }
  print() {
    this.orderService.AddPrintNumber(this.id).subscribe(res => {
      this.Order.printedTimes += 1
    })
    var divToPrint = document.getElementById('contentToConvert');
    var css = '@page { size: A5 landscape ;margin:0;color-adjust: exact;-webkit-print-color-adjust: exact;}',
      style = document.createElement('style');
    style.type = 'text/css';
    style.media = 'print';
    style.appendChild(document.createTextNode(css));
    divToPrint.appendChild(style);
    var newWin = window.open('', 'Print-Window');
    newWin?.document.open();
    newWin?.document.write('<html dir="rtl"><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"><link rel="stylesheet/less" type="text/css" href="app/reports/printpreview/agent/agent.component.less" /></head><body onload="window.print()">' + divToPrint?.innerHTML + '</body></html>');
    newWin?.document.close();
    setTimeout(function () {
      newWin?.close();
    }, 1000);
  }
}
