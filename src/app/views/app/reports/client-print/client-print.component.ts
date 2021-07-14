import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Paging } from 'src/app/Models/paging';
import { OrderService } from 'src/app/services/order.service';
import { Client } from '../../client/client.model';
import { ClientService } from '../../client/client.service';

@Component({
  selector: 'app-client-print',
  templateUrl: './client-print.component.html',
  styleUrls: ['./client-print.component.scss']
})
export class ClientPrintComponent implements OnInit {

  constructor(public orderService: OrderService, private router: Router,
    public clientService: ClientService,) { }

  ngOnInit(): void {
    this.paging = new Paging
    this.Get()
    this.getClients()
  }
  displayedColumns: string[] = ['printNmber', 'printerName', 'date', 'destinationName', 'destinationPhone'
  ];
  ;
  dataSource
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input() totalCount: number;
  pageEvent: PageEvent;
  paging: Paging
  noDataFound: boolean = false
  Clients: Client[] = []
  Client
  ClientPrints
  Get() {
    this.orderService.GetClientprint(this.paging, this.printNmber,this.Client).subscribe(res => {
      // this.orderFilter=res
      // this.orderFilter.forEach(o=>{
      //   o.printNmber=JSON.stringify(o.printNmber)
      // })

      this.dataSource = new MatTableDataSource(res.data)
      this.totalCount = res.total
      this.ClientPrints = res.data
    })
  }
  switchPage(event: PageEvent) {
    this.paging.allItemsLength = event.length
    this.paging.RowCount = event.pageSize
    this.paging.Page = event.pageIndex + 1
    this.Get();

  }
  printNmberFillter() {
    this.Get()
  }
  print(number) {
    this.router.navigate(['/app/reports/clientprintnumber/', number])
  }
  printNmber: number = null
  // orderFilter=[]
  // printNmberFillter() {
  //   this.dataSource.data=this.orderFilter
  //   if(this.dataSource.data.length!=0)
  //  this.dataSource.data= this.dataSource.data.filter(d=>d.printNmber.includes(this.printNmber))
  // }
  getClients() {
    this.clientService.getClients().subscribe(res => {
      this.Clients = res
    })
  }
  changeClient() {
    this.dataSource.data = this.ClientPrints
    if (this.Client)
      this.dataSource.data = this.dataSource.data.filter(d => d.destinationName == this.Client.name)
  }
}
