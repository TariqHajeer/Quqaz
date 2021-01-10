import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, GridComponent, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';
import { User } from 'src/app/Models/user/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  constructor(public UserService:UserService,private customService:CustomService,private notifications:NotificationsService,
    public route:Router) { }
  
  tempRegion:any;
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
  editClicked:any;
  addClicked:any;
  currentUserId:any;
  confirmpassword:string

  ngOnInit(): void {
    this.getUser();
    this.editSettings = { showDeleteConfirmDialog: true, allowDeleting: true };
    this.toolbar = [
      { text: 'حذف', tooltipText: 'حذف', prefixIcon: 'e-delete', id: 'normalgrid_delete' }
      , 'Search'];
    this.filterSettings = { type: "CheckBox" };
    this.filter = { type: "CheckBox" };
    this.stTime = performance.now();
    this.pageSettings = { pageSize: 5,pageSizes:true };
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
  addNewClicked(){
    this.addClicked=true;
    this.editClicked=false;
    this.getUser();
  }
  getUser(){

      this.UserService.GetAll();
  }
  onEditClicked(data){
   this.route.navigate(['/app/user/edit',data[0].id])
  
  }
  addFinish(){

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
  
  
}
