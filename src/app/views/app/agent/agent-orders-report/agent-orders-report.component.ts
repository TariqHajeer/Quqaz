import { formatDate } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Paging } from 'src/app/Models/paging';
import { User } from 'src/app/Models/user/user.model';
import { AgentOrderService } from 'src/app/services/agent-order.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-agent-orders-report',
  templateUrl: './agent-orders-report.component.html',
  styleUrls: ['./agent-orders-report.component.scss']
})
export class AgentOrdersReportComponent implements OnInit {


  constructor(public orderService: AgentOrderService, private router: Router,
    public userService: UserService,) { }

  ngOnInit(): void {
    this.paging = new Paging
    this.Get()
    // this.getAgent()
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
  Agents: User[] = []
  Agent
  AgentPrints:any[]=[]
  Code
  Date
  Get() {
    if(this.Date)
    this.Date=formatDate(this.Date , 'MM/dd/yyyy', 'en');
    this.orderService.Print(this.paging, this.printNmber,this.Date).subscribe(res => {
      // this.orderFilter=res
      // this.orderFilter.forEach(o=>{
      //   o.printNmber=JSON.stringify(o.printNmber)
      // })
      console.log(res.data)
      this.AgentPrints=res.data
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
    this.router.navigate(['/app/agent/showReport', number])
  }
  //orderFilter=[]
  // printNmberFillter() {
  //   this.dataSource.data=this.orderFilter
  //   if(this.dataSource.data.length!=0)
  //  this.dataSource.data= this.dataSource.data.filter(d=>d.printNmber.includes(this.printNmber))
  // }
  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agents = res
    })
  }
  ChangeAgentId() {
    this.dataSource.data=this.AgentPrints
    if (this.Agent)
      this.dataSource.data = this.dataSource.data.filter(d => d.destinationName == this.Agent.name)
  }

}
