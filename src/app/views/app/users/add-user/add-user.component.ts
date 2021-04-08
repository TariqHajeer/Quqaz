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
  Groups: Group[] = []
  tempPhone: string;
  nameIsRepeated: boolean = false;
  usernameIsRepeated: boolean = false;
  confirmpassword
  checkPassword: boolean = false
  ngOnInit(): void {
    this.getCountry()
    this.GetAllGroups()
    this.CreateUser = new CreateUser()
    this.CreateUser.CanWorkAsAgent = false
    this.CreateUser.Phones = []
  }


  ngOnChanges(changes: SimpleChanges): void {
  }
  checkName() {
    if (this.UserService.users.filter(c => c.name == this.CreateUser.Name).length > 0) {

      this.nameIsRepeated = true
      return;
    }
    else
      this.nameIsRepeated = false
  }
  checkUserName() {

    if (this.UserService.users.filter(c => c.userName == this.CreateUser.UserName).length > 0) {

      this.usernameIsRepeated = true
      return;
    } else
      this.usernameIsRepeated = false
  }
  CheckPassword() {
    if (this.CreateUser.Password != this.confirmpassword) {
      this.checkPassword = true
    }
    else{
      this.checkPassword = false
    }
  }
  addOrEditUser() {
    this.submitted = true;
    this.UserService.Creat(this.CreateUser).subscribe(
      res => {
        if (this.addClicked) {
          this.addFinish.emit(this.CreateUser);
          this.submitted = false;
          this.CreateUser=new CreateUser
          this.notifications.create('success', 'تم اضافة موظف بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        }

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
  RecipientPhoneslength = ""
  checkLengthPhoneNumber(phone) {
    console.log(phone)
    if (phone&&phone.length < 11) {
      this.RecipientPhoneslength = " لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم"
      return true
    } 
    else {
      this.RecipientPhoneslength = ""
      return false
    }
  }
  RecipientPhoneslengthEdit = ""
  checkLengthPhoneNumberForEdit(phone) {
    console.log(phone)
    if (phone&&phone.length < 11) {
      this.RecipientPhoneslengthEdit = " لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم"
      return true
    } 
    else {
      this.RecipientPhoneslengthEdit = ""
      return false
    }
  }
}
