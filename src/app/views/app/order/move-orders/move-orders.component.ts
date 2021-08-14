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
import { CustomService } from 'src/app/services/custom.service';

@Component({
  selector: 'app-move-orders',
  templateUrl: './move-orders.component.html',
  styleUrls: ['./move-orders.component.scss']
})
export class MoveOrdersComponent implements OnInit {
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
  public route: Router,
  private customerService: CustomService,
) { }
AgentId
CountryId
Agents: User[] = []
cities=[]
cityapi = "Country"
Getcities() {
  this.customerService.getAll(this.cityapi).subscribe(res => {
    this.cities = res
  })
}
paging: Paging
// filtering: OrderFilter
noDataFound: boolean = false

@Input() totalCount: number;

ngOnInit(): void {
  this.getAgent()
  this.Getcities()
  // //this.GetorderPlace()
  this.paging = new Paging
  // this.filtering = new OrderFilter
}

// GetorderPlace() {
//   this.orderservice.orderPlace().subscribe(res => {
//     this.orderPlace = res
//     this.orderPlace = this.orderPlace.filter(o => o.id == 3 || o.id == 2)

//   })
// }
getAgent() {
  this.userService.ActiveAgent().subscribe(res => {
    this.Agents = res
  })
}

switchPage(event: PageEvent) {
  this.paging.allItemsLength = event.length
  this.paging.RowCount = event.pageSize
  this.paging.Page = event.pageIndex + 1
  //this.allFilter();
}
get() {
  this.orderservice.TrakingOrder(this.AgentId,this.CountryId).subscribe(response => {
console.log(response)
    if (response)
      if (response.length == 0)
        this.noDataFound = true
      else this.noDataFound = false
    this.dataSource = new MatTableDataSource(response)
    //this.dataSource.data = this.dataSource.data.filter(d => d.agent.id == this.AgentId)
    this.totalCount = response.length
  },
    err => {

    });
}
move() {
  if ( this.noDataFound == true || this.orders.length==0) {
    this.notifications.create('error', '   لم يتم اختيار طلبات ', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    return
  }
 
}
    

}
