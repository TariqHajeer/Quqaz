import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-noconnection',
  templateUrl: './noconnection.component.html',
  styleUrls: ['./noconnection.component.scss']
})
export class NoconnectionComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
home(){
  this.router.navigate(['/app/HomePage/start'])
}
}
