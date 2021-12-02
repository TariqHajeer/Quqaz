import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { OrderService } from 'src/app/services/order.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-agent-order-state',
  templateUrl: './agent-order-state.component.html',
  styleUrls: ['./agent-order-state.component.scss']
})
export class AgentOrderStateComponent implements OnInit {

  
  constructor(private orderService: OrderService,
    private notifications: NotificationsService,) { }
  displayedColumns: string[]=  ['select','agent', 'code', 'orderplaced', 'agentCost', 'neworderplaced', 'newagentCost'];;
  dataSource = new MatTableDataSource([]);
  payments: [] = []
  ids: any[] = []
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit(): void {
    this.Get()
  }
  selection = new SelectionModel<any>(true, []);

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows =this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.ids = []
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => { this.selection.select(row.order.id) });
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
      if (this.ids.filter(d => d == row).length > 0)
        return
      else {
        this.ids.push(row)
      }
    if (!this.selection.isSelected(row)) {
      this.ids = this.ids.filter(i => i != row)
    }
  }

  Get() {
    this.orderService.OrderRequestEditState().subscribe(res => {
      // console.log(res)
      this.payments = res
      this.dataSource = new MatTableDataSource(this.payments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  Accept() {
    if(this.ids.length==0){
      this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      return
    }
    this.orderService.AproveOrderRequestEditStateCount(this.ids).subscribe(res => {
      this.notifications.create('success', '  تم القبول بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.Get()
      this.ids = []
    })
  }
  DisAccept() {
    if(this.ids.length==0){
      this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      return
    }
    this.orderService.DisAproveOrderRequestEditStateCount(this.ids).subscribe(res => {
      this.notifications.create('success', '  تم الرقض بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.Get()
      this.ids = []
    })
  }

}
