import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IIndexes } from '../store/index/interfaces/iindexes';
import { City } from '../Models/Cities/city.Model';
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
    return this.http.get<IIndexes>(this.controler, { params: params });
  }
  getAllAgents(countries: City[]) {
    var agents = countries.map(c => c.agents);
    return this.getDistinctById(agents);
  }
  getDistinctById(arr: any[]) {
    const map = new Map();
    for (const item of arr) {
      if (!map.has(item.id)) {
        map.set(item.id, item);
      }
    }
    return Array.from(map.values());
  }
  
  getCountriesByAgentId(countries: City[], agentId: number) {
    return countries.filter(country => country.agents.map(c => c.id).indexOf(agentId) > -1);
  }
}
