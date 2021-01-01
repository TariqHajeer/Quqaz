import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OutcomeService {


  constructor(private http : HttpClient) { }

  baseUrl: string = 'http://localhost:5000/';


  getOutcomes():Observable<any>{
    return this.http.get(this.baseUrl+'api/OutCome').pipe(
      map(
        (res:any)=>{
          return res;
        }
      )
    )
  }
}
