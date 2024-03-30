import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl+"api/Home/";
  getCountry(){
   return this.http.get<any>(this.baseUrl+"Country")
  }
  Market(){
    return this.http.get<any>(this.baseUrl+"Market")
  }
  TrackOrder(code,phone){
    let params = new HttpParams();
    if (code != undefined || code!= null)
      params = params.append("code", code);
      if (phone != undefined || phone!= null)
      params = params.append("phone", phone);
    return this.http.get<any>(this.baseUrl+"TrackOrder", { params: params })

  }
}
