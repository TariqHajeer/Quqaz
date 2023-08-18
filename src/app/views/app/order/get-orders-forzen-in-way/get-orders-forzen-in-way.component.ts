import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Paging } from 'src/app/Models/paging';
import { User } from 'src/app/Models/user/user.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-get-orders-forzen-in-way',
  templateUrl: './get-orders-forzen-in-way.component.html',
  styleUrls: ['./get-orders-forzen-in-way.component.scss']
})
export class GetOrdersForzenInWayComponent implements OnInit {
  hour: number;
  agentId: number;
  currentDate: Date;
  agents: User[] = [];
  displayedColumns: string[] = ['number', 'code', 'deliveryCost', 'cost', 'oldCost', 'recipientName',
    'recipientPhones', 'client', 'clientPrintNumber', 'country'
    , 'region', 'agent', 'agentPrintNumber', 'monePlaced', 'orderplaced', 'address'
    , 'createdBy', 'date', 'diliveryDate', 'note'];
  dataSource = new MatTableDataSource([]);
  totalCount: number;
  noDataFound: boolean;
  paging: Paging = new Paging();
  constructor(private orderService: OrderService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAgent();
  }
  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.agents = res
    })
  }
  getForzenInWay() {
    if (this.hour && this.currentDate) {
      this.orderService.forzenInWay({ Hour: this.hour * 24, AgentId: this.agentId, CurrentDate: this.currentDate }).subscribe(res => {
        if (res) {
          this.noDataFound = false;
          this.dataSource = new MatTableDataSource(res);
          // this.totalCount = res.total;
        }
        else
          this.noDataFound = true;
      })
    }
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.getForzenInWay();
  }

}
