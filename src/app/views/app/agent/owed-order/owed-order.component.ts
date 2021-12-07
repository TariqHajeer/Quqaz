import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';
import { OrderFilter } from 'src/app/Models/order-filter.model';
import { Paging } from 'src/app/Models/paging';
import { User } from 'src/app/Models/user/user.model';
import { AgentOrderService } from 'src/app/services/agent-order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-owed-order',
  templateUrl: './owed-order.component.html',
  styleUrls: ['./owed-order.component.scss']
})
export class OwedOrderComponent implements OnInit {

 
  displayedColumns: string[] = ['indexs', 'code', 'client','cost', 'country', 'region'];
dataSource = new MatTableDataSource([]);

constructor(
  private orderservice: AgentOrderService,
  public userService: UserService,
  private notifications: NotificationsService,
  public route: Router
) { }

noDataFound: boolean = false

@Input() totalCount: number;

ngOnInit(): void {
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

}
