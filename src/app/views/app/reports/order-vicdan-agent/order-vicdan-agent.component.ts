import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { User } from 'src/app/Models/user/user.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-order-vicdan-agent',
  templateUrl: './order-vicdan-agent.component.html',
  styleUrls: ['./order-vicdan-agent.component.scss']
})
export class OrderVicdanAgentComponent implements OnInit {

  constructor(public userService: UserService,
    private orderService: OrderService,
    private notifications: NotificationsService,
    public route: Router) { }
  AgentId
  Agents: User[] = []
  displayedColumns: string[] = ['select', 'code', 'client', 'cost', 'country', 'region'
    , 'orderplaced'];
  dataSource = new MatTableDataSource([]);
  count=0
  showcount=false
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
    this.getAgent()
  }
  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agents = res
    })
  }
  ChangeAgentId() {
    this.orderService.OrderVicdanAgent(this.AgentId).subscribe(res => {
      this.dataSource = new MatTableDataSource(res as [])
      this.sumCost()
    })
  }
  sumCost() {
    this.count = 0
    if (this.dataSource.data.length!=0){
      this.dataSource.data.forEach(o => {
        this.count += o.cost
      })
      this.showcount=true
    }
    else
    this.showcount=false
     
    return this.count
  }
  print() {
    if ( this.orders.length == 0) {
      this.notifications.create('error', '  يجب اختيار طلبات', NotificationType.Error, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      return
    }
    var agent=this.Agents.find(c => c.id == this.AgentId)
    localStorage.setItem('printagent', JSON.stringify(agent))
    localStorage.setItem('printordersagent', JSON.stringify(this.orders))
    this.route.navigate(['app/reports/printagentpreview'])
  }
}
