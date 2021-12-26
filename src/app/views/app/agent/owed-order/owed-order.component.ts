import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { AgentOrderService } from 'src/app/services/agent-order.service';
import { UserService } from 'src/app/services/user.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-owed-order',
  templateUrl: './owed-order.component.html',
  styleUrls: ['./owed-order.component.scss']
})
export class OwedOrderComponent implements OnInit {

 
  displayedColumns: string[] = ['select','indexs', 'code', 'client','cost', 'country', 'region'];
dataSource = new MatTableDataSource([]);

constructor(
  private orderservice: AgentOrderService,
  public userService: UserService,
  private notifications: NotificationsService,
  public route: Router
) { }

noDataFound: boolean = false

@Input() totalCount: number;
selection = new SelectionModel<any>(true, []);
orders:any[]=[]
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.orders=[]
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
      if (this.orders.filter(d => d == row).length > 0)
        return
      else {
        this.orders.push(row)
      }
    if (!this.selection.isSelected(row)) {
      this.orders = this.orders.filter(o => o != row)
    }
  }
ngOnInit(): void {
  localStorage.removeItem('printordersagent')
  this.allFilter()
}


allFilter() {
  this.orderservice.OwedOrder().subscribe(response => {
    if (response)
      if (response.length == 0)
        this.noDataFound = true
      else this.noDataFound = false
    this.dataSource = new MatTableDataSource(response)
    this.totalCount = response.length
  },
    err => {

    });
}
print() {
  if (this.noDataFound == true || this.orders.length == 0) {
    this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    return
  }
  localStorage.setItem('printordersagent', JSON.stringify(this.orders))
  this.route.navigate(['app/agent/agentprint'])
}
}
