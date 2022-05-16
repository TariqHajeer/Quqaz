import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountFilter } from 'src/app/Models/account-filter.model';

@Injectable({
  providedIn: 'root'
})
export class ReciptService {
  controler = environment.baseUrl + "api/Receipt/";

  constructor(public http: HttpClient) { }
  GetAccount(paging, account: AccountFilter) {
    let params = new HttpParams();
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append("RowCount", paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append("Page", paging.Page);
    if (account.ClientId != undefined || account.ClientId != null)
      params = params.append("ClientId", account.ClientId);
    if (account.Date != undefined || account.Date != null)
      params = params.append("Date", account.Date);
    if (account.IsPay != undefined)
      params = params.append("IsPay", account.IsPay);
    return this.http.get<any>(this.controler, { params: params })

  }
  Delete(id) {
    return this.http.delete(this.controler + id)
  }
  UnPaidRecipt(ClientId) {
    return this.http.get<any>(this.controler + "UnPaidRecipt/" + ClientId)
  }
  GetById(id) {
    return this.http.get<any>(this.controler + id)
  }
}
