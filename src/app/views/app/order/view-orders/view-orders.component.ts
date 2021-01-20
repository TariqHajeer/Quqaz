import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Paging } from 'src/app/Models/paging';
import { Order } from 'src/app/Models/order/order.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { City } from 'src/app/Models/Cities/city.Model';
import { Client } from '../../client/client.model';
import { Region } from 'src/app/Models/Regions/region.model';
import { ClientService } from '../../client/client.service';
import { CustomService } from 'src/app/services/custom.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/Models/user/user.model';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {
  displayedColumns: string[];
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() totalCount: number;
  pageEvent: PageEvent;
  paging: Paging
  filtering:OrderFilter
  orders:Order[]=[]
  noDataFound:boolean=false
  orderPlace: NameAndIdDto[] = []
  MoenyPlaced: NameAndIdDto[] = []
  clients:Client[]=[]
  cities:City[]=[]
  Region: Region[]=[]
  Agents:User[]=[]
  cityapi="Country"
  regionapi="Region"
  constructor(private orderservice:OrderService,
    private router:Router,
    private clientService:ClientService
    ,private customerService:CustomService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.paging = new Paging
    this.filtering=new OrderFilter
    this.allFilter()
    this.get()
    this.GetMoenyPlaced()
    this.GetorderPlace()
    this.GetRegion()
    this.Getcities()
    this.GetClient()
    this.userService.GetAll()
    this.Agents=this.userService.users

  }
  get() {
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.displayedColumns = ['code','deliveryCost','cost','recipientName',
    'recipientPhones','address','createdBy','date','diliveryDate','note','client','country'
    ,'region','monePlaced','orderplaced','agent'];
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  switchPage(event: PageEvent) {
   
    this.paging.allItemsLength=event.length
    this.paging.RowCount =  event.pageSize
    this.paging.Page = event.pageIndex+1
   
   
 this.allFilter();
    
   }
   allFilter(){
   this.orderservice.GetAll( this.filtering,this.paging).subscribe(response => {
    if(response.data.length==0)
    this.noDataFound=true
    else  this.noDataFound=false
    console.log(response.data)

    this.dataSource=new MatTableDataSource(response.data)
     this.totalCount = response.total    
   },
   err => {
     
   });
  }
  
  AddOrder(){
this.router.navigate(['/app/order/addorder'])
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
