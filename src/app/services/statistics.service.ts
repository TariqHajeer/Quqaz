import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { DateFiter } from '../Models/paging';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(public http: HttpClient) { }
  controler = environment.baseUrl + "api/Statistics/";

  MainStatics() {
    return this.http.get<any>(this.controler + "MainStatics")
  }
  // GetAggregate() {
  //   return this.http.get<any>(this.controler + "GetAggregate")
  // }
  AgnetStatics() {
    return this.http.get<any>(this.controler + "AgnetStatics")

  }
  GetAggregate( datefilter: DateFiter) {
    let params = new HttpParams();
    if (datefilter.FromDate != undefined || datefilter.FromDate != null)
      params = params.append("FromDate", datefilter.FromDate);
    if (datefilter.ToDate != undefined || datefilter.ToDate != null)
      params = params.append("ToDate", datefilter.ToDate);
    return this.http.get<any>(this.controler + "GetAggregate", { params: params })
  }
  ClientBalance(){
   return this.http.get<any>(this.controler+"ClientBalance")
  }
}

