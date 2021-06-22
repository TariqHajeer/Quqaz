import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{HomeService}from 'src/app/client-pages/service/home.service';
@Component({
  selector: 'app-clienthome',
  templateUrl: './clienthome.component.html',
  styleUrls: ['./clienthome.component.scss']
})
export class ClienthomeComponent implements OnInit {

  constructor(private router:Router,private homeservice:HomeService) { }
countries:any[]=[]
  ngOnInit(): void {
    this.getCountry()
  }
  showOrders(){
this.router.navigate(['/clienthome/orders'])
  }
  getCountry(){
    this.homeservice.getCountry().subscribe(res=>{
      this.countries=res
      console.log(res)
    })
  }
}
