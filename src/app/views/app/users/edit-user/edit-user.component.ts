import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { from } from 'rxjs';
import { CustomService } from 'src/app/services/custom.service';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { CreateUser } from 'src/app/Models/user/create-user'
import { Group } from 'src/app/Models/Group/group.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(public UserService: UserService,
    public GroupService: GroupService, 
    private customService: CustomService,
     private notifications: NotificationsService,
     private getroute: ActivatedRoute,
     private router:Router) { }
  User: User
  Countries: any[] = [];
  departments: any[] = [];
  Groups: Group[] = []
  tempPhone: string;
  nameIsRepeated:boolean=false;
  id
  submitted
  ngOnInit(): void {
   
    this.getroute.params.subscribe(par => {
      this.id = par['id'] as string
    });
    this.UserService.GetAll()
   this.User= this.UserService.users.find(u=>u.id==this.id)
    this.getCountry()
    this.getDepartments()
    this.GetAllGroups()
    
  }
 
  checkName(){
    console.log(this.UserService.users);
       
    if( this.UserService.users.filter(c=>c.name==this.User.name).length>0){
      
      this.nameIsRepeated =true
      console.log(this.nameIsRepeated);
      return;
    }
    this.nameIsRepeated =false
    console.log(this.nameIsRepeated);
  }
  addOrEditUser() {
    this.UserService.Update(this.User).subscribe(
      res => {
        this.router.navigate(['/app/user'])

      }
    )
  }


  getDepartments() {
    this.customService.getAll('Department').subscribe(
      res => {
        this.departments = res;
      }
    )
  }

  getCountry() {
    this.customService.getAll('Country').subscribe(
      res => {
        this.Countries = res;
      }
    )
  }
  GetAllGroups() {
    this.GroupService.GetAll().subscribe(res => {
      this.Groups = res
    })
  }

  addNewPhone() {
    this.User.phones.push(this.tempPhone);
    this.tempPhone = '';
  }
}
