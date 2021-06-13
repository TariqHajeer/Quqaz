import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clienthome',
  templateUrl: './clienthome.component.html',
  styleUrls: ['./clienthome.component.scss']
})
export class ClienthomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  showOrders(){
this.router.navigate(['/clienthome/orders'])
  }
}
