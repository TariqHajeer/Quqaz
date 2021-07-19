import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(public http: HttpClient) { }
  controler = environment.baseUrl + "api/Market/";
  Add(store) {
   return this.http.post(this.controler, store)
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
