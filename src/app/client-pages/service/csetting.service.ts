import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CsettingService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl+"api/CSettingsGet/";
  getCountry(){
   return this.http.get<any>(this.baseUrl+"getCountry")
  }
  GetCountries(){
    return this.http.get<any>(this.baseUrl+"GetCountries")

  }
  GetRegions(){
    return this.http.get<any>(this.baseUrl+"GetRegions")

  }
  orderType(){
    return this.http.get<any>(this.baseUrl+"orderType")

  }
  orderPlace(){
    return this.http.get<any>(this.baseUrl+"orderPlace")

  }
  MoenyPlaced(){
    return this.http.get<any>(this.baseUrl+"MoenyPlaced")

  }
}
