import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-noconnection',
  templateUrl: './noconnection.component.html',
  styleUrls: ['./noconnection.component.scss']
})
export class NoconnectionComponent implements OnInit {

  constructor(private router:Router, private location: Location) { }

  ngOnInit(): void {
  }
home(){
  // this.router.navigate(['/app/HomePage/start'])
  this.location.back()
    return false
}
}
