import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Paging } from '../Models/paging';

@Injectable({
  providedIn: 'root'
})
export class ClientMessageService {

  controler = environment.baseUrl + "api/ClientMessage/";
  constructor(private http: HttpClient) { }
  getClientMessage(paging: Paging) {
    let params = new HttpParams();
    if (paging.Page)
      params = params.append('page', paging.Page as any);
    if (paging.RowCount)
      params = params.append('rowCount', paging.RowCount as any);
    return this.http.get<any>("api/ClientMessage", { params: params });
  }
  deleteClientMessage(id: number) {
    return this.http.get<any>(this.controler + "/" + id);
  }
  publishClientMessage(id: number) {
    let params = new HttpParams();
    if (id)
      params = params.append('id', id as any);
    return this.http.put<any>(this.controler + "Publish/", { params: params });
  }
  unPublishClientMessage(id: number) {
    let params = new HttpParams();
    if (id)
      params = params.append('id', id as any);
    return this.http.put<any>(this.controler + "UnPublish/", { params: params });
  }
}
