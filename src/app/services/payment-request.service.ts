import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentRequestService {

  controler = environment.baseUrl + "api/PaymentRequest/";
  constructor(public http: HttpClient) { }
 
  Get(){
    return this.http.get<any>(this.controler+"New")
  }
  Accept(id) {
    return this.http.put<any>(this.controler+id  , id)
  }
  DisAccept(id) {
    return this.http.put<any>(this.controler + "DisAccept" , id )
  }
}
