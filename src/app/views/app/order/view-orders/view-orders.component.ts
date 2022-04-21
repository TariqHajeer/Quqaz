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
import { Resend } from 'src/app/Models/order/resend.model';
import { OrderStateEnum } from 'src/app/Models/Enums/OrderStateEnum';

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
    this.displayedColumns = ['code', 'deliveryCost', 'cost', 'oldCost', 'recipientName',
      'recipientPhones', 'client', 'clientPrintNumber', 'country'
      , 'region', 'agent', 'agentPrintNumber', 'monePlaced', 'orderplaced', 'address'
      , 'createdBy', 'date', 'diliveryDate', 'note', 'completelyReturn', 'Edit', 'Delete'];
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  switchPage(event: PageEvent) {
console.log("swich")
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1


    this.allFilter();

  }
  orderResend: Resend = new Resend()
  fillResend(order) {
    this.orderResend.Id = order.id
    this.orderResend.AgnetId = order.agent.id
    this.orderResend.CountryId = order.country.id
    this.orderResend.RegionId = order.region ? order.region.id : null
    this.orderResend.DeliveryCost = order.country.deliveryCost * 1
    this.Regionsresend = this.Region.filter(r => r.country.id == this.orderResend.CountryId)
    this.Agentsresend = this.tempAgent.filter(a => a.countries.map(c => c.id).filter(co => co == this.orderResend.CountryId).length > 0)

  }
  Resend() {
    this.orderResend.DeliveryCost = this.orderResend.DeliveryCost * 1
    this.orderservice.ReSend(this.orderResend).subscribe(res => {
      this.allFilter()
    })
  }
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
  allFilter() {
    this.spinner.show()
    console.log(this.paging)
    this.orderservice.GetAll(this.filtering, this.paging).subscribe(response => {
      this.spinner.hide()
      if (response.data.length == 0)
        this.noDataFound = true
      else this.noDataFound = false
      response.data.forEach(element => {
        if (element.orderStateId == OrderStateEnum.ShortageOfCash) {
          element.monePlaced.name = "لديك مبلغ مع العميل"
          element.orderplaced.name = "لديك مبلغ مع العميل"
        }
        else if (element.orderStateId == OrderStateEnum.Finished) {
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
  searchOrders() {
    this.paging = new Paging();
    this.dataSource.paginator = this.paginator;
    this.allFilter();
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
    this.router.navigate(['/app/order/editorder', element.id])
    // localStorage.setItem('editorder', JSON.stringify(element))
  }
  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agents = res
      this.Agentsresend = res
      this.tempAgent = res
      this.Agentsresend = this.tempAgent.filter(a => a.countries.map(c => c.id).filter(co => co == this.orderResend.CountryId).length > 0)


    })
  }
  tempRegions
  tempAgent

  GetorderPlace() {
    this.orderservice.orderPlace().subscribe(res => {
      this.orderPlace = res
    })
  }
  completelyReturn(id) {
    this.spinner.show()
    this.orderservice.MakeStoreOrderCompletelyReturned(id).subscribe(res => {
      this.allFilter();
      this.spinner.hide()
    }, err => {
      this.spinner.hide()
    }
    );
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
  Agentsresend: User[] = []
  Regionsresend: Region[] = []

  GetRegion() {
    this.customerService.getAll(this.regionapi).subscribe(res => {
      this.Region = res
      this.Regionsresend = res
      this.tempRegions = res
    })
  }

}
