import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { from } from 'rxjs';
import { CustomService } from 'src/app/services/custom.service';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { CreateUser } from 'src/app/Models/user/create-user'
import { Group } from 'src/app/Models/Group/group.model';
import { NgxSpinnerService } from 'ngx-spinner';
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
    public spinner: NgxSpinnerService

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

  onTrackBy(index) {
    return index;
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
    else {
      this.checkPassword = false
    }
  }
  addOrEditUser() {
    if (this.RecipientPhoneslengthEdit != null || this.RecipientPhoneslength != null)
      return
      else if (this.tempPhone) {
        this.CreateUser.Phones.push(this.tempPhone)
        this.tempPhone = ''
      }
    if (this.CreateUser.CanWorkAsAgent) {
      if (!this.CreateUser.Name||this.CreateUser.Countries.length==0||!this.CreateUser.Salary||
        this.CreateUser.Phones.length==0) {
        this.submitted = true;
        return
      }else{
        this.submitted = false;
      }
    }
    else if(!this.CreateUser.CanWorkAsAgent) {
      if (!this.CreateUser.Name||!this.CreateUser.UserName||!this.CreateUser.Password||
        this.CreateUser.GroupsId.length==0||!this.CreateUser.HireDate||this.CreateUser.Phones.length==0) {
        this.submitted = true;
        return
      }else{
        this.submitted = false;
      }
    }
    this.CreateUser.Salary=this.CreateUser.Salary*1
    this.spinner.show()
    // this.CreateUser.Salary =0;
    //this.CreateUser.HireDate =
    this.UserService.Creat(this.CreateUser).subscribe(
      res => {
        this.spinner.hide()
        if (this.addClicked) {
          this.CreateUser.Id=res.id
          this.addFinish.emit(this.CreateUser);
          this.submitted = false;
          this.CreateUser = new CreateUser
          this.CreateUser.Phones=[]
          this.notifications.create('success', 'تم اضافة موظف بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        }

      },err=>{
        this.spinner.hide()
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
    if (this.checkLengthPhoneNumber(this.tempPhone))
      return
    this.CreateUser.Phones.push(this.tempPhone);
    this.tempPhone = '';
  }
  deletePhone(phone) {
    this.CreateUser.Phones = this.CreateUser.Phones.filter(p => p != phone)
  }
  RecipientPhoneslength = null
  checkLengthPhoneNumber(phone) {
    if (phone && phone.length < 11) {
      this.RecipientPhoneslength = " لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم"
      return true
    }
    else {
      this.RecipientPhoneslength = null
      return false
    }
  }
  RecipientPhoneslengthEdit = null
  checkLengthPhoneNumberForEdit(phone) {
    if (phone && phone.length < 11) {
      this.RecipientPhoneslengthEdit = " لايمكن لرقم الهاتف ان يكون اصغر من  11 رقم"
      return true
    }
    else {
      this.RecipientPhoneslengthEdit = null
      return false
    }
  }
}
