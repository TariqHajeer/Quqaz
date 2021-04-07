import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DateFiter } from 'src/app/Models/paging';
import { User } from 'src/app/Models/user/user.model';
import { StatisticsService } from 'src/app/services/statistics.service';

@Component({
  selector: 'app-agent-statistics',
  templateUrl: './agent-statistics.component.html',
  styleUrls: ['./agent-statistics.component.scss']
})
export class AgentStatisticsComponent implements OnInit {

  constructor(private statisticservice:StatisticsService) { }
  displayedColumns: string[] = ['name', 'orderInStore', 'orderInWay'];
dataSource = new MatTableDataSource([]);
noDataFound: boolean = false

  ngOnInit(): void {
    
    this.get()
  }

  agents:User[]=[]
get(){
  this.statisticservice.AgnetStatics().subscribe(res=>{
    console.log(res)
    this.agents=res
    this.dataSource=new MatTableDataSource(this.agents)
  })
}
}
