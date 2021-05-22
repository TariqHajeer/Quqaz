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
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService, NotificationType } from 'angular2-notifications';

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
    this.get()
    this.GetMoenyPlaced()
    this.GetorderPlace()
    this.GetRegion()
    this.Getcities()
    this.GetClient()
    this.getAgent()
    this.allFilter()

  }
  get() {
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.displayedColumns = ['code', 'deliveryCost', 'cost', 'recipientName',
      'recipientPhones', 'client', 'clientPrintNumber', 'country'
      , 'region', 'agent', 'agentPrintNumber', 'monePlaced', 'orderplaced', 'address', 'createdBy', 'date', 'diliveryDate', 'note', 'Edit', 'Delete'];
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  switchPage(event: PageEvent) {

    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1


    this.allFilter();

  }
  allFilter() {
    this.spinner.show()
    this.orderservice.GetAll(this.filtering, this.paging).subscribe(response => {
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
          element.monePlaced = this.MoenyPlaced.find(m => m.id == 4)
          element.orderplaced = this.orderPlace.find(o => o.id == 4)
        }
      });
      this.dataSource = new MatTableDataSource(response.data)
      this.totalCount = response.total
    },
      err => {
        this.spinner.hide()
      });
  }

  AddOrder() {
    this.router.navigate(['/app/order/addorder'])
  }
  delete() {
    this.orderservice.Delete(this.element.id).subscribe(res => {
      this.notifications.create('success', 'تم  حذف الطلبية بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.allFilter()
    })
  }
  element
  getElement(element) {
    this.element = element
  }
  Edit(element) {
    this.router.navigate(['/app/order/editorder'])
    localStorage.setItem('editorder', JSON.stringify(element))
  }
  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agents = res
    })
  }
  GetorderPlace() {
    this.orderservice.orderPlace().subscribe(res => {
      this.orderPlace = res
    })
  }
  completelyReturn (id){
    this.orderservice.MakeStoreOrderCompletelyReturned(id).subscribe(res=>{

    })
    this.allFilter()
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

}
