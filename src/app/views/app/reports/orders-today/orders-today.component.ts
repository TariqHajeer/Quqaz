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
import { CustomService } from 'src/app/services/custom.service';
import { OrderService } from 'src/app/services/order.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';
import { saveAs as importedSaveAs } from 'file-saver';

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
  ordersIds: number[] = []
  noDataFound: boolean = false
  orderPlace: NameAndIdDto[] = []
  MoenyPlaced: NameAndIdDto[] = []
  clients: Client[] = []
  cities: City[] = []
  Regions: Region[] = []
  tempRegions: Region[] = []
  Agents: User[] = []
  unSelectIds: number[] = [];
  cityapi = "Country"
  regionapi = "Region"
  constructor(private orderservice: OrderService,
    private router: Router,
    private clientService: ClientService
    , private customerService: CustomService,
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
  selectAll: boolean = true;
  isAllSelected() {
    return this.selectAll = !this.selectAll;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.ordersIds = [];
    this.unSelectIds = [];
    if (this.isAllSelected()) {
      this.selection.clear();
    }
    else {
      this.dataSource.data.forEach(row => {
        this.selection.select(row);
      });
    }
  }
  checkboxLabelAll(): string {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    this.checkboxId(row)
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }
  checkboxId(row) {
    if (this.selection.isSelected(row)) {
      if (this.selectAll) {
        this.unSelectIds = [];
        if (this.ordersIds.filter(d => d == row.id).length > 0)
          return
        else {
          this.ordersIds.push(row.id);
        }
      }
      else {
        this.ordersIds = [];
        this.unSelectIds = this.unSelectIds.filter(o => o != row.id);
      }
    }
    if (!this.selection.isSelected(row)) {
      if (!this.selectAll) {
        if (this.unSelectIds.filter(d => d == row.id).length > 0)
          return
        else {
          this.unSelectIds.push(row.id);
          this.ordersIds = [];
        }
      }
      else {
        this.ordersIds = this.ordersIds.filter(o => o != row.id);
        this.unSelectIds = [];
      }
    }
  }

  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length;
    this.paging.RowCount = event.pageSize;
    this.paging.Page = event.pageIndex + 1;
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
        if (element.orderStateId == OrderStateEnum.ShortageOfCash) {
          element.monePlaced.name = "لديك مبلغ مع العميل"
          element.orderplaced.name = "لديك مبلغ مع العميل"
        }
      });
      this.dataSource = new MatTableDataSource(response.data)
      this.dataSource.data.forEach(row => {
        if (!this.selectAll) { this.selection.select(row) }
      });
      this.totalCount = response.total
    },
      err => {
        this.spinner.hide()
      });

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
      this.tempRegions = res
    })
  }
  changeCountry() {
    this.Regions = []
    this.filtering.RegionId = null
    this.Regions = this.tempRegions.filter(r => r.country.id == this.filtering.CountryId)
    if (this.Regions.length != 0)
      this.filtering.RegionId = this.Regions[0].id
  }
  print() {
    if (this.noDataFound == true || (this.ordersIds.length == 0 && this.selectAll)) {
      this.notifications.create('error', '   لم يتم اختيار طلبات ', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    if (!this.selectAll)
      this.orderservice.PrintOrders(this.filtering, this.unSelectIds, !this.selectAll).subscribe(res => {
        // console.log(res);
        importedSaveAs(res,new Date())

      })
    else this.orderservice.PrintOrders(this.filtering, this.ordersIds, !this.selectAll).subscribe(res => {
      // console.log(res);
      importedSaveAs(res,new Date())
    })

    // localStorage.setItem('printordersagent', JSON.stringify(this.orders))
    // this.router.navigate(['app/reports/printagentpreview'])

  }

}
