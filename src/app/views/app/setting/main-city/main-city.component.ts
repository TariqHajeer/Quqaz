import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/Models/Cities/city.Model';
import { CustomService } from 'src/app/services/custom.service';

@Component({
  selector: 'app-main-city',
  templateUrl: './main-city.component.html',
  styleUrls: ['./main-city.component.scss']
})
export class MainCityComponent implements OnInit {

  constructor(private customerService: CustomService,
  ) { }
  cityapi = "Country"
  cities: City[] = []
  CountryId
  ngOnInit(): void {
  }
  Getcities() {
    this.customerService.getAll(this.cityapi).subscribe(res => {
      this.cities = res
    })
  }
  save(){

  }
}
