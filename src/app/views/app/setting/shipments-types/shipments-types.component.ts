import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, GridComponent, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';

@Component({
  selector: 'app-shipments-types',
  templateUrl: './shipments-types.component.html',
  styleUrls: ['./shipments-types.component.scss']
})
export class ShipmentsTypesComponent implements OnInit {

  apiName="OrderType";
  constructor(private customService:CustomService,private notifications:NotificationsService) { }
  orderTypes:any[]=[];
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
    this.getOrderTypes();
    this.editSettings == { showDeleteConfirmDialog: false, allowAdding: true, allowEditing: true, allowEditOnDblClick: true, allowDeleting: true };
    this.toolbar = ['Add', 'Search', 'Edit', 'Delete', 'Update', 'Cancel'];
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

  getOrderTypes(){
  this.customService.getAll(this.apiName).subscribe(
    res=>
    {
      console.log(res);
      console.log(res);
      this.orderTypes=res;
    }
  )
}
actionComplete(args: SaveEventArgs) {
  console.log(args);

  if (args.action=='add') {
    let obj:any={name:args.data['name']}
    console.log(obj)
      this.customService.addOrUpdate('OrderType',obj,'add').subscribe(
        res=>{
          console.log(res)
          this.notifications.create('success', 'تم اضافة نوع الشحنة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
            this.getOrderTypes();

      }
      )
  }
  else if (args.action === "edit") {
    let obj:any={id:Number.parseInt(args.data['id']),name:args.data['name']}
    console.log(obj)

    this.customService.addOrUpdate(this.apiName,obj,'update').subscribe(
      res=>{
        console.log(res)

        this.notifications.create('success', 'تم تعديل نوع الشحنة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        this.getOrderTypes();
    }
    )
  }
  if (args.requestType == 'delete') {
    let id = args.data[0].id;
    if(args.data['CanDelete']){
    this.customService.delete(this.apiName,id).subscribe(
      res=>{
        if(res.result){
        this.notifications.create('success', 'تم حذف نوع الشحنة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 4000, showProgressBar: false });
        this.getOrderTypes();
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
