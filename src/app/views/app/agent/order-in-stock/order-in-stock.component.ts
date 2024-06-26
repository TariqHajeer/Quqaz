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
import { UserService } from 'src/app/services/user.service';
import { AgentOrderService } from 'src/app/services/agent-order.service';
import { OrderplacedEnum } from 'src/app/Models/Enums/OrderplacedEnum';

@Component({
  selector: 'app-order-in-stock',
  templateUrl: './order-in-stock.component.html',
  styleUrls: ['./order-in-stock.component.scss']
})
export class OrderInStockComponent implements OnInit {

  displayedColumns: string[] = ['indexs', 'code', 'client','cost', 'country', 'region'];
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
  private orderservice: AgentOrderService,
  public userService: UserService,
  private notifications: NotificationsService,
  public route: Router
) { }
AgentId
OrderplacedId
orderPlace: NameAndIdDto[] = []
Agents: User[] = []
paging: Paging
filtering: OrderFilter
noDataFound: boolean = false

@Input() totalCount: number;

ngOnInit(): void {
  localStorage.removeItem('printordersagent')
  localStorage.removeItem('printagent')
  this.paging = new Paging
  this.filtering = new OrderFilter
  this.allFilter()
}
getAgent() {
  this.userService.ActiveAgent().subscribe(res => {
    this.Agents = res
  })
}
cities=[]
ChangeAgentIdOrOrderplacedId() {
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
}
allFilter() {
  this.filtering.Orderplaced =OrderplacedEnum.Store;
  this.orderservice.InStock().subscribe(response => {
    this.dataSource = new MatTableDataSource(response)
    this.totalCount = response.length
  },
    err => {

    });
}
agent=this.orders.map(o=>o.agent)[0]
orderplaced=this.orders.map(o=>o.orderplaced)[0]
print() {
  if ( this.noDataFound == true || this.orders.length==0) {
    this.notifications.create('error', '   لم يتم اختيار طلبات ', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    return
  }
  localStorage.setItem('printagent',JSON.stringify(this.Agents.find(c=>c.id==this.AgentId)))

  localStorage.setItem('printordersagent',JSON.stringify(this.orders))
  this.route.navigate(['app/reports/printagentpreview'])
 
}
afterPrint() {
  this.orderservice.MakeOrderInWay(this.orders.map(o=>o.id)).subscribe(res=>{
    this.notifications.create('success', 'تم نقل الطلبيات من المخزن الى الطريق بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    this.orders=[]
    this.allFilter()
  })
} 
}
