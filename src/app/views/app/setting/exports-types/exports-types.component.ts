import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, GridComponent, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
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
  public toolbar: Object[];
  public pageSettings: Object;

  ngOnInit(): void {

    this.getExportTypes();
    this.editSettings = { showDeleteConfirmDialog: true, allowAdding: true, allowEditing: true, allowEditOnDblClick: true, allowDeleting: true };
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
    this.gridInstance.on('data-ready', function () {
      this.dReady = true;
    });
    this.selectionSettings = { persistSelection: true, type: "Multiple" };
    this.lines = 'Horizontal';
    console.log(this.gridInstance.localeObj)
    console.log('////////')


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
        console.log(this.exportTypes)
      }
    )
  }
  actionComplete(args: SaveEventArgs) {
    console.log(args);

    if (args.action == 'add') {
      let obj: any = { name: args.data['name'] }
      console.log(obj)
      this.customService.addOrUpdate('OutComeType', obj, 'add').subscribe(
        res => {
          console.log(res)
          this.notifications.create('success', 'تم اضافة نوع الصادرات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
          this.getExportTypes();

        }
      )
    }
    else if (args.action === "edit") {
      let obj: any = { id: Number.parseInt(args.data['id']), name: args.data['name'] }
      console.log(obj)

      this.customService.addOrUpdate('OutComeType', obj, 'update').subscribe(
        res => {
          console.log(res)

          this.notifications.create('success', 'تم تعديل نوع الصادرات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
          this.getExportTypes();
        }
      )
    }
    if (args.requestType == 'delete') {
      let id = args.data[0].id;
      if (args.data['CanDelete']) {
        this.customService.delete('OutComeType', id).subscribe(
          res => {
            if (res.result) {
              this.notifications.create('success', 'تم حذف نوع الصادرات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 4000, showProgressBar: false });
              this.getExportTypes();
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
