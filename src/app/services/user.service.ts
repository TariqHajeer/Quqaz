import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
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
      let temp = res as User[];
      for(let i =0 ; i<temp.length;i++){
        if(temp[i].canWorkAsAgent){
          temp[i].employeeType="مندوب";
        }else{
          temp[i].employeeType="موظف";
        }
      }
      this.users = res;

      this.users.forEach(e=>{
        e.phonesAsString = e.phones.map(c=>c.phone).join(',');
      })
    })
  }
  GetById(id): Observable<any> {
    return this.http.get<any>(this.controler + id).pipe(
      map(
        (res: any) => {
          return res;
        }
      )
    )
  }
  ActiveAgent(){
    return this.http.get<any>(this.controler + "ActiveAgent")
  }
  Creat(item: CreateUser) {
    return this.http.post(this.controler, item)
  }
  Delete(id) {
    return this.http.delete(this.controler + id)
  }
  Update(item) {
    return this.http.patch(this.controler,item)
  }
  AddPhone(item) {
    return this.http.put(this.controler + "AddPhone", item)
  }
  deletePhone(id) {
    return this.http.put(this.controler + "deletePhone/"+id, id)

  }
  AddToGroup(userid,groupid) {
    var  formData=new FormData();
    formData.append("groupid",groupid);
    return this.http.put(this.controler + "AddToGroup/"+userid,formData )
  }
  deleteGroup(userid,groupid) {
    var  formData=new FormData();
    formData.append("groupid",groupid);
    return this.http.put(this.controler + "deleteGroup/"+userid,formData )
  }
}
