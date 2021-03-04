import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { OrderFilter } from '../Models/order-filter.model';
import { Paging } from '../Models/paging';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  controler = environment.baseUrl + "api/Order/";
  constructor(public http: HttpClient) { }
  GetAll(filter: OrderFilter, paging: Paging) {
    let params = new HttpParams();
    if (filter.Code != undefined || filter.Code != null)
      params = params.append("Code", filter.Code);
    if (filter.AgentId != undefined || filter.AgentId != null)
      params = params.append("AgentId", filter.AgentId);
    if (filter.Phone != undefined || filter.Phone != null)
      params = params.append("Phone", filter.Phone);
    if (filter.CountryId != undefined || filter.CountryId != null)
      params = params.append("CountryId", filter.CountryId);
    if (filter.RegionId != undefined || filter.RegionId != null)
      params = params.append("RegionId", filter.RegionId);
    if (filter.ClientId != undefined || filter.ClientId != null)
      params = params.append("ClientId", filter.ClientId);
    if (filter.RecipientName != undefined || filter.RecipientName != null)
      params = params.append("RecipientName", filter.RecipientName);
    if (filter.MonePlacedId != undefined || filter.MonePlacedId != null)
      params = params.append("MonePlacedId", filter.MonePlacedId);
    if (filter.OrderplacedId != undefined || filter.OrderplacedId != null)
      params = params.append("OrderplacedId", filter.OrderplacedId);
    if (filter.IsClientDiliverdMoney != undefined || filter.IsClientDiliverdMoney != null)
      params = params.append("IsClientDiliverdMoney", filter.IsClientDiliverdMoney);
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append("RowCount", paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append("Page", paging.Page);
    return this.http.get<any>(this.controler, { params: params })
  }
  GetById(id) {
    return this.http.get<any>(this.controler + id)
  }

  Creat(item) {
    return this.http.post(this.controler, item)

  }
  createMultiple(item) {
    return this.http.post(this.controler + "createMultiple", item)

  }
  Update(item) {
    return this.http.patch(this.controler, item)

  }
  Delete(id) {
    return this.http.delete(this.controler + id)

  }
  orderPlace() {
    return this.http.get<any>(this.controler + "orderPlace")

  }
  MoenyPlaced() {
    return this.http.get<any>(this.controler + "MoenyPlaced")

  }
  chekcCode(code, ClientId) {
    let params = new HttpParams();
    params = params.append("code", code != null || code != undefined ? code : null);
    params = params.append("clientid", ClientId != null || ClientId != undefined ? ClientId : null);
    return this.http.get<any>(this.controler + "chekcCode", { params: params })
  }
  GetNewOrder() {
    return this.http.get<any>(this.controler + "NewOrders")
  }
  Accept(id) {
    let params = new HttpParams();
    params = params.append("id", id);
    return this.http.put<any>(this.controler + "Accept/" + id, { params: params })
  }
  DisAccept(id) {
    let params = new HttpParams();
    params = params.append("id", id);
    return this.http.put<any>(this.controler + "DisAccept/" + id, { params: params })
  }
  MakeOrderInWay(ids) {
    let params = new FormData();
    params.append("ids", ids);
    return this.http.put<any>(this.controler + "MakeOrderInWay", ids)

  }
  UpdateOrdersStatusFromAgent(orderstate) {
    return this.http.put<any>(this.controler + "UpdateOrdersStatusFromAgent", orderstate)
  }
  DeleiverMoneyForClient(ids) {
    return this.http.put<any>(this.controler + "DeleiverMoneyForClient", ids)

  }
  GetClientPrintNumber() {
    return this.http.get(this.controler + "GetClientPrintNumber")
  }
  SetClientPrintNumber(number) {
    return this.http.put(this.controler + "SetClientPrintNumber",number)
  }
  GetAgentPrintNumber() {
    return this.http.get(this.controler + "GetAgentPrintNumber")
  }
  SetAgentPrintNumber(number) {
    return this.http.put(this.controler + "SetAgentPrintNumber",number)
  }
}

