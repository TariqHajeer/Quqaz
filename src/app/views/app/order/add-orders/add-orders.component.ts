import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/Models/Cities/city.Model';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
<<<<<<< HEAD
import { CreateOrdersFromEmployee, OrderItem } from 'src/app/Models/order/create-orders-from-employee.model';
import { Order } from 'src/app/Models/order/order.model';
import { OrderType } from 'src/app/Models/OrderTypes/order-type.model';
=======
import { CreateOrdersFromEmployee } from 'src/app/Models/order/create-orders-from-employee.model';
>>>>>>> f2203a99893bd9f09ff74ca075f88cf6bd16859c
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
<<<<<<< HEAD
    private clientService: ClientService
    , private customerService: CustomService,
    private userService: UserService) { }
=======
    private clientService:ClientService
    ,private customerService:CustomService,
    private userService:UserService) { }
>>>>>>> f2203a99893bd9f09ff74ca075f88cf6bd16859c
  Order: CreateOrdersFromEmployee
  submitted = false;
  orderPlace: NameAndIdDto[] = []
  MoenyPlaced: NameAndIdDto[] = []
<<<<<<< HEAD
  clients: Client[] = []
  cities: City[] = []
  Region: Region[] = []
  Agents: User[] = []
  orderTypes: OrderType[] = []
  orderType: OrderType
  OrderItem: OrderItem
  count
  cityapi = "Country"
  regionapi = "Region"
  ordertypeapi = "OrderType";
  ngOnInit(): void {
    this.Order = new CreateOrdersFromEmployee
    this.Order.OrderTypeDtos=[]
    this.orderType=new OrderType
    this.OrderItem= new OrderItem
=======
  clients:Client[]=[]
  cities:City[]=[]
  Region: Region[]=[]
  Agents:User[]=[]
  cityapi="Country"
  regionapi="Region"
  ngOnInit(): void {
    this.Order = new CreateOrdersFromEmployee
>>>>>>> f2203a99893bd9f09ff74ca075f88cf6bd16859c
    this.GetMoenyPlaced()
    this.GetorderPlace()
    this.GetRegion()
    this.Getcities()
    this.GetClient()
<<<<<<< HEAD
    this.getOrderTypes()
    this.userService.GetAll()
    this.Agents = this.userService.users
  }
  AddOrder() {
    this.orderservice.Creat(this.Order).subscribe(res=>{
      this.Order=new CreateOrdersFromEmployee
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
      this.Region = res
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
    this.OrderItem.OrderTypeName = this.orderType.name
    this.OrderItem.Count = this.count
    this.Order.OrderTypeDtos.push(this.OrderItem)

=======
    this.userService.GetAll()
    this.Agents=this.userService.users
>>>>>>> f2203a99893bd9f09ff74ca075f88cf6bd16859c
  }
  AddOrder() {

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
  GetClient(){
    this.clientService.getClients().subscribe(res=>{
      this.clients=res
    })
  }
  Getcities(){
    this.customerService.getAll(this.cityapi).subscribe(res=>{
      this.cities=res
    })
  }
  GetRegion(){
    this.customerService.getAll(this.regionapi).subscribe(res=>{
      this.Region=res
    })
  }
 
}
