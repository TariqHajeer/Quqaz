import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/order/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-view-orders-without-branch-filter',
  templateUrl: './view-orders-without-branch-filter.component.html',
  styleUrls: ['./view-orders-without-branch-filter.component.scss']
})
export class ViewOrdersWithoutBranchFilterComponent implements OnInit {

  constructor(private orderService: OrderService) { }
  order:Order[];
  ngOnInit(): void {
  }
  getOrders(code: string):void {
    
  }

}
