import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/Models/user/user.model';
import { Paging } from 'src/app/Models/paging';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { OrderPlacedStateService } from 'src/app/services/order-placed-state.service';
import { formatDate } from '@angular/common';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';
@Component({
  selector: 'app-transfer-to-second-branch',
  templateUrl: './transfer-to-second-branch.component.html',
  styleUrls: ['./transfer-to-second-branch.component.scss']
})
export class TransferToSecondBranchComponent implements OnInit {

  displayedColumns: string[] = ['select', 'index', 'code', 'country', 'region'
    , 'client', 'agent', 'agentCost', 'cost', 'deliveryCost'];
  dataSource = new MatTableDataSource([]);
  ids: any[] = []
  orders: any[] = []
  statu
  AgentId
  Agents: User[] = []
  paging: Paging
  filtering: OrderFilter
  noDataFound: boolean = false
  getorders: any[] = []
  @Input() totalCount: number;
  selection = new SelectionModel<any>(true, []);
  Agent: any;
  countriesAgent: any[] = []
  todate
  fordate
  tempdate
  temporder
  printNumber
  clients: Client[] = []
  constructor(
    private orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router,
    public orderplacedstate: OrderPlacedStateService,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.getAgent()
    this.GetClient()
    this.paging = new Paging
    this.filtering = new OrderFilter
    localStorage.removeItem('printordersagent')
    localStorage.removeItem('printagent')
    this.allFilter();
  }

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

  checkboxId(row) {
    if (this.selection.isSelected(row))
      if (this.ids.filter(d => d == row.id).length > 0)
        return
      else {

        this.ids.push(row.id)
        this.orders.push(row)
        localStorage.setItem('printordersagent', JSON.stringify(this.orders))
      }
    if (!this.selection.isSelected(row)) {
      this.ids = this.ids.filter(i => i != row.id)
      this.orders = this.orders.filter(o => o != row)
    }
  }
  GetClient() {
    this.clientService.getClients().subscribe(res => {
      this.clients = res
    })
  }
  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agents = res
    })
  }
  ChangeAgentId() {
    if (this.Agent) {
      this.countriesAgent = []
      this.filtering.AgentId = this.Agent.id
      this.countriesAgent = this.Agent.countries
      this.allFilter();
    }
  }

  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.allFilter();
  }

  allFilter() {
    this.orderservice.GetInStockToTransferToSecondBranch(this.filtering, this.paging).subscribe(response => {
      this.getorders = []
      if (response)
        if (response.data.length <= 0)
          this.noDataFound = true
        else {
          this.getorders = response.data;
          this.temporder = this.getorders
          this.noDataFound = false
        }
      this.dataSource = new MatTableDataSource(this.getorders)
      this.totalCount = response.total
    },
      err => {

      });
  }

  moveOrders() {
    if (this.noDataFound == true || this.getorders.length == 0) {
      this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    this.orderservice.TransferToSecondBranch(this.orders.map(order => order.id)).subscribe(res => {
      this.notifications.success('success', 'تم نقل الطلبات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    })
  }
}
