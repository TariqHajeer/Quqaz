import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { Paging } from 'src/app/Models/paging';
import { User } from 'src/app/Models/user/user.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-agent-by-orders',
  templateUrl: './change-agent-by-orders.component.html',
  styleUrls: ['./change-agent-by-orders.component.scss']
})
export class ChangeAgentByOrdersComponent implements OnInit {

  displayedColumns: string[] = ['select','index', 'code', 'client','cost', 'country', 'region'
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
  this.orders=[]
  this.ids=[]
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
      this.agent=this.orders.map(o=>o.agent)[0]
      this.orderplaced=this.orders.map(o=>o.orderplaced)[0]
    
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
AgentId
newAgentId
Agents: User[] = []
paging: Paging
filtering: OrderFilter
noDataFound: boolean = false

@Input() totalCount: number;

ngOnInit(): void {
  localStorage.removeItem('printordersagent')
  localStorage.removeItem('printagent')
  this.getAgent()
  this.paging = new Paging
  this.filtering = new OrderFilter
}

getAgent() {
  this.userService.ActiveAgent().subscribe(res => {
    this.Agents = res
  })
}
cities=[]
ChangeAgentId() {
  if (this.AgentId) {
    this.filtering.AgentId=this.AgentId
    this.cities=[]
    this.filtering.CountryId=null
    var agent=this.Agents.find(a=>a.id==this.filtering.AgentId)
    this.cities=agent.countries
    this.allFilter();
  }

}
switchPage(event: PageEvent) {
  this.paging.allItemsLength = event.length
  this.paging.RowCount = event.pageSize
  this.paging.Page = event.pageIndex + 1
  //this.allFilter();
}
allFilter() {
  if(!this.filtering.AgentId||!this.filtering.CountryId)return
  this.filtering.OrderplacedId = 2
  this.orderservice.WithoutPaging(this.filtering).subscribe(response => {
    if (response)
      if (response.data.length == 0)
        this.noDataFound = true
      else this.noDataFound = false
    this.dataSource = new MatTableDataSource(response.data)
    //this.dataSource.data = this.dataSource.data.filter(d => d.agent.id == this.AgentId)
    this.totalCount = response.total
  },
    err => {

    });
}
agent=this.orders.map(o=>o.agent)[0]
orderplaced=this.orders.map(o=>o.orderplaced)[0]
moveOrders() {
  if ( this.noDataFound == true || this.orders.length==0) {
    this.notifications.create('error', '   لم يتم اختيار طلبات ', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    return
  }
  // this.orderservice.changeAgentOrders(this.orders,this.newAgentId)
  if ( this.filtering.AgentId==this.newAgentId) {
    this.notifications.create('error', '   يجب اختيار مندوب مختلف ', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    return
  }
}


}
