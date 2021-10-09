import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentOrderService {

  constructor(private http: HttpClient) { }
  controler = environment.baseUrl + "api/AgentOrder/";
  Get() {
    return this.http.get<any>(this.controler+"Order")
  }
  InStock(){
    return this.http.get<any>(this.controler+"InStock")
  }
  InWay(){
    return this.http.get<any>(this.controler+"InWay")
  }
  MakeOrderInWay(ids){
    return this.http.get<any>(this.controler+"InWay")
  }
  
}
