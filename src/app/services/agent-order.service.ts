import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgentOrderService {

  constructor(private http: HttpClient) { }
  controler = environment.baseUrl + "api/AgentOrder/";
  Get() {
    return this.http.get<any>(this.controler + "Order")
  }
  InStock() {
    return this.http.get<any>(this.controler + "InStock")
  }
  InWay() {
    return this.http.get<any>(this.controler + "InWay")
  }
  InWayByCode(code) {
    let params = new HttpParams();
    if (code)
      params = params.append("code", code);
    return this.http.get<any>(this.controler + "InWayByCode",{ params: params })
  }
  MakeOrderInWay(ids) {
    return this.http.get<any>(this.controler + "InWay")
  }
  OrderSuspended(date) {
    let params = new HttpParams();
    if (date)
      params = params.append("dateTime",date);
    return this.http.get<any>(this.controler + "OrderSuspended",{ params: params })
  }
  Print(paging, number, date) {
    let params = new HttpParams();
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append("RowCount", paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append("Page", paging.Page);
    if (number)
      params = params.append("Number", number);
    if (date)
      params = params.append("Date", date);
    return this.http.get<any>(this.controler + "Prints", { params: params })
  }
  Printid(printNumber) {
    let params = new HttpParams();
    if (printNumber)
      params = params.append("printNumber", printNumber);
    return this.http.get<any>(this.controler + "Print", { params: params })
  }
  SetOrderPlaced(orderstate) {
    return this.http.post<any>(this.controler + "SetOrderPlaced", orderstate)
  }
  OwedOrder() {
    return this.http.get<any>(this.controler + "OwedOrder")
  }
  GetAgentStatics(date) {
    let params = new HttpParams();
    params = params.append("dateTime", date);
    return this.http.get<any>(this.controler + "GetAgentStatics", { params: params })
  }
}
