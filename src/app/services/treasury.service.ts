import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TreasuryService {
  constructor(public http: HttpClient) { }
  controler = environment.baseUrl + 'api/Treasury/';
  Get() {
    return this.http.get<any>(this.controler);
  }
  getByUserId(id) {
    return this.http.get<any>(this.controler + id);
  }
  Hisotry(id, paging) {
    let params = new HttpParams();
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append('RowCount', paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append('Page', paging.Page);
    return this.http.get<any>(this.controler + 'Hisotry/' + id, {
      params: params,
    });
  }
  Add(treasury) {
    return this.http.post<any>(this.controler, treasury);
  }
  GiveMoney(id, data) {
    return this.http.post<any>(this.controler + 'GiveMoney/' + id, data);
  }
  GetMoney(id, data) {
    return this.http.post<any>(this.controler + 'GetMoney/' + id, data);
  }
  DisActive(id) {
    return this.http.patch<any>(this.controler + 'DisActive', id);
  }
  Active(id) {
    return this.http.patch<any>(this.controler + 'Active', id);
  }
  CashMovment(paging, treausryId) {
    let params = new HttpParams();
    if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append('RowCount', paging.RowCount);
    if (paging.Page != undefined || paging.Page != null)
      params = params.append('Page', paging.Page);
    if (treausryId) params = params.append('treausryId', treausryId);
    return this.http.get<any>(this.controler + 'CashMovment/', {
      params: params,
    });
  }
  CashMovmentId(id) {
    return this.http.get<any>(this.controler + 'CashMovment/' + id);
  }
  getTreasuryReport(fromDate, Todate, treasuryId) {

    let params = new HttpParams();
    if (fromDate)
      params = params.append('DateRangeFilter.Start', fromDate);
    if (Todate)
      params = params.append('DateRangeFilter.End', Todate);
    if (treasuryId)
      params = params.append('TreasuryId', treasuryId);
    return this.http.get<any>(this.controler + 'GetTreasuryReport', {
      params: params,
    });
  }
}
