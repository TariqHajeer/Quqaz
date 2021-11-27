import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-agent-order-state',
  templateUrl: './agent-order-state.component.html',
  styleUrls: ['./agent-order-state.component.scss']
})
export class AgentOrderStateComponent implements OnInit {

  
  constructor(private orderService: OrderService) { }
  displayedColumns: string[]=  ['agent', 'code', 'orderplaced', 'agentCost', 'Accept','DisAccept'];;
  dataSource
  payments: [] = []
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit(): void {
    this.Get()
  }
  Get() {
    this.orderService.OrderRequestEditState().subscribe(res => {
      this.payments = res
      this.dataSource = new MatTableDataSource(this.payments);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      // console.log(res)
    })
  }
  Accept(id) {
    this.orderService.AproveOrderRequestEditStateCount(id).subscribe(res => {
      this.Get()
    })
  }
  DisAccept(id) {
    this.orderService.DisAproveOrderRequestEditStateCount(id).subscribe(res => {
      this.Get()
    })
  }

}
