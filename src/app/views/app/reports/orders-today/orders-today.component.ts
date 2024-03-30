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
import { Order } from 'src/app/Models/order/order.model';
import { Paging } from 'src/app/Models/paging';
import { Region } from 'src/app/Models/Regions/region.model';
import { User } from 'src/app/Models/user/user.model';
import { OrderService } from 'src/app/services/order.service';
import { Client } from '../../client/client.model';
import { IndexesTypeEnum } from 'src/app/Models/Enums/IndexesTypeEnum';
import { IndexesService } from 'src/app/services/indexes.service';

@Component({
  selector: 'app-orders-today',
  templateUrl: './orders-today.component.html',
  styleUrls: ['./orders-today.component.scss']
})
export class OrdersTodayComponent implements OnInit {

  displayedColumns: string[] = ['select', 'number', 'code', 'deliveryCost', 'cost', 'oldCost', 'recipientName',
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
  countries: City[] = []
  Regions: Region[] = []
  tempRegions: Region[] = []
  Agents: User[] = []
  cityapi = "Country"
  regionapi = "Region"
  constructor(private orderservice: OrderService,
    private router: Router,
    public spinner: NgxSpinnerService,
    private notifications: NotificationsService,
    private indexesService: IndexesService,
  ) { }

  ngOnInit(): void {
    this.paging = new Paging
    this.filtering = new OrderFilter
    this.getIndexes();
    this.allFilter()
    localStorage.removeItem('printordersagent')
    localStorage.removeItem('printagent')

  }
  selection = new SelectionModel<any>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear()
      this.dataSource.data.forEach(item => {
        this.orders = this.orders.filter(order => order.id != item.id)
      })
    }
    else {
      this.dataSource.data.forEach(row => {
        this.selection.select(row)
      });
    }
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    this.checkboxId(row)
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }
  checkboxId(row) {
    if (this.selection.isSelected(row)) {
      if (this.orders.filter(d => d.id == row.id).length > 0)
        return
      else this.orders.push(row)
    }
    if (!this.selection.isSelected(row)) {
      this.orders = this.orders.filter(o => o.id != row.id)
    }
  }

  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length;
    this.paging.RowCount = event.pageSize;
    this.paging.Page = event.pageIndex + 1;
    this.allFilter();
  }
  getIndexes() {
    this.indexesService.getIndexes([IndexesTypeEnum.Countries, IndexesTypeEnum.Clients]).subscribe(response => {
      this.countries = response.countries;
      this.clients = response.clients;
    })
  }
  allFilter() {
    this.spinner.show()
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
      });
      this.sumCost()
      this.dataSource = new MatTableDataSource(response.data)
      this.selection.clear()
      this.dataSource.data.forEach(row => {
        if (this.orders.filter(d => d.id == row.id).length == 1) {
          this.selection.select(row)
        }
      });
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


  changeCountry() {
    this.Regions = []
    this.filtering.RegionId = null
    let country = this.countries.find(c => c.id == this.filtering.CountryId)
    this.Regions = country.regions;
  }
  print() {
    if (this.noDataFound == true || this.orders.length == 0) {
      this.notifications.create('error', '   لم يتم اختيار طلبات ', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    localStorage.setItem('printordersagent', JSON.stringify(this.orders))
    this.router.navigate(['app/reports/printagentpreview'])

  }

}
