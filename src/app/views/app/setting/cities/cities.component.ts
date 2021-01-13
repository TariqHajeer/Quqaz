import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionEventArgs, EditSettingsModel, GridComponent, IEditCell, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { City } from 'src/app/Models/Cities/city.Model';
import { CreateCity } from 'src/app/Models/Cities/create-city.Model';
import { CustomService } from '../../../../services/custom.service'

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  //city={name:'',deliveryCost:0,regions:[]};
  city = new CreateCity();
  constructor(private customService: CustomService, private notifications: NotificationsService) { }
  cities: City[] = [];
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
  currentId: any;
  currentMode = '';
  apiName: string = "Country"
  public numericParams: IEditCell;
  ngOnInit(): void {
    this.getCities();
    this.editSettings = { showDeleteConfirmDialog: false, allowAdding: false, allowEditing: true, allowEditOnDblClick: true, allowDeleting: true };
    this.toolbar = [
      { text: 'حذف', tooltipText: 'حذف', prefixIcon: 'e-delete', id: 'normalgrid_delete' },
      { text: 'تعديل', tooltipText: 'تعديل', prefixIcon: 'e-edit', id: 'normalgrid_edit' },
      { text: 'حفظ', tooltipText: 'حفظ', prefixIcon: 'e-update', id: 'normalgrid_update' },
      { text: 'تراجع', tooltipText: 'تراجع', prefixIcon: 'e-cancel', id: 'normalgrid_cancel' },
      'Search'
    ]
    this.filterSettings = { type: "CheckBox" };
    this.filter = { type: "CheckBox" };
    this.stTime = performance.now();
    this.pageSettings = { pageCount: 5 };
    this.numericParams = {
      params: {
        validateDecimalOnType: true,
        decimals: 1,
        format: 'N',
        min: 1,

      }
    };
    this.selectionSettings = { persistSelection: true, type: "Multiple" };
    this.lines = 'Horizontal';
  }
  addRegionToCity() {
    if (!this.tempRegion) {
      return;
    }
    this.city.regions.push(this.tempRegion);
    this.tempRegion = '';
  }
  setCueerntCity(data) {
    this.currentMode = 'edit'
    this.city = { name: '', deliveryCost: 0, regions: [] };
    this.currentId = data.id
    this.city.name = data.name;
    this.city.deliveryCost = Number(data.deliveryCost);

  }
  addCity() {
    if (!this.city.name) {
      this.notifications.create('error', 'يجب اضافة الاسم', NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      return;
    }

    if (this.currentMode != 'edit') {
      if (this.cities.filter(c => c.name == this.city.name).length != 0) {
        this.notifications.create("error", "الأسم موجود سابقاً", NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      }
      this.city.deliveryCost = Number(this.city.deliveryCost);
      this.customService.addOrUpdate(this.apiName, this.city, 'add').subscribe(
        res => {
          this.notifications.create('success', 'تم اضافة مدينة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
          this.city = { name: '', deliveryCost: 0, regions: [] };
          this.currentMode = '';
          this.cities.push(res);
          this.gridInstance.refresh();
        }
      )
    }
  }
  actionComplete(args: SaveEventArgs) {
    if (args.requestType == 'delete') {
      let id = args.data[0].id;
      this.customService.delete(this.apiName, id).subscribe(
        res => {
          this.notifications.create('', 'تم الحذف', NotificationType.Success, { theClass: 'success', timeOut: 4000, showProgressBar: false });
        }
      )

    }
  }
  onActionBegin(args: ActionEventArgs) {
    if (args.action == "edit") {
      let name = args.data["name"].trim();
      if (name == "") {
        this.notifications.create('', 'الأسم فارغ', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
        args.cancel = true;
      }

      if (this.cities.filter(c => c.name == name).length > 1) {
        this.notifications.create('', 'الاسم مكرر', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
        args.cancel = true;
      }
    }
    if (args.action == "edit") {
      let name = args.data["name"].trim();
      let id = args.data["id"];
      let deliveryCost = args.data["deliveryCost"];
      ////change
      ///change 2 
      if (this.cities.filter(c => c.name == name && c.id != id).length > 0) {
        this.notifications.create('', 'الاسم مكرر', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
        args.cancel = true;
      }
      else if (deliveryCost == "" || deliveryCost <= 0) {

        this.notifications.create('', 'خطأ في المبلغ', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
        args.cancel = true;
      }
      else {
        this.cities.filter(c => c.id == id)[0].name = name;
        this.customService.addOrUpdate(this.apiName, { name: name, deliveryCost: deliveryCost, id: id }, "update").subscribe();
        this.notifications.create('', 'تم تعديل المدينة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        args.cancel = true;
        this.gridInstance.refresh();
      }
    }
    if (args.requestType == "delete") {
      let city = args.data[0] as City;

      if (city.canDeleteWithRegion) {
        if (confirm("سوف يتم حذف المناطق الموجودة ضمن هذه المدينة")) {
        } else {
          args.cancel = true;
        }
      } else if (!city.canDelete) {
        this.notifications.create('', 'لا يمكن الحذف', NotificationType.Error, { timeOut: 6000, showProgressBar: false });
        args.cancel = true;
      }
    }
  }
  deldetRegionFromCity(i) {
    var city = this.city.regions.splice(i, 1);
  }
  load() {
    const rowHeight: number = this.gridInstance.getRowHeight();  // height of the each row
    const gridHeight: any = this.gridInstance.height;  // grid height
    const pageSize: number = this.gridInstance.pageSettings.pageSize;   // initial page size
    const pageResize: any = (gridHeight - (pageSize * rowHeight)) / rowHeight; // new page size is obtained here
    this.gridInstance.pageSettings.pageSize = pageSize + Math.round(pageResize);
  }
  getCities() {
    this.customService.getAll(this.apiName).subscribe(
      res => {
        this.cities = res;
      }
    )
  }

}
