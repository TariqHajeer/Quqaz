import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { CreateUser } from '../Models/user/create-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  controler = environment.baseUrl + "api/User/";
  constructor(public http: HttpClient) { }
  GetAll() {
    return this.http.get<any>(this.controler)
  }
  Creat(item: CreateUser) {
    return this.http.post(this.controler, item)
  }
  Delete(id) {
    return this.http.delete(this.controler + id)
  }
  AddPhone(item) {
    return this.http.put(this.controler + "AddPhone", item)
  }
  deletePhone(id) {
    return this.http.put(this.controler + "deletePhone/", id)

  }
  AddToGroup(userid,groupid) {
    var  formData=new FormData();
    formData.append("privelegeId",groupid);
    return this.http.put(this.controler + "AddToGroup/"+userid,formData )
  }
  deleteGroup(userid,groupid) {
    var  formData=new FormData();
    formData.append("privelegeId",groupid);
    return this.http.put(this.controler + "deleteGroup/"+userid,formData )
  }
}
