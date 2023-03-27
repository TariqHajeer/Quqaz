import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IndexesService {

  constructor(private httpClient: HttpClient) { }
  getIndexes() {

  }
}
