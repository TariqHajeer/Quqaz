import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OrderFilter } from '../Models/order-filter.model';
import { DateFiter, Paging } from '../Models/paging';
import { OrderClientDontDiliverdMoney } from '../Models/order/order-client-dont-diliverd-money.model';

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
    if (filter.Note != undefined || filter.Note != null)
      params = params.append("Note", filter.Note);
    if (filter.RecipientName != undefined || filter.RecipientName != null)
      params = params.append("RecipientName", filter.RecipientName);
    if (filter.MonePlacedId != undefined || filter.MonePlacedId != null)
      params = params.append("MonePlacedId", filter.MonePlacedId);
    if (filter.OrderplacedId != undefined || filter.OrderplacedId != null)
      params = params.append("OrderplacedId", filter.OrderplacedId);
    if (filter.IsClientDiliverdMoney != undefined || filter.IsClientDiliverdMoney != null)
      params = params.append("IsClientDiliverdMoney", filter.IsClientDiliverdMoney);
    if (filter.AgentPrintStartDate != undefined || filter.AgentPrintStartDate != null)
      params = params.append("AgentPrintStartDate", filter.AgentPrintStartDate);
    if (filter.AgentPrintEndDate != undefined || filter.AgentPrintEndDate != null)
      params = params.append("AgentPrintEndDate", filter.AgentPrintEndDate);
    if (filter.AgentPrintNumber != undefined || filter.AgentPrintNumber != null)
      params = params.append("AgentPrintNumber", filter.AgentPrintNumber);
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append("RowCount", paging.RowCount);

    if (paging.Page != undefined || paging.Page != null)
      params = params.append("Page", paging.Page);
    return this.http.get<any>(this.controler, { params: params })
  }
  WithoutPaging(filter: OrderFilter) {
    let params = new HttpParams();
    if (filter.Code != undefined || filter.Code != null)
      params = params.append("Code", filter.Code);
    if (filter.AgentId != undefined || filter.AgentId != null)
      params = params.append("AgentId", filter.AgentId);
    if (filter.Phone != undefined || filter.Phone != null)
      params = params.append("Phone", filter.Phone);
    if (filter.CountryId != undefined || filter.CountryId != null)
      params = params.append("CountryId", filter.CountryId);
    if (filter.CreatedDate != undefined || filter.CreatedDate != null)
      params = params.append("CreatedDate", filter.CreatedDate);
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
    return this.http.get<any>(this.controler + "WithoutPaging", { params: params })

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
  CheckMulieCode(code, ClientId) {
    return this.http.post<any>(this.controler + "CheckMulieCode/" + ClientId, code)
  }
  GetNewOrder() {
    return this.http.get<any>(this.controler + "NewOrders")
  }
  NewOrderCount() {
    return this.http.get<any>(this.controler + "NewOrderCount")
  }
  Accept(id) {
    // let params = new HttpParams();
    // params = params.append("id", id);
    return this.http.put<any>(this.controler + "Accept", id)
  }
  DisAccept(id) {
    // let params = new HttpParams();
    // params = params.append("id", id);
    return this.http.put<any>(this.controler + "DisAccept", id)
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
  OrdersUnacceptable(filter, paging) {
    let params = new HttpParams();
    if (filter.Code != undefined || filter.Code != null)
      params = params.append("Code", filter.Code);
    if (filter.ClientId != undefined || filter.ClientId != null)
      params = params.append("ClientId", filter.ClientId);
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append("RowCount", paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append("Page", paging.Page);
    return this.http.get<any>(this.controler + "DisAccept", { params: params })

  }
  SetPrintNumber(number) {
    return this.http.post<any>(this.controler + "SetPrintNumber", number)
  }
  GetOrderByAgent(orderCode) {
    return this.http.get(this.controler + "GetOrderByAgent/" + orderCode)
  }
  GetEarning(paging: Paging, datefilter: DateFiter) {
    let params = new HttpParams();
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append("RowCount", paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append("Page", paging.Page);
    if (datefilter.FromDate != undefined || datefilter.FromDate != null)
      params = params.append("FromDate", datefilter.FromDate);
    if (datefilter.ToDate != undefined || datefilter.ToDate != null)
      params = params.append("ToDate", datefilter.ToDate);
    return this.http.get<any>(this.controler + "GetEarnings", { params: params })
  }
  ShipmentsNotReimbursedToTheClient(clientid) {
    return this.http.get<any>(this.controler + "ShipmentsNotReimbursedToTheClient/" + clientid)
  }
  ShortageOfCash(clientId) {
    let params = new HttpParams();
    params = params.append("clientId", clientId);
    return this.http.get<any>(this.controler + "ShortageOfCash", { params: params })
  }
  ReiveMoneyFromClient(ids) {
    return this.http.put<any>(this.controler + "ReiveMoneyFromClient", ids)
  }
  GetOrderByAgnetPrintNumber(printNumber) {
    let params = new HttpParams();
    params = params.append("printNumber", printNumber);
    return this.http.get<any>(this.controler + "GetOrderByAgnetPrintNumber", { params: params })
  }
  GetOrderByClientPrintNumber(printnumber) {
    let params = new HttpParams();
    params = params.append("printNumber", printnumber);
    return this.http.get<any>(this.controler + "GetOrderByClientPrintNumber", { params: params })
  }

  GetClientprint(paging, number, client) {
    let params = new HttpParams();
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append("RowCount", paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append("Page", paging.Page);
    if (number)
      params = params.append("number", number);
    if (client)
      params = params.append("clientName", client);
    return this.http.get<any>(this.controler + "GetClientprint", { params: params })

  }
  GetAgentPrint(paging, number, agent) {
    let params = new HttpParams();
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append("RowCount", paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append("Page", paging.Page);
    if (number)
      params = params.append("number", number);
    if (agent)
      params = params.append("agnetName", agent);
    return this.http.get<any>(this.controler + "GetAgentPrint", { params: params })

  }
  ClientDontDiliverdMoney(item: OrderClientDontDiliverdMoney) {
    let params = new HttpParams();

    if (item.ClientId != undefined || item.ClientId != null)
      params = params.append("ClientId", item.ClientId);
    if (item.ClientDoNotDeleviredMoney != undefined || item.ClientDoNotDeleviredMoney != null)
      params = params.append("ClientDoNotDeleviredMoney", item.ClientDoNotDeleviredMoney);
    if (item.IsClientDeleviredMoney != undefined || item.IsClientDeleviredMoney != null)
      params = params.append("IsClientDeleviredMoney", item.IsClientDeleviredMoney);
    if (item.OrderPlacedId.length != 0) { // params = params.append("OrderPlacedId", item.OrderPlacedId);
      let index = 0
      item.OrderPlacedId.forEach(element => {
        var key = "OrderPlacedId[" + index + "]"
        params = params.append(key, element);
        index++;
      });
    }
    return this.http.get<any>(this.controler + "OrdersDontFinished", { params: params })
  }
  OrderVicdanAgent(AgentId) {
    return this.http.get(this.controler + "OrderVicdanAgent/" + AgentId)
  }
  OrderInCompany(ClientId, code) {
    return this.http.get(this.controler + "OrderInCompany/" + ClientId + "/" + code)
  }
  DeleiverMoneyForClientWithStatus(ids) {
    return this.http.put<any>(this.controler + "DeleiverMoneyForClientWithStatus", ids)
  }
  ReSend(order) {
    return this.http.put<any>(this.controler + "ReSend", order)
  }
  MakeStoreOrderCompletelyReturned(id) {
    return this.http.put<any>(this.controler + "MakeStoreOrderCompletelyReturned", id)
  }
  TrakingOrder(agentid, cityid) {
    let params = new HttpParams();
    if (agentid)
      params = params.append("agentId", agentid);
    if (cityid)
      params = params.append("nextCountry", cityid);
    return this.http.get<any>(this.controler + "TrakingOrder", { params: params })
  }
  MoveToNextStep(ids) {
    return this.http.put(this.controler + "MoveToNextStep", ids)
  }
  OrderAtClient(filter) {
    let params = new HttpParams();
    if (filter.Code != undefined || filter.Code != null)
      params = params.append("Code", filter.Code);
    if (filter.ClientId != undefined || filter.ClientId != null)
      params = params.append("ClientId", filter.ClientId);
    return this.http.get<any>(this.controler + "OrderAtClient", { params: params })
  }
  changeAgentOrders(Orders,agent){

  }
}

