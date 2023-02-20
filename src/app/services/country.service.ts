import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  controler = environment.baseUrl + "api/Country/";
  constructor(private http: HttpClient) { }
  RequiredAgent(id) {
    let params = new HttpParams();
    if (id)
      params = params.append('id', id);
    return this.http.get<any>(this.controler + "RequiredAgent", { params: params })
  }
}
