import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { CreateUser } from '../Models/user/create-user';
import { User } from '../Models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  controler = environment.baseUrl + "api/User/";
  public users:User[]=[];
  constructor(public http: HttpClient) { }
  GetAll() :void {
    this.http.get<any>(this.controler).subscribe(res=>{
      this.users = res;
    })
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
