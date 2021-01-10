import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filtering } from 'src/app/Models/Filtering.model'
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class OutcomeService {


  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:5000/';
  controler = environment.baseUrl + "api/OutCome"

  getOutcomes(): Observable<any> {
    return this.http.get(this.baseUrl + 'api/OutCome?').pipe(
      map(
        (res: any) => {
          return res;
        }
      )
    )
  }
  Get(filter: Filtering){
    let CurrencyId = new HttpParams().set('CurrencyId', filter.CurrencyId);
    let FromDate = new HttpParams().set('FromDate', filter.FromDate);
    let MaxAmount = new HttpParams().set('MaxAmount', filter.MaxAmount);
    let MinAmount = new HttpParams().set('MinAmount', filter.MinAmount);
    let ToDate = new HttpParams().set('ToDate', filter.ToDate);
    let Type = new HttpParams().set('Type', filter.Type);
    let UserId = new HttpParams().set('UserId', filter.UserId);
    return this.http.get<any>(this.controler + "?" + CurrencyId + "&" + FromDate + "&" + MaxAmount
      + "&"+MinAmount+"&"+ToDate+"&"+Type+"&"+UserId,{observe: 'response'})
  }
  Create(item) {
    return this.http.post(this.controler, item)
  }
  CreateMulitpleOutCome(items) {
    return this.http.post(this.controler+"/CreateMulitpleOutCome", items)
  }
}
