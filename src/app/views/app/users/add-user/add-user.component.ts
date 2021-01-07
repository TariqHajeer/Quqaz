import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { from } from 'rxjs';
import { CustomService } from 'src/app/services/custom.service';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { CreateUser } from 'src/app/Models/user/create-user'
import { Group } from 'src/app/Models/Group/group.model';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnChanges {

  constructor(public UserService: UserService,
     public GroupService: GroupService, 
     private customService: CustomService,
      private notifications: NotificationsService,
      ) { }
  @Input() currentUserId;
  @Input() editClicked;
  @Input() addClicked;
  @Output() addFinish = new EventEmitter<any>();
  submitted = false;
  CreateUser: CreateUser
  Countries: any[] = [];
  departments: any[] = [];
  Groups: Group[] = []
  tempPhone: string;
  ngOnInit(): void {
    this.getCountry()
    this.getDepartments()
    this.GetAllGroups()
    this.CreateUser = new CreateUser()
    this.CreateUser.Phones = []
  }


  ngOnChanges(changes: SimpleChanges): void {

  }

  addOrEditUser() {
    this.submitted = true;
    console.log(this.CreateUser)
    this.UserService.Creat(this.CreateUser).subscribe(
      res => {
        if (this.addClicked) {
          this.notifications.create('success', 'تم اضافة موظف بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        }
        //else if (!this.editClicked) {
         // this.notifications.create('success', 'تم تعديل موظف بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

        //}
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
    this.CreateUser.Phones.push(this.tempPhone);
    this.tempPhone = '';
  }
//  NameIsNullOrDuplicate(array:[],name){

//  }
}
