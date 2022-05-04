import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreasuryService {

  constructor(public http: HttpClient) { }
  controler = environment.baseUrl + "api/Treasury/";
  getByUserId(id) {
    return this.http.get<any>(this.controler + id)
  }
  Add(treasury) {
    return this.http.post<any>(this.controler, treasury)
  }
  GiveMoney(id, amount) {
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('amount', amount);
    return this.http.patch<any>(this.controler + "GiveMoney", params)
  }
  GetMoney(id, amount) {
    let params = new HttpParams();
    params = params.append('id', id);
    params = params.append('amount', amount);
    return this.http.patch<any>(this.controler + "GetMoney", params)
  }
  DisActive(id) {
    return this.http.patch<any>(this.controler + "DisActive", id)
  }
  Active(id) {
    return this.http.patch<any>(this.controler + "Active", id)
  }
}
