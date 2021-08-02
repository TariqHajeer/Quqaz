import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  controler = environment.baseUrl + "api/PaymentWay/";
  constructor(public http: HttpClient) { }
  Add(payment) {
    return this.http.post(this.controler, payment)
  }
  Get(){
    return this.http.get<any>(this.controler)
  }
  delete(id){
    return this.http.delete(this.controler+id)
  }
}
