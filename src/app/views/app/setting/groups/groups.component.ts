import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/Models/Group/group.model';
import { CreateGroup } from 'src/app/Models/Group/create-group.model';
import { UpdateGroupDto } from 'src/app/Models/Group/update-group-dto.model';
import { Privilege } from 'src/app/Models/Group/privilege.model';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  constructor(public GroupService: GroupService, private notifications: NotificationsService) { }
  Groups: Group[]=[]
  Group: Group
  CreateGroup: CreateGroup
  UpdateGroup: UpdateGroupDto
  Privileges: Privilege[]=[]
  privilegesInGroup: Privilege[]=[]
  CheckedPrivilege: boolean[]
  Users: any[] = ['mohamad', 'samer']
  hiddenbtnSave: boolean = true;
  ngOnInit(): void {
    this.CreateGroup=new CreateGroup()
    this.UpdateGroup=new UpdateGroupDto()
    this.Group=new Group() 
    this.GetAllGroups()
    this.GetPrivilege()
  }
  GetAllGroups() {
    this.GroupService.GetAll().subscribe(res => {
      this.Groups = res
    })
  }
  GetById(id) {
    this.Group = this.Groups.find(c => c.id == id)
  }
  GetPrivilege() {
    this.GroupService.GetPrivileges().subscribe(res => {
      this.Privileges = res
    })
  }
  AddGroup() {
  if(this.validation(this.CreateGroup))return
    this.GroupService.Creat(this.CreateGroup).subscribe(res => {
      this.notifications.create('success', 'تم اضافة مجموعة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.Group.name = this.CreateGroup.Name
      this.Group.privilegesId = this.CreateGroup.PrivilegesId
      this.Groups.push(this.Group)
      this.Group = new Group()
      this.CreateGroup = new CreateGroup()
    })
  }
  selectrow(group: Group) {
    this.privilegesInGroup=[]
    this.Group = group;
    this.privilegesInGroup= this.Privileges.filter(p => this.Group.privilegesId.includes(p.id))
  }

  EditGroup(group:Group) {
    this.hiddenbtnSave = false
    this.UpdateGroup.Id=group.id
    this.UpdateGroup.Name=group.name
    this.UpdateGroup.Privileges=group.privilegesId
  }
  saveGroup() {
    if(this.validation(this.CreateGroup))return
    this.GroupService.Update(this.UpdateGroup).subscribe(res => {
      this.hiddenbtnSave = true
      this.notifications.create('', 'تم التعديل', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.GetAllGroups()
      this.Group=new Group()
      this.privilegesInGroup=[]
    })
  }
  CancleEditGroup() {
    this.hiddenbtnSave = true
  }
  DeleteGroup(group:Group){
    this.GroupService.Delete(group.id).subscribe(res=>{
      this.notifications.create('', 'تم الحذف', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
      this.Groups=this.Groups.filter(g=>g!=group);
      this.Group=new Group()
      this.privilegesInGroup=[]
    })
  }
  validation(group):boolean{
    if(group.Name=='')
    {
      this.notifications.create('', 'الأسم فارغ', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
      return true
    }else if(this.Groups.filter(c => c.name == group.Name).length > 0){
      this.notifications.create('', 'الاسم مكرر', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
      return true
    }else return false
  }
}
