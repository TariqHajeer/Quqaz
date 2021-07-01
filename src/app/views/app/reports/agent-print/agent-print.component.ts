import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Paging } from 'src/app/Models/paging';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-agent-print',
  templateUrl: './agent-print.component.html',
  styleUrls: ['./agent-print.component.scss']
})
export class AgentPrintComponent implements OnInit {

  constructor(public orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.paging = new Paging
    this.Get()
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
  Get() {
    this.orderService.GetClientprint(this.paging, this.printNmber).subscribe(res => {
      // this.orderFilter=res
      // this.orderFilter.forEach(o=>{
      //   o.printNmber=JSON.stringify(o.printNmber)
      // })
      this.dataSource = new MatTableDataSource(res.data)
      this.totalCount = res.total

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
  printNmber: number = null
  print(number) {
    this.router.navigate(['/app/reports/agentprintnumber/',number])
  }
  //orderFilter=[]
  // printNmberFillter() {
  //   this.dataSource.data=this.orderFilter
  //   if(this.dataSource.data.length!=0)
  //  this.dataSource.data= this.dataSource.data.filter(d=>d.printNmber.includes(this.printNmber))
  // }
}
