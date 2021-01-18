import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Paging } from '../Models/paging';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  controler = environment.baseUrl + "api/Order/";
  constructor(public http: HttpClient) { }
  GetAll(filter,paging:Paging) {
    return this.http.get<any>(this.controler)
  }
  GetById(id) {
    return this.http.get<any>(this.controler+id)
  }
 
  Creat(item) {
    return this.http.post(this.controler,item)

  }
  Update(item) {
    return this.http.patch(this.controler,item)

  }
  Delete(id) {
    return this.http.delete(this.controler+id)

  }
  orderPlace(){
    return this.http.get<any>(this.controler+"orderPlace")

  }
  MoenyPlaced(){
    return this.http.get<any>(this.controler+"MoenyPlaced")

  }
}
