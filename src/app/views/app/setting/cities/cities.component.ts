import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, GridComponent, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import {CustomService} from '../../../../services/custom.service'
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  constructor(private customService:CustomService,private notifications:NotificationsService) { }
  cities:any[]=[];
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
    this.getCities();
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
  actionComplete(args: SaveEventArgs) {
    console.log(args);

    if (args.action=='add') {
      let obj:any={name:args.data['name']}

        this.customService.addOrUpdate('Country',JSON.parse(obj),'add').subscribe(
          res=>{
            if(res.result){
            this.notifications.create('success', 'تم اضافة مدينة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
              this.getCities();
          }
        }
        )
    }
    else if (args.action === "edit") {
      let obj:any={name:args.data['name']}

      this.customService.addOrUpdate('Country',obj,'update',args.rowData['id']).subscribe(
        res=>{if(res.result){
          this.notifications.create('success', 'تم تعديل المدينة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
          this.getCities();

        }
      }
      )
    }
    if (args.requestType == 'delete') {
      let id = args.data[0].id;
      if(args.data['CanDelete']){
      this.customService.delete('Country',id).subscribe(
        res=>{
          if(res.result){
          this.notifications.create('success', 'تم حذف المدينة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 4000, showProgressBar: false });
          this.getCities();

        }
        }
      )
    }
    else {
      this.gridInstance.refresh();
    }

    }
  }
getCities(){
  this.customService.getAll('Country').subscribe(
    res=>
    {
      this.cities=res;
    }
  )
}
}
