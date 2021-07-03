import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UpdateGroupDto } from 'src/app/Models/Group/update-group-dto.model';
import { CreateGroup } from 'src/app/Models/Group/create-group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  controler = environment.baseUrl + "api/Group/";
  constructor(public http: HttpClient) { }
  GetAll() {
    return this.http.get<any>(this.controler)
  }
  GetById(id) {
    return this.http.get<any>(this.controler+"/"+id)
  }
  GetPrivileges() {
    return this.http.get<any>(this.controler+"Privileges")
  }
  Creat(item:CreateGroup) {
    return this.http.post(this.controler,item)

  }
  Update(item:UpdateGroupDto) {
    return this.http.patch(this.controler,item)

  }
  Delete(id) {
    return this.http.delete(this.controler+id)

  }
}
