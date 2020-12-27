import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, GridComponent, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  constructor(private customService:CustomService,private notifications:NotificationsService) { }
  departments:any[]=[];
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
  ngOnInit(): void {
    this.getDepartments();
    this.editSettings = { showDeleteConfirmDialog: true, allowAdding: true,allowEditing:true,allowEditOnDblClick:true, allowDeleting: true };
    this.toolbar = ['Add','Search', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.filterSettings = { type: "CheckBox" };
    this.filter = { type: "CheckBox" };
    this.stTime = performance.now();
    this.pageSettings = { pageCount: 5 };
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
  getDepartments(){
    this.customService.getAll('Department').subscribe(
      res=>{
        this.departments=res;
      }
    )
  }

  actionComplete(args: SaveEventArgs) {
    console.log(args);

    if (args.action=='add') {
      let obj:any={name:args.data['name']}
      console.log(obj)
        this.customService.addOrUpdate('Department',obj,'add').subscribe(
          res=>{
            console.log(res)
            this.notifications.create('success', 'تم اضافة القسم بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
              this.getDepartments();

        }
        )
    }
    else if (args.action === "edit") {
      let obj:any={id:Number.parseInt(args.data['id']),name:args.data['name']}
      console.log(obj)

      this.customService.addOrUpdate('Department',obj,'update').subscribe(
        res=>{
          console.log(res)

          this.notifications.create('success', 'تم تعديل القسم بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
          this.getDepartments();
      }
      )
    }
    if (args.requestType == 'delete') {
      let id = args.data[0].id;
      if(args.data['CanDelete']){
      this.customService.delete('Department',id).subscribe(
        res=>{
          if(res.result){
          this.notifications.create('success', 'تم حذف القسم بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 4000, showProgressBar: false });
          this.getDepartments();

        }
        }
      )
    }
    else {
      this.gridInstance.refresh();
    }

    }
  }
}
