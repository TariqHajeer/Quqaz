import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
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
@Component({
  selector: 'app-edit-orders',
  templateUrl: './edit-orders.component.html',
  styleUrls: ['./edit-orders.component.scss']
})
export class EditOrdersComponent implements OnInit {


  constructor(private orderservice: OrderService,

    private clientService: ClientService
    , private customerService: CustomService,
    public userService: UserService,
    private notifications: NotificationsService,
    private router: Router,
    public spinner: NgxSpinnerService,
    private orderService: OrderService,
    private getroute: ActivatedRoute,
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
  //selectedOrder: any;
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
    this.getorder()
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
    this.GetRegion()
    this.GetClient()
    this.getAgent()
    this.getOrderTypes()
    this.Getcities()
    this.displayedColumns = ['code', 'deliveryCost', 'cost', 'oldCost', 'recipientName',
    'recipientPhones', 'client','country','region'
    , 'agent', 'monePlaced', 'orderplaced', 'address'
    , 'isClientDiliverdMoney','isSync','updatedBy', 'updatedDate','date', 'diliveryDate', 'note','systemNote'];

  }
  canResned
  id
  order:Order=new Order
  displayedColumns: string[];
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  getorder() {
    this.getroute.params.subscribe(par => {
      this.id = par['id'] as string
    });
    this.orderService.GetById(this.id).subscribe(res => {
      console.log(res)
      this.order=res
      var editorder = res
      if (editorder.orderplaced.id == OrderplacedEnum.CompletelyReturned || editorder.orderplaced.id == OrderplacedEnum.Unacceptable || editorder.orderplaced.id == OrderplacedEnum.Delayed)
        this.showRsendButton = true
      else
        this.showRsendButton = false
      // if (editorder.canResned == null)
      //   this.showRsendButton = true
      // else {
      //   this.showRsendButton = false
      //   this.canResned = editorder.canResned
      // }
      this.orderResend.Id = editorder.id
      this.orderResend.AgnetId = editorder.agent.id
      this.orderResend.CountryId = editorder.country.id
      this.orderResend.RegionId = editorder.region != null ? editorder.region.Id : null
      this.Regionsresend = this.Regions.filter(r => r.country.id == this.orderResend.CountryId)
      this.Agentsresend = this.Agents.filter(r => r.countryId == this.orderResend.CountryId)
      this.Order.Id = editorder.id
      this.Order.Address = editorder.address
      this.Order.AgentId = editorder.agent.id
      this.Order.ClientId = editorder.client.id
      this.Order.Code = editorder.code
      this.tempOrdercode = editorder.code
      this.Order.Cost = editorder.cost
      this.Order.CountryId = editorder.country.id
      this.Order.Date = editorder.date
      this.Order.DiliveryDate = editorder.diliveryDate
      this.Order.DeliveryCost = editorder.deliveryCost
      this.Order.MoenyPlacedId = editorder.monePlaced.id
      this.Order.Note = editorder.note
      this.Order.OrderTypeDtos = editorder.orderItems
      this.Order.OrderplacedId = editorder.orderplaced.id
      this.Order.RecipientName = editorder.recipientName
      this.Order.RecipientPhones = editorder.recipientPhones.split(',')
      this.Order.OldCost = editorder.oldCost
      this.Order.orderLogs=editorder.orderLogs
      this.dataSource = new MatTableDataSource(this.Order.orderLogs)
      //this.Order.RecipientPhones.push(editorder.recipientPhones)
      this.Order.RegionId = editorder.region != null ? editorder.region.Id : null
    })
   


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

    this.submitted = true;
    if (this.tempPhone != '' && this.tempPhone != undefined) {
      this.Order.RecipientPhones.push(this.tempPhone);
      this.tempPhone = ''
    }
    if (this.Order.RecipientPhones.length == 0) {
      return;
    }

    if (isNaN(this.Order.RegionId)) {
      this.Order.RegionName = this.Order.RegionId.label;
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
    this.orderservice.orderPlace().subscribe(res => {
      this.orderPlace = res
      // console.log(res)
      //this.Order.OrderplacedId = this.orderPlace[1].id

    })
  }
  GetMoenyPlaced() {
    this.orderservice.MoenyPlaced().subscribe(res => {
      this.MoenyPlaced = res
      // this.Order.MoenyPlacedId = this.MoenyPlaced[0].id
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
      var country = this.cities.find(c => c.id == this.Order.CountryId)
      this.orderResend.DeliveryCost = country.deliveryCost
      this.Regionsresend = this.tempRegions.filter(r => r.country.id == this.orderResend.CountryId)
      this.Agentsresend = this.tempAgent.filter(r => r.countryId == this.orderResend.CountryId)
      this.Regions = this.tempRegions.filter(r => r.country.id == this.Order.CountryId)
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

      // console.log(res)
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
  changeCountry() {
    this.Region = []
    this.Order.RegionId = null
    var city = this.cities.find(c => c.id == this.Order.CountryId)
    this.Order.DeliveryCost = city.deliveryCost
    this.Regions = this.tempRegions.filter(r => r.country.id == this.Order.CountryId)
    this.Agents = this.tempAgent.filter(a => a.countries.map(c => c.id).filter(co => co == this.Order.CountryId).length > 0)
    if (this.Agents.length == 1)
      this.Order.AgentId = this.Agents[0].id
    else
      this.Order.AgentId = null
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
    var divToPrint = document.getElementById('contentToConvert');
    var css = '@page { size: A4 landscape }',
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
      // location.reload();

    }, 10);
  }
}
