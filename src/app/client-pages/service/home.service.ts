import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl+"api/Home/";
  getCountry(){
   return this.http.get<any>(this.baseUrl+"Country")
  }
  Market(){
    return this.http.get<any>(this.baseUrl+"Market")
  }
}
