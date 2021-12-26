import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentOrderService } from 'src/app/services/agent-order.service';

@Component({
  selector: 'app-agenthome',
  templateUrl: './agenthome.component.html',
  styleUrls: ['./agenthome.component.scss']
})
export class AgenthomeComponent implements OnInit {

  constructor(private router: Router,
    private agentService: AgentOrderService) { }

  ngOnInit(): void {
    this.getAgentStatics()
  }
  totalOrderInSotre
  totalOrderInWay
  totalOrderSuspended
  totlaOwedOrder
  totlaPrintOrder
  AgentOrders() {
    this.router.navigate(['/app/agent/orders'])
  }
  onWay() {
    this.router.navigate(['/app/agent/onway'])
  }
  inStor() {
    this.router.navigate(['/app/agent/instock'])
  }
  report() {
    this.router.navigate(['/app/agent/Report'])
  }
  suspended() {
    this.router.navigate(['/app/agent/Suspended'])
  }
  OwedOrder(){
    this.router.navigate(['/app/agent/owed'])
  } 
  date:Date
  getAgentStatics() {
    this.date=new Date();
    this.agentService.GetAgentStatics(this.date).subscribe(res => {
      this.totalOrderInSotre=res.totalOrderInSotre
      this.totalOrderInWay=res.totalOrderInWay
      this.totalOrderSuspended=res.totalOrderSuspended
      this.totlaOwedOrder=res.totlaOwedOrder
      this.totlaPrintOrder=res.totlaPrintOrder
    })
  }
}
