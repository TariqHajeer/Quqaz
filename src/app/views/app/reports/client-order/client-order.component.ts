import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService } from 'angular2-notifications';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/Models/user/user.model';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { Paging } from 'src/app/Models/paging';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ClientService } from '../../client/client.service';
import { Client } from '../../client/client.model';
@Component({
  selector: 'app-client-order',
  templateUrl: './client-order.component.html',
  styleUrls: ['./client-order.component.scss']
})
export class ClientOrderComponent implements OnInit {

  displayedColumns: string[] = ['select', 'code', 'cost', 'country', 'region'
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
    public clientService: ClientService,
    private notifications: NotificationsService,
    public route: Router
  ) { }
  ClientId
  OrderplacedId
  orderPlace: NameAndIdDto[] = []
  Clients: Client[] = []
  paging: Paging
  filtering: OrderFilter
  noDataFound: boolean = false

  @Input() totalCount: number;

  ngOnInit(): void {
    this.getClients()
    //this.GetorderPlace()
    this.paging = new Paging
    this.filtering = new OrderFilter
  }

  // GetorderPlace() {
  //   this.orderservice.orderPlace().subscribe(res => {
  //     this.orderPlace = res
  //     this.orderPlace = this.orderPlace.filter(o => o.id == 3 || o.id == 2)

  //   })
  // }
  getClients() {
    this.clientService.getClients().subscribe(res => {
      this.Clients = res
    })
  }
  ChangeClientIdOrOrderplacedId() {
    if (this.ClientId != null) {
      this.filtering.OrderplacedId =2
      this.filtering.ClientId=this.ClientId
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
    this.orderservice.GetAll(this.filtering, this.paging).subscribe(response => {
      if (response)
        if (response.data.length == 0)
          this.noDataFound = true
        else this.noDataFound = false
      this.dataSource = new MatTableDataSource(response.data)
      //this.dataSource.data = this.dataSource.data.filter(d => d.agent.id == this.ClientId)
      this.totalCount = response.total
    },
      err => {

      });
  }
  print() {
    if (this.orders == []) return
    localStorage.setItem('printorders', JSON.stringify(this.orders))
    this.route.navigate(['/print'])
   
  }

}
