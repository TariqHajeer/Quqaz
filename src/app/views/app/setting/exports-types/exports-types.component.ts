import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionEventArgs, EditSettingsModel, GridComponent, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';

@Component({
  selector: 'app-exports-types',
  templateUrl: './exports-types.component.html',
  styleUrls: ['./exports-types.component.scss']
})

export class ExportsTypesComponent implements OnInit {

  constructor(private customService: CustomService, private notifications: NotificationsService) { }

  exportTypes: any[] = [];
  public stTime: any;
  public filter: Object;
  public filterSettings: Object;
  public editSettings: EditSettingsModel;
  public selectionSettings: Object;
  public lines: any;
  @ViewChild('normalgrid')
  public gridInstance: GridComponent;
  public normalgrid;
  public toolbar: Object[];
  public pageSettings: Object;
  apiName: string = "OutComeType";
  ngOnInit(): void {
    this.getExportTypes();
    this.editSettings = { showDeleteConfirmDialog: false  , allowAdding: true, allowEditing: true, allowEditOnDblClick: true, allowDeleting: true };
    this.toolbar = [
      { text: 'اضافة', tooltipText: 'اضافة', prefixIcon: 'e-add', id: 'normalgrid_add' },
      { text: 'تعديل', tooltipText: 'تعديل', prefixIcon: 'e-edit', id: 'normalgrid_edit' },
      { text: 'حذف', tooltipText: 'حذف', prefixIcon: 'e-delete', id: 'normalgrid_delete' },
      { text: 'حفظ', tooltipText: 'حفظ', prefixIcon: 'e-update', id: 'normalgrid_update' },
      { text: 'تراجع', tooltipText: 'تراجع', prefixIcon: 'e-cancel', id: 'normalgrid_cancel' },
      'Search']
    this.filterSettings = { type: "CheckBox" };
    this.filter = { type: "CheckBox" };
    this.stTime = performance.now();
    this.pageSettings = { pageCount: 5 };

    this.selectionSettings = {  type: "Multiple" };
    this.lines = 'Horizontal';


  }

  load() {
    const rowHeight: number = this.gridInstance.getRowHeight();  // height of the each row
    const gridHeight: any = this.gridInstance.height;  // grid height
    const pageSize: number = this.gridInstance.pageSettings.pageSize;   // initial page size
    const pageResize: any = (gridHeight - (pageSize * rowHeight)) / rowHeight; // new page size is obtained here
    this.gridInstance.pageSettings.pageSize = pageSize + Math.round(pageResize);
  }
  getExportTypes() {
    this.customService.getAll('OutComeType').subscribe(
      res => {
        this.exportTypes = res;
      }
    )
  }
  actionComplete(args: SaveEventArgs) {

    // if (args.action == 'add') {
    //   let obj: any = { name: args.data['name'] }
    //   this.customService.addOrUpdate('OutComeType', obj, 'add').subscribe(
    //     res => {

    //       this.notifications.create('success', 'تم اضافة نوع الصادرات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
    //       this.getExportTypes();

    //     }
    //   )
    // }
     if (args.action === "edit") {
      let obj: any = { id: Number.parseInt(args.data['id']), name: args.data['name'] }

      this.customService.addOrUpdate(this.apiName, obj, 'update').subscribe(
        res => {

          this.notifications.create('success', 'تم تعديل نوع الصادرات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
          // this.getExportTypes();
        }
      )
    }
    if (args.requestType == 'delete') {
      let id = args.data[0].id;
        this.customService.delete(this.apiName, id).subscribe(
          res => {
              this.notifications.create('success', 'تم حذف نوع الصادرات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 4000, showProgressBar: false });
              // this.getExportTypes();
          }
        ) 
    }
  }
  onActionBegin(args: ActionEventArgs) {
    if (args.action == "add") {
      if (args.requestType == "save") {
        let name = args.data["name"]
        if (args.data["name"] == ""||args.data["name"]==undefined) {
          this.notifications.create('', 'الأسم فارغ', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
          args.cancel = true;
        }
        else if (this.exportTypes.filter(c => c.name == name).length > 0) {
          this.notifications.create('', 'الاسم مكرر', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
          args.cancel = true;
        }
        else {
          let obj: any = { name: args.data['name'] }
          args.cancel = true;
          this.customService.addOrUpdate(this.apiName, obj, 'add').subscribe(
            res => {
              this.notifications.create('success', 'تم اضافة نوع صادرات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

              this.exportTypes.push(res);
              this.gridInstance.refresh();
            }
          )
        }
      }
    }
    if (args.action == "edit") {
      let name = args.data["name"].trim();
      var id = args.data["id"];
      if (name == "") {
        this.notifications.create('', 'الأسم فارغ', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
        args.cancel = true;
      }
      if (this.exportTypes.filter(c => c.name == name && c.id != id).length > 0) {
        this.notifications.create('', 'الاسم مكرر', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
        args.cancel = true;
      }
    }
    if (args.requestType == "delete") {
      let exportType = args.data[0];
      if (!exportType.canDelete) {
        this.notifications.create('', 'لا يمكن الحذف', NotificationType.Error, { timeOut: 6000, showProgressBar: false });
        args.cancel = true;
      }
    }
  }

}
