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
  getClientMessage(paging: Paging, isPublished) {
    let params = new HttpParams();
    if (paging.Page)
      params = params.append('Page', paging.Page as any);
    if (paging.RowCount)
      params = params.append('RowCount', paging.RowCount as any);
    if (isPublished)
      params = params.append('isPublished', isPublished as any);

    return this.http.get<any>(environment.baseUrl + "api/ClientMessage", { params: params });
  }
  deleteClientMessage(id: number) {
    return this.http.delete<any>(this.controler + id);
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
