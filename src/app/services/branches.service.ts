import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  constructor(private http: HttpClient) { }
  controler = environment.baseUrl + "api/Branches/";
  Get() {
    return this.http.get<any>(this.controler)
  }
}
