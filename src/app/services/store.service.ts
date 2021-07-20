import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AddStore } from '../Models/store/add-store.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(public http: HttpClient) { }
  controler = environment.baseUrl + "api/Market/";
  Add(store:AddStore) {
    let from=new FormData()
  from.append('Description',store.Description)
  from.append('ClientId',store.ClientId)
  from.append('IsActive',store.IsActive)
  from.append('Logo',store.Logo)
  from.append('MarketUrl',store.MarketUrl)
  from.append('Name',store.Name)
  const headers = new HttpHeaders().append('Content-Disposition', 'multipart/form-data');
   return this.http.post(this.controler, from,{headers: headers})
  }
  get(){
    return this.http.get<any>(this.controler)
  }
  getByid(id){
    return this.http.get<any>(this.controler+id)
  }
  edit(store) {
    return this.http.put(this.controler, store)
   }
   delete(id){
    return this.http.delete(this.controler+id)
  }
}
