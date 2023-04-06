import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IIndexes } from '../store/index/interfaces/iindexes';
@Injectable({
  providedIn: 'root'
})
export class IndexesService {

  controler = environment.baseUrl + 'api/Indexes/';

  constructor(public http: HttpClient) { }
  getIndexes(indexesTypes: number[]) {
    let params = new HttpParams();
    indexesTypes.forEach((indexesType, index) => {
      params = params.append(`indexesTypes[${index}]`, String(indexesType));
    })
    return this.http.get<IIndexes[]>(this.controler, { params: params });
  }
}
