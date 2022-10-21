import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';
import { Paging } from 'src/app/Models/paging';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { OrderPlacedStateService } from 'src/app/services/order-placed-state.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';
import { CustomService } from 'src/app/services/custom.service';
import { User } from 'src/app/Models/user/user.model';

@Component({
  selector: 'app-get-orders-returned-to-my-branch',
  templateUrl: './get-orders-returned-to-my-branch.component.html',
  styleUrls: ['./get-orders-returned-to-my-branch.component.scss']
})
export class GetOrdersReturnedToMyBranchComponent implements OnInit {

  displayedColumns: string[] = ['select', 'index', 'code'
    , 'client', 'country', 'region', 'agent', 'cost'];
  dataSource = new MatTableDataSource([]);
  orders: any[] = []
  paging: Paging
  filtering: OrderFilter
  noDataFound: boolean = false
  @Input() totalCount: number;
  selection = new SelectionModel<any>(true, []);
  countries: any[] = []
  clients: Client[] = []
  cityapi: string = 'Country';
  Agents: User[] = []
  constructor(
    private orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    public orderplacedstate: OrderPlacedStateService,
    private clientService: ClientService,
    private customerService: CustomService,
  ) { }

  ngOnInit(): void {
    this.GetClient()
    this.getCities()
    this.getAgent();
    this.paging = new Paging
    this.filtering = new OrderFilter
    this.allFilter();
  }

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
        this.orders = this.orders.filter(order => order != item)
      })
    }
    else {
      this.dataSource.data.forEach(row => {
        this.selection.select(row.id)
      });
    }
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(rowid?: any, row?): string {
    if (!rowid) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    this.checkboxId(rowid, row)
    return `${this.selection.isSelected(rowid) ? 'deselect' : 'select'} row`;
  }
  checkboxId(rowid, row?) {
    if (this.selection.isSelected(rowid)) {
      if (this.orders.filter(d => d == row).length > 0)
        return
      else {
        this.orders.push(row)
      }
    }
    if (!this.selection.isSelected(rowid)) {
      this.orders = this.orders.filter(o => o.id != rowid)
    }
  }
  GetClient() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res
    })
  }
  getCities() {
    this.customerService.getAll(this.cityapi).subscribe((res) => {
      this.countries = res;
    });
  }
  getAgent(): void {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agents = res as User[];
    });
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.allFilter();
  }
  allFilter() {
    this.orderservice.GetOrdersReturnedToMyBranch(this.filtering, this.paging).subscribe(response => {
      if (response)
        if (response.data.length <= 0)
          this.noDataFound = true
        else {
          this.noDataFound = false
        }
      this.dataSource = new MatTableDataSource(response.data)
      this.totalCount = response.total
      // this.selection.clear()
      this.dataSource.data.forEach(row => {
        if (this.orders.filter(d => d.id == row.id).length == 1) {
          this.selection.select(row.id)
          row.agent = this.orders.find(order => order.id == row.id).agent
        }
      });
    },
      err => {

      });
  }
  ReceiveOrders() {
    if (this.totalCount == 0 || this.orders.length == 0) {
      this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    
    this.orderservice.ReceiveReturnedToMyBranch(this.orders.map(order=>order.id)).subscribe(res => {
      this.notifications.success('success', 'تم قبول الطلبات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.selection.clear()
      this.orders = [];
      this.allFilter()
    })
  }
  

}
