import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EditRequestService {

  controler = environment.baseUrl + "api/EditRequest/";
  constructor(public http: HttpClient) { }
  NewEditReuqet() {
    return this.http.get<any>(this.controler + "NewEditReuqet")
  }
  DisAccpet(id) {
    return this.http.put(this.controler + "DisAccpet", id)
  }
  Accpet(id) {
    return this.http.put(this.controler + "Accept", id)
  }
}
