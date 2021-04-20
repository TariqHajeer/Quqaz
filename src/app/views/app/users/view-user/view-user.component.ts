import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, GridComponent, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';
import { User, UserStatics } from 'src/app/Models/user/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CreateUser } from 'src/app/Models/user/create-user';
import { Phone } from 'src/app/Models/phone.model';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  constructor(public UserService: UserService, private customService: CustomService, private notifications: NotificationsService,
    public route: Router) { }

  tempRegion: any;
  public stTime: any;
  public filter: Object;
  public filterSettings: Object;
  public editSettings: EditSettingsModel;
  public selectionSettings: Object;
  public lines: any;
  @ViewChild('normalgrid')
  public gridInstance: GridComponent;
  public toolbar: Object[];
  public pageSettings: Object;
  editClicked: any;
  addClicked: any;
  currentUserId: any;
  confirmpassword: string
  User: User
  ngOnInit(): void {
    this.getUser();
    this.editSettings = { showDeleteConfirmDialog: true, allowDeleting: true };
    this.toolbar = [
      { text: 'حذف', tooltipText: 'حذف', prefixIcon: 'e-delete', id: 'normalgrid_delete' }
      , 'Search'];
    this.filterSettings = { type: "CheckBox" };
    this.filter = { type: "CheckBox" };
    this.stTime = performance.now();
    this.pageSettings = { pageSize: 5, pageSizes: true };
    this.selectionSettings = { persistSelection: true, type: "Multiple" };
    this.lines = 'Horizontal';
  }
  load() {
    const rowHeight: number = this.gridInstance.getRowHeight();  // height of the each row
    const gridHeight: any = this.gridInstance.height;  // grid height
    const pageSize: number = this.gridInstance.pageSettings.pageSize;   // initial page size
    const pageResize: any = (gridHeight - (pageSize * rowHeight)) / rowHeight; // new page size is obtained here
    this.gridInstance.pageSettings.pageSize = pageSize + Math.round(pageResize);
  }
  addNewClicked() {
    this.addClicked = true;
    this.editClicked = false;
    this.getUser();
  }
  getUser() {
    console.log( this.UserService.users)

    this.UserService.GetAll();
  }
  onEditClicked(id) {
    this.route.navigate(['/app/user/edit', id])

  }
  Phone:Phone=new Phone
  addFinish(value: CreateUser) {
    this.User=new User
    this.User.userName = value.UserName
    this.User.experince = value.Experince
    this.User.hireDate = value.HireDate
    this.User.password = value.Password
    this.User.name = value.Name
    this.User.salary = value.Salary
    this.User.note = value.Note
    this.User.groupsId = value.GroupsId
    this.User.countryId = value.CountryId
    this.User.canWorkAsAgent = value.CanWorkAsAgent
    for (let index = 0; index < value.Phones.length; index++) {
      this.Phone.phone=value.Phones[index]
      this.User.phones.push(this.Phone)

    }
    this.User.UserStatics=new UserStatics
    this.User.UserStatics.OrderInStore=0
    this.User.UserStatics.OrderInWay=0
    this.UserService.users.push(this.User)
    this.gridInstance.refresh();

  }
  actionComplete(args: SaveEventArgs) {
    if (args.requestType == 'delete') {
      let id = args.data[0].id;
      if (args) {
        this.UserService.Delete(id).subscribe(
          res => {
            this.notifications.create('success', 'تم حذف  العميل بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 4000, showProgressBar: false });
          }
        )
      }
      else {
        this.gridInstance.refresh();
      }
    }
  }

  showAgent(id) {
    this.route.navigate(['/app/user/showagent', id])
  }

}
