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
import { User } from 'src/app/Models/user/user.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { Resend } from 'src/app/Models/order/resend.model';
import { OrderStateEnum } from 'src/app/Models/Enums/OrderStateEnum';
import { IndexesTypeEnum } from 'src/app/Models/Enums/IndexesTypeEnum';
import orderPlaceds from 'src/app/data/orderPlaced';
import moneyPlaceds from 'src/app/data/moneyPalced';
import { IndexesService } from 'src/app/services/indexes.service';
import { AuthService } from 'src/app/shared/auth.service';
import { UserLogin } from 'src/app/Models/userlogin.model';
@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss'],
})
export class ViewOrdersComponent implements OnInit {
  displayedColumns: string[];
  dataSource;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() totalCount: number;
  pageEvent: PageEvent;
  paging: Paging;
  filter: OrderFilter;
  orders: Order[] = [];
  noDataFound: boolean = false;
  orderPlace: NameAndIdDto[] = [...orderPlaceds];
  MoenyPlaced: NameAndIdDto[] = [...moneyPlaceds];
  clients: Client[] = [];
  countries: City[] = [];
  country: City = new City();
  regions: Region[] = [];
  agents: User[] = [];
  cityapi = 'Country';
  regionapi = 'Region';
  users: string[] = [];
  checkOrderState: boolean;
  branches: any[] = [];
  tempRegions;
  tempAgent;
  agentsResend: User[] = [];
  regionsResend: Region[] = [];
  orderResend: Resend = new Resend();
  countryResend: City = new City();
  currentUser: UserLogin = new UserLogin();
  constructor(
    private orderservice: OrderService,
    private router: Router,
    public spinner: NgxSpinnerService,
    private notifications: NotificationsService,
    private indexesService: IndexesService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.paging = new Paging();
    this.filter = new OrderFilter();
    this.get();
  }
  get() {
    this.currentUser = this.authService.getUser();
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.displayedColumns = [
      'code',
      'deliveryCost',
      'cost',
      'oldCost',
      'recipientName',
      'recipientPhones',
      'client',
      'CurrentBranch',
      'clientPrintNumber',
      'country',
      'region',
      'agent',
      'agentPrintNumber',
      'monePlaced',
      'orderplaced',
      'address',
      'createdBy',
      'date',
      'diliveryDate',
      'note',
      'completelyReturn',
      'Edit',
      'Delete',
    ];
    this.getIndexes();
    this.getUser();
    this.getOrders();
  }
  getIndexes() {
    this.indexesService.getIndexes([IndexesTypeEnum.Countries, IndexesTypeEnum.Clients, IndexesTypeEnum.Branches]).subscribe(response => {
      this.countries = response.countries;
      this.branches = response.benaches;
      this.clients = response.clients;
    })
  }
  changeCountry() {
    this.regions = [];
    this.agents = [];
    this.filter.CountryId = this.country?.id;
    this.regions = this.country?.regions;
    this.agents = this.country?.agents;
  }


  getUser() {
    this.orderservice.GetCreatedByNames().subscribe((res) => {
      this.users = res;
    });
  }


  getOrders() {
    this.spinner.show();
    this.orderservice.GetAll(this.filter, this.paging).subscribe(
      (response) => {
        this.spinner.hide();
        if (response && response.data && response.data.length == 0) this.noDataFound = true;
        else this.noDataFound = false;
        this.dataSource = new MatTableDataSource(response.data);
        this.totalCount = response.total;
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length;
    this.paging.RowCount = event.pageSize;
    this.paging.Page = event.pageIndex + 1;
    this.getOrders();
  }
  changeOrderState() {
    if (this.checkOrderState)
      this.filter.OrderState = OrderStateEnum.ShortageOfCash
    else this.filter.OrderState = null
    this.getOrders()
  }

  AddOrder() {
    this.router.navigate(['/app/order/addorder']);
  }
  Edit(element) {
    this.router.navigate(['/app/order/editorder', element.id]);
  }
  delete() {
    this.orderservice.Delete(this.element.id).subscribe((res) => {
      this.notifications.create(
        'success',
        'تم  حذف الطلبية بنجاح',
        NotificationType.Success,
        { theClass: 'success', timeOut: 6000, showProgressBar: false }
      );
      this.getOrders();
    });
  }
  element;
  getElement(element) {
    this.element = element;
  }
  completelyReturn(id) {
    this.spinner.show();
    this.orderservice.MakeStoreOrderCompletelyReturned(id).subscribe(
      (res) => {
        this.getOrders();
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      }
    );
  }
  fillResend(order) {
    this.orderResend = new Resend();
    this.orderResend.branchId = order.branchId;
    this.orderResend.Id = order.id;
    this.orderResend.AgnetId = order.agent.id;
    this.orderResend.CountryId = order.country.id;
    this.orderResend.RegionId = order.region ? order.region.id : null;
    this.countryResend = this.countries.find(country => country.id == order.country.id);
    this.orderResend.DeliveryCost = order.oldDeliveryCost * 1;
    this.regionsResend = this.countryResend?.regions;
    this.agentsResend = this.countryResend?.agents;
    if (this.countryResend.requiredAgent)
      this.orderResend.disabledAgent = false;
    else this.orderResend.disabledAgent = true;
  }
  changeCountryResend() {
    this.orderResend.CountryId = this.countryResend.id;
    this.orderResend.RegionId = null;
    this.orderResend.AgnetId = null;
    this.regionsResend = this.countryResend.regions;
    this.agentsResend = this.countryResend.agents;
    if (this.agentsResend.length == 1)
      this.orderResend.AgnetId = this.agentsResend[0].id;
    else this.orderResend.AgnetId = null;
    if (this.regionsResend.length == 1)
      this.orderResend.RegionId = this.regionsResend[0].id;
    else this.orderResend.RegionId = null;
    if (this.countryResend.requiredAgent)
      this.orderResend.disabledAgent = false;
    else this.orderResend.disabledAgent = true;
  }
  Resend() {
    this.orderservice.ReSend(this.orderResend).subscribe((res) => {
      this.getOrders();
    });
  }
}
