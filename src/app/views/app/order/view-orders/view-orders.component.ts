import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Paging } from 'src/app/Models/paging';
import { Order } from 'src/app/Models/order/order.model';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { NameAndIdDto } from 'src/app/Models/name-and-id-dto.model';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {
  displayedColumns: string[];
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() totalCount: number;
  pageEvent: PageEvent;
  paging: Paging
  orders:Order[]=[]
  constructor(private orderservice:OrderService,
    private router:Router) { }

  ngOnInit(): void {
    this.get()
    this.paging = new Paging

  }
  get() {
    this.dataSource = new MatTableDataSource(this.orders);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.displayedColumns = ['SSN','SSN1','SSN2','SSN3'];
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  switchPage(event: PageEvent) {
   
    this.paging.allItemsLength=event.length
    this.paging.RowCount =  event.pageSize
    this.paging.Page = event.pageIndex+1
   
   
 this.allFilter();
    
   }
   allFilter(){
   this.orderservice.GetAll( this.paging).subscribe(response => {
     this.dataSource=new MatTableDataSource(response.body)
     console.log(response.body)
     this.totalCount = JSON.parse(response.headers.get('x-paging')).TotalRows;
    
   },
   err => {
     
   });
  }
  
  AddOrder(){
this.router.navigate(['/app/order/addorder'])
  }
}
