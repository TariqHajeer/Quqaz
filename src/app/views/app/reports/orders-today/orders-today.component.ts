import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { City } from 'src/app/Models/Cities/city.Model';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { Order } from 'src/app/Models/order/order.model';
import { Resend } from 'src/app/Models/order/resend.model';
import { Paging } from 'src/app/Models/paging';
import { Region } from 'src/app/Models/Regions/region.model';
import { User } from 'src/app/Models/user/user.model';
import { CustomService } from 'src/app/services/custom.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';

@Component({
  selector: 'app-orders-today',
  templateUrl: './orders-today.component.html',
  styleUrls: ['./orders-today.component.scss']
})
export class OrdersTodayComponent implements OnInit {

  displayedColumns: string[];
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() totalCount: number;
  pageEvent: PageEvent;
  paging: Paging
  filtering: OrderFilter
  orders: Order[] = []
  noDataFound: boolean = false
  orderPlace: NameAndIdDto[] = []
  MoenyPlaced: NameAndIdDto[] = []
  clients: Client[] = []
  cities: City[] = []
  Region: Region[] = []
  Agents: User[] = []
  cityapi = "Country"
  regionapi = "Region"
  constructor(private orderservice: OrderService,
    private router: Router,
    private clientService: ClientService
    , private customerService: CustomService,
    private userService: UserService,
    public spinner: NgxSpinnerService,
    private notifications: NotificationsService,) { }

  ngOnInit(): void {
    this.paging = new Paging
    this.filtering = new OrderFilter
    // this.filtering.CreatedDate=new Date
    this.get()
    this.GetClient()
    // this.allFilter()

  }
  get() {
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.displayedColumns = ['code', 'deliveryCost', 'cost', 'oldCost', 'recipientName',
      'recipientPhones', 'client', 'clientPrintNumber', 'country'
      , 'region', 'agent', 'agentPrintNumber', 'monePlaced', 'orderplaced', 'address'
      , 'createdBy', 'date', 'diliveryDate', 'note'];
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  allFilter() {
    if(!this.filtering.ClientId||!this.filtering.CreatedDate)return
    else{
      this.spinner.show()
    this.orderservice.WithoutPaging(this.filtering).subscribe(response => {
      this.spinner.hide()
      if (response.data.length == 0)
        this.noDataFound = true
      else this.noDataFound = false
      response.data.forEach(element => {
        if (element.orderStateId == 2) {
          element.monePlaced.name = "لديك مبلغ مع العميل"
          element.orderplaced.name = "لديك مبلغ مع العميل"
        }
        else if (element.orderStateId == 3) {
        //element.monePlaced = this.MoenyPlaced.find(m => m.id == 4)
        //  element.orderplaced = this.orderPlace.find(o => o.id == 4)
        }
      });
      this.dataSource = new MatTableDataSource(response.data)
      this.totalCount = response.total
    },
      err => {
        this.spinner.hide()
      });
    }
    
  }

  
  
  GetClient() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res
    })
  }
 

  

}
