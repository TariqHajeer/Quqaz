import { Component, OnInit } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { City } from 'src/app/Models/Cities/city.Model';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { CreateOrdersFromEmployee, OrderItem } from 'src/app/Models/order/create-orders-from-employee.model';
import { Order } from 'src/app/Models/order/order.model';
import { OrderType } from 'src/app/Models/OrderTypes/order-type.model';
import { Paging } from 'src/app/Models/paging';

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

    private clientService: ClientService
    , private customerService: CustomService,
    public userService: UserService,
    private notifications: NotificationsService) { }

  Order: CreateOrdersFromEmployee
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
  paging: Paging
  tempPhone: string;
  cityapi = "Country"
  regionapi = "Region"
  ordertypeapi = "OrderType";
  ngOnInit(): void {
    this.Order = new CreateOrdersFromEmployee
    this.Order.OrderTypeDtos = []
    this.Order.RecipientPhones = []
    this.orderType = new OrderType
    this.OrderItem = new OrderItem
    this.paging = new Paging
    this.GetMoenyPlaced()
    this.GetorderPlace()
    this.GetRegion()
    this.Getcities()
    this.GetClient()
    this.getAgent()
    this.getOrderTypes()
  }
  AddOrder() {
    this.submitted = true;
    if (this.tempPhone != ''&&this.tempPhone!=undefined) {
      this.Order.RecipientPhones.push(this.tempPhone);
      this.tempPhone = ''
    }
    this.orderservice.Creat(this.Order).subscribe(res => {
      this.Order = new CreateOrdersFromEmployee
      this.submitted = false;
      this.notifications.create('success', 'تم اضافة عميل بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });


    })

  }
  GetorderPlace() {
    this.orderservice.orderPlace().subscribe(res => {
      this.orderPlace = res
    })
  }
  GetMoenyPlaced() {
    this.orderservice.MoenyPlaced().subscribe(res => {
      this.MoenyPlaced = res
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
    this.userService.GetAgent().subscribe(res => {
      this.Agents = res
    })
  }
  getOrderTypes() {
    this.customerService.getAll(this.ordertypeapi).subscribe(
      res => {
        this.orderTypes = res;
      }
    )
  }
  AddOrderType() {
    this.OrderItem.OrderTypeId = this.orderType.id
    this.OrderItem.name = this.orderType.name
    this.OrderItem.Count = this.count
    this.Order.OrderTypeDtos.push(this.OrderItem)
    this.orderType = new OrderType
    this.count = null


  }
  changeCountry() {
    this.Region = []
    this.Order.RegionId = null
    var city = this.cities.find(c => c.id == this.Order.CountryId)
    this.Order.Cost = city.deliveryCost
    this.Region = this.Regions.filter(r => r.country.id == this.Order.CountryId)
  }
  showMessageCode: boolean = false
  CheckCode() {
    this.orderservice.chekcCode(this.Order.Code, this.Order.ClientId).subscribe(res => {
      if (res) {
        this.showMessageCode = true
      } else
        this.showMessageCode = false
    })
  }

  addNewPhone() {
    this.Order.RecipientPhones.push(this.tempPhone);
    this.tempPhone = '';
  }
}
