import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface IProduct {
  id: number;
  title: string;
  img: string;
  category: string;
  status: string;
  statusColor: string;
  description: string;
  sales: number;
  stock: number;
  date: string;
}

export interface IProductResponse {
  data: IProduct[];
  status: boolean;
  totalItem: number;
  totalPage: number;
  pageSize: string;
  currentPage: string;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) { }

  getProducts(pageSize: number = 10, currentPage: number = 1, search: string = '', orderBy: string = ''):Observable<any> {
  return;
  }
}
