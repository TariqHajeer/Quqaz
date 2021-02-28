import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/Models/order/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-not-been-fully-paid',
  templateUrl: './order-not-been-fully-paid.component.html',
  styleUrls: ['./order-not-been-fully-paid.component.scss']
})
export class OrderNotBeenFullyPaidComponent implements OnInit {

  displayedColumns: string[];
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  orders: Order[] = []
  noDataFound: boolean = false

  constructor(private OrderService: OrderService) { }

  ngOnInit(): void {
    this.get()
  }
  get() {
    this.OrderService.GetNewOrder().subscribe(res => {
      this.orders = res
      if (this.orders.length == 0)
        this.noDataFound = true
      else this.noDataFound = false
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.displayedColumns = ['code', 'cost', 'recipientName',
        'recipientPhones', 'address', 'note', 'client', 'country'
        , 'region', 'agent', 'Accept'];
    })

  }
  Accept(elementid) {
    this.OrderService.Accept(elementid).subscribe(res=>{
      this.get()
    })
  }
 
}
