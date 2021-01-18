import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/Models/Cities/city.Model';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { CreateOrdersFromEmployee } from 'src/app/Models/order/create-orders-from-employee.model';
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
    private clientService:ClientService
    ,private customerService:CustomService,
    private userService:UserService) { }
  Order: CreateOrdersFromEmployee
  submitted = false;
  orderPlace: NameAndIdDto[] = []
  MoenyPlaced: NameAndIdDto[] = []
  clients:Client[]=[]
  cities:City[]=[]
  Region: Region[]=[]
  Agents:User[]=[]
  cityapi="Country"
  regionapi="Region"
  ngOnInit(): void {
    this.Order = new CreateOrdersFromEmployee
    this.GetMoenyPlaced()
    this.GetorderPlace()
    this.GetRegion()
    this.Getcities()
    this.GetClient()
    this.userService.GetAll()
    this.Agents=this.userService.users
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
