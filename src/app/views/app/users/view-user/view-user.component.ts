import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';
import { User } from 'src/app/Models/user/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  constructor(public UserService:UserService,private customService:CustomService,private notifications:NotificationsService) { }
  
  tempRegion:any;
  public stTime: any;
  public filter: Object;
  public filterSettings: Object;
  public editSettings: EditSettingsModel;
  public selectionSettings: Object;
  public lines: any;
  @ViewChild('normalgrid')
  public gridInstance: GridComponent;
  public toolbar: ToolbarItems[];
  public pageSettings: Object;
  users:User[]=[];
  editClicked:any;
  addClicked:any;
  currentUserId:any;
  ngOnInit(): void {
    this.getUser();
    this.editSettings = { showDeleteConfirmDialog: true, allowDeleting: true };
    this.toolbar = ['Search', 'Delete',];
    this.filterSettings = { type: "CheckBox" };
    this.filter = { type: "CheckBox" };
    this.stTime = performance.now();
    this.pageSettings = { pageSize: 5,pageSizes:true };
    this.gridInstance.on('data-ready', function () {
      this.dReady = true;
    });
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
     this.UserService.GetAll().subscribe(res=>{
       this.users=res
       console.log(res)
     })
  }
  onEditClicked(id){
    this.addClicked=false;
    this.editClicked=true;
  
  }
  addFinish(){

  }
 
}
