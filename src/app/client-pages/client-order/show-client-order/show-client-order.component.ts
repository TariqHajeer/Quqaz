import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-client-order',
  templateUrl: './show-client-order.component.html',
  styleUrls: ['./show-client-order.component.scss']
})
export class ShowClientOrderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
addorder(){
this.router.navigate(['/clienthome/orders/addorder'])
}
}
