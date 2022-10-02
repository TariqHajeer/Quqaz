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

@Component({
  selector: 'app-get-orders-come-to-my-branch',
  templateUrl: './get-orders-come-to-my-branch.component.html',
  styleUrls: ['./get-orders-come-to-my-branch.component.scss']
})
export class GetOrdersComeToMyBranchComponent implements OnInit {
  displayedColumns: string[] = ['select', 'index', 'code', 'country'
  , 'client', 'cost', 'deliveryCost'];
dataSource = new MatTableDataSource([]);
orders: any[] = []
statu
paging: Paging
filtering: OrderFilter
noDataFound: boolean = false
getorders: any[] = []
@Input() totalCount: number;
selection = new SelectionModel<any>(true, []);
countries: any[] = []
clients: Client[] = []
cityapi: string = 'Country';

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
switchPage(event: PageEvent) {
  this.paging.allItemsLength = event.length
  this.paging.RowCount = event.pageSize
  this.paging.Page = event.pageIndex + 1
  this.allFilter();
}
allFilter() {
  this.orderservice.GetOrdersComeToMyBranch(this.filtering, this.paging).subscribe(response => {
    this.getorders = []
    if (response)
      if (response.data.length <= 0)
        this.noDataFound = true
      else {
        this.getorders = response.data;
        this.noDataFound = false
      }
    this.dataSource = new MatTableDataSource(this.getorders)
    this.totalCount = response.total
    this.selection.clear()
    this.dataSource.data.forEach(row => {
      if (this.orders.filter(d => d.id == row.id).length == 1) {
        this.selection.select(row)
      }
    });
  },
    err => {

    });
}
ReceiveOrders() {
  if (this.noDataFound == true || this.getorders.length == 0) {
    this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    return
  }
  this.orderservice.ReceiveOrdersToMyBranch(this.orders.map(order => order.id)).subscribe(res => {
    this.notifications.success('success', 'تم نقل الطلبات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    this.selection.clear()
    this.orders=[]
    this.allFilter()
  })
}

}
