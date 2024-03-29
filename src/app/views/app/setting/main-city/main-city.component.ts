import { Component, OnInit } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { City } from 'src/app/Models/Cities/city.Model';
import { CustomService } from 'src/app/services/custom.service';

@Component({
  selector: 'app-main-city',
  templateUrl: './main-city.component.html',
  styleUrls: ['./main-city.component.scss']
})
export class MainCityComponent implements OnInit {

  constructor(private customerService: CustomService,
  private notifications: NotificationsService
  ) { }
  cityapi = "Country"
  cities: City[] = []
  CountryId
  ngOnInit(): void {
    this.Getcities()
  }
  Getcities() {
    this.customerService.getAll(this.cityapi).subscribe(res => {
      this.cities = res
      this.cities.forEach(item=>{
        if(item.isMain){
          this.CountryId=item.id
        }
      })
      // console.log(res)
    })
  }
  save(){
    this.customerService.SetMain(this.cityapi,this.CountryId).subscribe(res => {
     this.CountryId=null
     this.Getcities()
     this.notifications.create('success', 'تم الحفظ بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

    })
  }
}
