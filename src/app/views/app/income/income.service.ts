import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http : HttpClient) { }

  baseUrl: string = 'http://localhost:5000/';


  getIncomes():Observable<any>{
    return this.http.get(this.baseUrl+'api/Income').pipe(
      map(
        (res:any)=>{
          return res;
        }
      )
    )
  }
}
