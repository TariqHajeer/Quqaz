import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/Models/user/user.model';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { Paging } from 'src/app/Models/paging';
import { FrozenOrder } from 'src/app/Models/order/frozen-order.model';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
@Component({
  selector: 'app-agent-orders-last-time',
  templateUrl: './agent-orders-last-time.component.html',
  styleUrls: ['./agent-orders-last-time.component.scss']
})
export class AgentOrdersLastTimeComponent implements OnInit {

  displayedColumns: string[] = ['select', 'index', 'code', 'agent', 'client', 'cost', 'country', 'region'
    , 'orderplaced'];
  dataSource = new MatTableDataSource([]);
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
  orders: any[] = []
  checkboxId(row) {
    if (this.selection.isSelected(row))
      if (this.ids.filter(d => d == row.id).length > 0)
        return
      else {
        this.ids.push(row.id)
        this.orders.push(row)
        this.agent = this.orders.map(o => o.agent)[0]
      }
    if (!this.selection.isSelected(row)) {
      this.ids = this.ids.filter(i => i != row.id)
      this.orders = this.orders.filter(o => o != row)

    }
  }
  constructor(
    private orderservice: OrderService,
    public userService: UserService,
    private notifications: NotificationsService,
    public route: Router
  ) { }
  Agents: User[] = []
  paging: Paging
  filtering: FrozenOrder
  noDataFound: boolean = false
  tempOrders: any[] = [];
  @Input() totalCount: number;

  ngOnInit(): void {
    localStorage.removeItem('printordersagent')
    localStorage.removeItem('printagent')
    this.getAgent()
    this.paging = new Paging
    this.filtering = new FrozenOrder
    this.allFilter();
  }

  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agents = res
    })
  }
  cities = []
  ChangeAgentId() {
    if (this.filtering.AgentId) {
      this.cities = []
      this.filtering.CountryId = null
      var agent = this.Agents.find(a => a.id == this.filtering.AgentId)
      this.cities = agent.countries
      this.allFilter();
    }
  }
  keyPressNumbers(event, num) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 45 && num == 0) {
      return true
    }
    else
      if ((charCode < 48 || charCode > 57)) {
        event.preventDefault();
        return false;
      } else {
        return true;
      }
  }
  changeCountryId() {
    if (this.filtering.CountryId)
      this.dataSource.data = this.tempOrders.filter(d => d.country.id == this.filtering.CountryId)
    else
      this.dataSource.data = this.tempOrders;
  }
  allFilter() {
    // this.filtering.CurrentDate = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US') + " " + new Date().toLocaleTimeString();
    this.filtering.CurrentDate = moment().format();
    this.orderservice.ForzenInWay(this.filtering).subscribe(response => {
      if (response)
        if (response.length == 0)
          this.noDataFound = true
        else this.noDataFound = false
      this.tempOrders = response;
      this.dataSource = new MatTableDataSource(response)
      this.totalCount = response.length
    },
      err => {

      });
  }
  agent
  print() {
    if (this.noDataFound == true || this.orders.length == 0) {
      this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    if (this.filtering.AgentId) {
      var agent = this.Agents.find(c => c.id == this.filtering.AgentId)
      localStorage.setItem('printagent', JSON.stringify(agent))
    }
    localStorage.setItem('printordersagent', JSON.stringify(this.orders))
    this.route.navigate(['app/reports/printagentpreview'])

  }


}
