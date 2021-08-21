import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointSettingsService {
  controler = environment.baseUrl + "api/PointSettings/";
  constructor(public http: HttpClient) { }
  Add(point) {
    return this.http.post(this.controler, point)
  }
  Get(){
    return this.http.get<any>(this.controler)
  }
  delete(id){
    return this.http.delete(this.controler+id)
  }
}
