import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filtering } from 'src/app/Models/Filtering.model'
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Paging } from 'src/app/Models/paging';

@Injectable({
  providedIn: 'root'
})
export class OutcomeService {
  

  constructor(private http: HttpClient) { }

  controler = environment.baseUrl + "api/OutCome"

  getOutcomes(): Observable<any> {
    return this.http.get(this.controler).pipe(
      map(
        (res: any) => {
          
          return res;
        }
      )
    )
  }
  Get(filter: Filtering,paging:Paging) {
    let params = new HttpParams();
    if (filter.CurrencyId != undefined || filter.CurrencyId != null)
      params = params.append("CurrencyId", filter.CurrencyId);
    if (filter.FromDate != undefined || filter.FromDate != null)
      params = params.append("FromDate", filter.FromDate);
      if (filter.MaxAmount != undefined || filter.MaxAmount != null)
      params = params.append("MaxAmount", filter.MaxAmount);
    if (filter.MinAmount != undefined || filter.MinAmount != null)
      params = params.append("MinAmount", filter.MinAmount);
      if (filter.ToDate != undefined || filter.ToDate != null)
      params = params.append("ToDate", filter.ToDate);
      if (filter.Type != undefined || filter.Type != null)
      params = params.append("Type", filter.Type);
      if (filter.UserId != undefined || filter.UserId != null)
      params = params.append("UserId", filter.UserId);
      if (paging.RowCount != undefined || paging.RowCount != null)
      params = params.append("RowCount",paging.RowCount);
      if (paging.Page != undefined || paging.Page != null)
      params = params.append("Page", paging.Page);
    return this.http.get<any>(this.controler, { params: params })

  }
  Create(item) {
    return this.http.post(this.controler, item)
  }
  CreateMulitpleOutCome(items) {
    return this.http.post(this.controler+"/CreateMulitpleOutCome", items)
  }
 
  Ubdate(item) {
    return this.http.patch(this.controler, item)
  }
  Delete = (id) =>this.http.delete(this.controler+"/"+id);
  // Delete(id)  {
  //   return this.http.delete(this.controler+"/"+id);
  // }
}
 