import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/Models/user/user.model';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-vicdan-agent',
  templateUrl: './order-vicdan-agent.component.html',
  styleUrls: ['./order-vicdan-agent.component.scss']
})
export class OrderVicdanAgentComponent implements OnInit {

  constructor(public userService: UserService,
    private orderService: OrderService) { }
  AgentId
  Agents: User[] = []
  displayedColumns: string[] = [ 'code', 'client', 'cost', 'country', 'region'
    , 'orderplaced'];
  dataSource = new MatTableDataSource([]);
  count=0
  showcount=false
  ngOnInit(): void {
    this.getAgent()
  }
  getAgent() {
    this.userService.ActiveAgent().subscribe(res => {
      this.Agents = res
    })
  }
  ChangeAgentId() {
    this.orderService.OrderVicdanAgent(this.AgentId).subscribe(res => {
      this.dataSource = new MatTableDataSource(res as [])
      this.sumCost()
    })
  }
  sumCost() {
    this.count = 0
    if (this.dataSource.data.length!=0){
      this.dataSource.data.forEach(o => {
        this.count += o.cost
      })
      this.showcount=true
    }
    else
    this.showcount=false
     
    return this.count
  }
}
