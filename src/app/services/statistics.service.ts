import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(public http: HttpClient) { }
  controler = environment.baseUrl + "api/Statistics/";

  MainStatics() {
   return this.http.get<any>(this.controler+"MainStatics")
  }
  GetAggregate() {
    return this.http.get<any>(this.controler+"GetAggregate")
   }
}
