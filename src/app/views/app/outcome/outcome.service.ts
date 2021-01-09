import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filtering } from 'src/app/Models/Filtering.model'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OutcomeService {


  constructor(private http : HttpClient) { }

  baseUrl: string = 'http://localhost:5000/';


  getOutcomes(filter:Filtering):Observable<any>{
    let formdata=new FormData()
    formdata.append('CurrencyId',filter.CurrencyId.toString())
    formdata.append('FromDate',filter.FromDate.toString())
    formdata.append('MaxAmount',filter.MaxAmount.toString())
    formdata.append('MinAmount',filter.MinAmount.toString())
    formdata.append('ToDate',filter.ToDate.toString())
    formdata.append('Type',filter.Type.toString())
    formdata.append('UserId',filter.UserId.toString())
    return this.http.get(this.baseUrl+'api/OutCome?'+formdata).pipe(
      map(
        (res:any)=>{
          return res;
        }
      )
    )
  }
}
