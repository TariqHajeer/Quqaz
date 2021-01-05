import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/Models/Group/group.model';
import { CreateGroup } from 'src/app/Models/Group/create-group.model';
import { UpdateGroupDto } from 'src/app/Models/Group/update-group-dto.model';
import { Privilege } from 'src/app/Models/Group/privilege.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  constructor(public GroupService: GroupService) { }
  Groups: Group[]
  Group: Group
  CreateGroup: CreateGroup
  UpdateGroup: UpdateGroupDto
  Privileges: Privilege[]
  CheckedPrivilege: boolean[]
  Users: any[] = ['mohamad', 'samer']
  hiddenbtnSave: boolean = true;
  ngOnInit(): void {
    this.GetAllGroups()
    this.GetPrivilege()
  }
  GetAllGroups() {
    this.GroupService.GetAll().subscribe(res => {
      this.Groups = res
    })
  }
  GetById(id) {
    this.Group = this.Groups.find(c => c.Id == id)
  }
  GetPrivilege() {
    this.GroupService.GetPrivileges().subscribe(res => {
      this.Privileges = res
      return this.Privileges.filter(p => this.Group.PrivilegesId.filter(i => i == p.Id))
    })
  }
  AddGroup() {
    this.GroupService.Creat(this.CreateGroup).subscribe(res => {
      this.Group.Name = this.CreateGroup.Name
      this.Group.PrivilegesId = this.CreateGroup.PrivilegesId
      this.Groups.push(this.Group)
      this.Group = new Group()
      this.CreateGroup = new CreateGroup()
    })
  }
  selectrow(group: Group) {
    this.Group = group;
  }

  EditGroup(group:Group) {
    this.hiddenbtnSave = false
    this.UpdateGroup.Id=group.Id
    this.UpdateGroup.Name=group.Name
    this.UpdateGroup.Privileges=group.PrivilegesId
  }
  saveGroup() {
    this.GroupService.Update(this.UpdateGroup).subscribe(res => {
      this.hiddenbtnSave = true
    })
  }
  CancleEditGroup() {
    this.hiddenbtnSave = true
  }
}
