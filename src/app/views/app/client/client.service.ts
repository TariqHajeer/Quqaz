import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountFilter } from 'src/app/Models/account-filter.model';
import { environment } from 'src/environments/environment.prod';
import { Client } from './client.model'
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;
  controler = this.baseUrl + 'api/Client/'

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl + 'api/Client')
  }
  getClientById(id): Observable<Client> {
    return this.http.get<Client>(this.controler + id).pipe(
      map(
        (res: any) => {
          return res;
        }
      )
    )
  }
  addClient(client): Observable<Client> {
    return this.http.post<Client>(this.controler, client).pipe(
      map(
        (res: any) => {
          return res;
        }
      )
    )
  }
  Update(item) {
    return this.http.patch(this.controler, item)

  }
  Delete(id) {
    return this.http.delete(this.controler + id)

  }
  addPhone(item) {
    return this.http.put(this.controler+"addPhone", item)
  }
  deletePhone(id) {
    const options = id ?
    { params: new HttpParams().set('id', id) } : {};
    return this.http.put(this.controler+"deletePhone/"+id,options)
  }
  Account(item){
    return this.http.post(this.controler+"Account",item)
  }
  GetAccount(paging,account:AccountFilter){
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
      return this.http.get<any>(this.controler + "Account", { params: params })

   }
}
