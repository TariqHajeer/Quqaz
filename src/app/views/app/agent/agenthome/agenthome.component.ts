import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agenthome',
  templateUrl: './agenthome.component.html',
  styleUrls: ['./agenthome.component.scss']
})
export class AgenthomeComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }
  totlaOrder
  AgentOrders() {
    this.router.navigate(['/app/agent/orders'])
  }
  onWay(){
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
}
