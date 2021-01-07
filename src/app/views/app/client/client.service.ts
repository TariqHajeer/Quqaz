import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import {Client} from './client.model'
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }
  baseUrl: string = environment.baseUrl;


  getClients():Observable<Client[]>{
    return this.http.get<Client[]>(this.baseUrl+'api/Client').pipe(
      map(
        (res:any)=>{
          const data=res.map(obj=>({
            id:obj.id,
            name:obj.name,
            userName:obj.userName,
            regionId:obj.region.id,
            regionName:obj.region.name,
            canDelete:obj.canDelete,
            note:obj.note,
            firstDate:obj.firstDate,
            address:obj.address,
            phones:obj.phones,
          }))
          return data;
        }
      )
    )
  }
  getClientById(id):Observable<Client>{
    return this.http.get<Client>('api/Client/'+id).pipe(
      map(
        (res:any)=>{
          return res;
        }
      )
    )
  }
  addClient(client):Observable<Client>{
    return this.http.post<Client>(this.baseUrl+'api/Client',client).pipe(
      map(
        (res:any) =>{
          return res;
        }
      )
    )
  }
}