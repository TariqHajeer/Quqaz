import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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
  getClientById(id): Observable<any> {
    return this.http.get<any>(this.controler + id).pipe(
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
  GiveOrDiscountPoints(item){
    return this.http.post(this.controler+"GiveOrDiscountPoints",item)
  }
}
