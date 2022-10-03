import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { City } from 'src/app/Models/Cities/city.Model';
import { OrderStateEnum } from 'src/app/Models/Enums/OrderStateEnum';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { Order, OrderState } from 'src/app/Models/order/order.model';
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

  displayedColumns: string[]= ['select', 'number', 'code', 'deliveryCost', 'cost', 'oldCost', 'recipientName',
  'recipientPhones', 'client', 'clientPrintNumber', 'country'
  , 'region', 'agent', 'agentPrintNumber', 'monePlaced', 'orderplaced', 'address'
  , 'createdBy', 'date', 'diliveryDate', 'note'];
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
  Regions: Region[] = []
  tempRegions: Region[] = []
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
    this.allFilter()
    this.GetClient()
    this.GetCities()
    this.GetRegion()
    localStorage.removeItem('printordersagent')
    localStorage.removeItem('printagent')

  }
  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.orders = []
    this.ids = []
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => { this.selection.select(row) });
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    this.checkboxId(row)
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  ids: any[] = []
  checkboxId(row) {
    if (this.selection.isSelected(row))
      if (this.ids.filter(d => d == row.id).length > 0)
        return
      else {
        this.ids.push(row.id)
        this.orders.push(row)
      }
    if (!this.selection.isSelected(row)) {
      this.ids = this.ids.filter(i => i != row.id)
      this.orders = this.orders.filter(o => o != row)

    }
  }
  

  allFilter() {
    this.spinner.show()
    this.orderservice.WithoutPaging(this.filtering).subscribe(response => {
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
      this.orders = response.data
      this.sumCost()
      this.dataSource = new MatTableDataSource(response.data)
      this.totalCount = response.total
    },
      err => {
        this.spinner.hide()
      });

  }
  count
  deliveryCostCount
  sumCost() {
    this.count = 0
    this.deliveryCostCount = 0
    if (this.orders)
      this.orders.forEach(o => {
        this.count += o.cost
        this.deliveryCostCount += o.deliveryCost

      })

    return this.count
  }

  GetClient() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res
    })
  }
  GetCities() {
    this.customerService.getAll(this.cityapi).subscribe(res => {
      this.cities = res
    })
  }
  GetRegion() {
    this.customerService.getAll(this.regionapi).subscribe(res => {
      this.Regions = res
      this.tempRegions=res
    })
  }
  changeCountry() {
    this.Regions = []
    this.filtering.RegionId =null
    this.Regions = this.tempRegions.filter(r => r.country.id == this.filtering.CountryId)
    if (this.Regions.length != 0)
      this.filtering.RegionId = this.Regions[0].id
  }
  print() {
    if (this.noDataFound == true || this.orders.length == 0) {
      this.notifications.create('error', '   لم يتم اختيار طلبات ', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    // localStorage.setItem('printagent',JSON.stringify(this.Agents.find(c=>c.id==this.AgentId)))
    localStorage.setItem('printordersagent', JSON.stringify(this.orders))
    this.router.navigate(['app/reports/printagentpreview'])

  }

}
