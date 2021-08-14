import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PaymentFilltering } from '../Models/payment-filltering.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentRequestService {

  controler = environment.baseUrl + "api/PaymentRequest";
  constructor(public http: HttpClient) { }

  Get() {
    return this.http.get<any>(this.controler + "/New")
  }
  GetOldPayment(filter:PaymentFilltering, paging) {
    let params = new HttpParams();
    if (filter.ClientId != undefined || filter.ClientId != null)
      params = params.append("ClientId", filter.ClientId);
      if (filter.PaymentWayId != undefined || filter.PaymentWayId != null)
      params = params.append("PaymentWayId", filter.PaymentWayId);
      if (filter.Id != undefined || filter.Id != null)
      params = params.append("Id", filter.Id);
      if (filter.CreateDate != undefined || filter.CreateDate != null)
      params = params.append("CreateDate", filter.CreateDate);
      if (filter.Accept != undefined || filter.Accept != null)
      params = params.append("Accept", filter.Accept);
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append("RowCount", paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append("Page", paging.Page);
    return this.http.get<any>(this.controler, { params: params })
  }
  Accept(id) {
    return this.http.put<any>(this.controler +'/Accept'+ id, id)
  }
  DisAccept(id) {
    return this.http.put<any>(this.controler + "/DisAccept"+ id, id)
  }
}
