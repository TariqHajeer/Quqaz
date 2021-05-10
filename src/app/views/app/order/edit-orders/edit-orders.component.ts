import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
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
    private router: Router,) { }

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
  int() {
    this.Order = new CreateOrdersFromEmployee()
    this.submitted = false;
    this.GetMoenyPlaced()
    this.GetorderPlace()
    this.GetRegion()
    this.Getcities()
    this.GetClient()
    this.getAgent()
    this.getOrderTypes()
  }
  getorder() {
    var editorder = JSON.parse(localStorage.getItem('editorder')) 
    this.Order.Id=editorder.id
    this.Order.Address = editorder.address
    this.Order.AgentId=editorder.agent.id
    this.Order.ClientId=editorder.client.id
    this.Order.Code = editorder.code
    this.tempOrdercode= editorder.code
    this.Order.Amount=editorder.cost
    this.Order.CountryId=editorder.country.id
    this.Order.Date = editorder.date
    this.Order.DiliveryDate=editorder.diliveryDate
    this.Order.Cost=editorder.deliveryCost
    this.Order.MoenyPlacedId=editorder.monePlaced.id
    this.Order.Note = editorder.note
    this.Order.OrderTypeDtos=editorder.orderItems
    this.Order.OrderplacedId=editorder.orderplaced.id
    this.Order.RecipientName=editorder.recipientName
    this.Order.RecipientPhones=JSON.parse("["+editorder.recipientPhones+"]")
    //this.Order.RecipientPhones.push(editorder.recipientPhones)
    this.Order.RegionId=editorder.region!=null?editorder.region.Id:null


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
    this.Order.DeliveryCost=Number(this.Order.DeliveryCost)
    this.Order.RecipientPhones= [this.Order.RecipientPhones+""]
    this.orderservice.Update(this.Order).subscribe(res => {
      this.notifications.create('success', 'تم تعديل  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.int()
      localStorage.removeItem('editorder')
      this.router.navigate(['/app/order/'])

    });

  }
  GetorderPlace() {
    this.orderservice.orderPlace().subscribe(res => {
      this.orderPlace = res
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
    })
  }
  GetRegion() {
    this.customerService.getAll(this.regionapi).subscribe(res => {
      this.Regions = res
    })
  }
  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agents = res
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
  disabledselect=false
  changeCountry() {
    this.Region = []
    this.Order.RegionId = null
    var city = this.cities.find(c => c.id == this.Order.CountryId)
    this.Order.DeliveryCost = city.deliveryCost
    this.Region = this.Regions.filter(r => r.country.id == this.Order.CountryId)
    this.Agents = this.Agents.filter(r => r.countryId== this.Order.CountryId)
    if(this.Agents.length==1)
    this.Order.AgentId = this.Agents[0].id
    else
    this.Order.AgentId =null
    if(this.Region.length==1)
    this.Order.RegionId = this.Region[0].id
    else
    this.Order.RegionId =null
    this.Order.OrderplacedId = this.orderPlace[1].id
    this.Order.MoenyPlacedId = this.MoenyPlaced[0].id
    this.disabledselect=true
  }
  changeAgentOrClient(){
    this.Order.OrderplacedId = this.orderPlace[1].id
    this.Order.MoenyPlacedId = this.MoenyPlaced[0].id
    this.disabledselect=true
  }
  showMessageCode: boolean = false
  CheckCode() {
    if (this.Order.ClientId != null && this.Order.ClientId != undefined&&this.Order.Code!=this.tempOrdercode) {
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
}
