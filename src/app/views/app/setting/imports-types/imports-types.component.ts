import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, GridComponent, SaveEventArgs, ToolbarItem, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { CustomService } from 'src/app/services/custom.service';

@Component({
  selector: 'app-imports-types',
  templateUrl: './imports-types.component.html',
  styleUrls: ['./imports-types.component.scss']
})
export class ImportsTypesComponent implements OnInit {

  constructor(private customService: CustomService, private notifications: NotificationsService) { }
  importTypes: any[] = [];
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
    this.getImportTypes();
    this.editSettings = { showDeleteConfirmDialog: true, allowAdding: true,allowEditing:true,allowEditOnDblClick:true, allowDeleting: true };
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
  }

  load() {
    const rowHeight: number = this.gridInstance.getRowHeight();  // height of the each row
    const gridHeight: any = this.gridInstance.height;  // grid height
    const pageSize: number = this.gridInstance.pageSettings.pageSize;   // initial page size
    const pageResize: any = (gridHeight - (pageSize * rowHeight)) / rowHeight; // new page size is obtained here
    this.gridInstance.pageSettings.pageSize = pageSize + Math.round(pageResize);
  }
  getImportTypes() {
    this.customService.getAll('IncomeType').subscribe(
      res => {
        this.importTypes = res;
      }
    )
  }
  actionComplete(args: SaveEventArgs) {

    if (args.action == 'add') {
      let obj: any = { name: args.data['name'] }
      console.log(obj)
      this.customService.addOrUpdate('IncomeType', obj, 'add').subscribe(
        res => {
          console.log(res)
          this.notifications.create('success', 'تم اضافة نوع الواردات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
          this.getImportTypes();

        }
      )
    }
    else if (args.action === "edit") {
      let obj: any = { id: Number.parseInt(args.data['id']), name: args.data['name'] }
      console.log(obj)

      this.customService.addOrUpdate('IncomeType', obj, 'update').subscribe(
        res => {
          console.log(res)

          this.notifications.create('success', 'تم تعديل نوع الواردات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
          this.getImportTypes();
        }
      )
    }
    if (args.requestType == 'delete') {
      let id = args.data[0].id;
      if (args.data['CanDelete']) {
        this.customService.delete('IncomeType', id).subscribe(
          res => {
            this.notifications.create('success', 'تم حذف نوع الواردات بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 4000, showProgressBar: false });
            this.getImportTypes();
          }
        )
      }
      else {
        this.gridInstance.refresh();
      }

    }
  }

}
