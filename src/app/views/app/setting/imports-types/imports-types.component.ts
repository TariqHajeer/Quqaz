import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-imports-types',
  templateUrl: './imports-types.component.html',
  styleUrls: ['./imports-types.component.scss']
})
export class ImportsTypesComponent implements OnInit {

  constructor() { }
  importTypes:any[]=[{id:1,name:'النوع الأول'},{id:2,name:'النوع الثاني'},{id:3,name:'النوع الثالث'}];
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


}
