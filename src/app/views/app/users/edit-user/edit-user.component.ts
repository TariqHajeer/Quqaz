import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { from } from 'rxjs';
import { CustomService } from 'src/app/services/custom.service';
import { GroupService } from 'src/app/services/group.service';
import { UserService } from 'src/app/services/user.service';
import { Group } from 'src/app/Models/Group/group.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user/user.model';
import { Phone } from 'src/app/Models/phone.model'

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
    private router: Router) { }
  User: User = new User()
  countries: any[] = [];
  departments: any[] = [];
  Groups: Group[] = []
  tempPhone: string;
  phone: Phone
  phones: Phone[] = []
  addGroup: Group
  addGroups: Group[] = []
  nameIsRepeated: boolean = false;
  usernameIsRepeated: boolean = false;
  id
  submitted
  confirmpassword: string
  checkPassword: boolean = false
  ngOnInit(): void {
    this.phone = new Phone()
    this.addGroup = new Group()
    this.User.canWorkAsAgent = true
    this.getroute.params.subscribe(par => {
      this.id = par['id'] as string
    });
    this.GetUserById()
    this.UserService.GetAll()
    //  this.User = this.UserService.users.find(u => u.id == this.id)
    this.getCountry()
    this.getDepartments()
    this.GetAllGroups()

  }

  checkName() {
    if (this.UserService.users.filter(c => c.name == this.User.name).length > 0) {
      this.nameIsRepeated = true
      return;
    }
    this.nameIsRepeated = false
  }
  checkUserName() {
    if (this.UserService.users.filter(c => c.userName == this.User.userName && c.id != this.User.id).length > 0) {

      this.usernameIsRepeated = true
      return;
    } else
      this.usernameIsRepeated = false
  }
  addOrEditUser() {
    this.User.id = Number(this.id)
    this.User.groupsId = []
    this.User.phones = []
    this.UserService.Update(this.User).subscribe(
      res => {
        this.notifications.create('success', 'تم التعديل بنجاح ', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        //this.router.navigate(['/app/user'])
      }
    )
  }
  GetUserById() {
    this.UserService.GetById(this.id).subscribe(res => {
      this.User = res
      this.phones = this.User.phones
    })
  }
  CheckPassword() {
    if (this.User.password != this.confirmpassword) {
      this.checkPassword = true
    }
    else {
      this.checkPassword = false
    }
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
        this.countries = res;
      }
    )
  }
  GetAllGroups() {
    this.GroupService.GetAll().subscribe(res => {
      this.Groups = res
      if (this.User.groupsId == null) return
      this.addGroups = this.Groups.filter(g => this.User.groupsId.includes(g.id))
    })
  }

  addNewPhone() {
    this.phone.objectId = Number(this.id)
    if (this.phone.phone == null || this.phone.phone == undefined) {
      this.notifications.create('', 'الرقم فارغ', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
      return
    }
    if (this.phones.filter(p => p.phone == this.phone.phone).length > 0) {
      this.notifications.create('', 'الرقم مكرر', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
      return
    }
    this.UserService.AddPhone(this.phone).subscribe(res => {
      this.phones.push(this.phone);
      this.phone = new Phone();
      this.notifications.create('success', 'تمت اضافة رقم هاتف بنجاح ', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    })

  }
  DeletePhone(item: Phone) {
    this.UserService.deletePhone(item.id).subscribe(res => {
      this.phones = this.phones.filter(p => p != item)
      this.notifications.create('success', 'تم حذف رقم هاتف بنجاح ', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    })
  }
  addNewGroup() {
    this.UserService.AddToGroup(this.id, this.addGroup.id).subscribe(res => {
      this.addGroups.push(this.addGroup);
      this.Groups.filter(g => g != this.addGroup)
      this.phone = new Phone();
      this.notifications.create('success', 'تمت اضافة المستخدم الى المجموعة بنجاح ', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    })

  }
  DeleteGroup(item) {
    this.UserService.deleteGroup(this.id, item.id).subscribe(res => {
      this.Groups.push(item)
      this.addGroups = this.addGroups.filter(p => p != item)
      this.notifications.create('success', 'تم حذف المستخدم من المجموعة بنجاح ', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    })
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
}
