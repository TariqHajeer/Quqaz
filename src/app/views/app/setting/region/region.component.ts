import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionEventArgs, EditSettingsModel, GridComponent, IEditCell, SaveEventArgs, toogleCheckbox, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { City } from 'src/app/Models/Cities/city.Model';
import { CustomService } from 'src/app/services/custom.service';
import { Region } from '../../../../Models/Regions/region.model';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.scss']
})
export class RegionComponent implements OnInit {
  constructor(private customService: CustomService, private notifications: NotificationsService) { }
  regions: Region[] = [];
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
  public citiesParameter: IEditCell;
  apiName: string = "Region";
  countryapi = "Country";
  cities: any[] = []
  name: string
  countryId: number
  ngOnInit(): void {
    this.getRegions();
    this.getCities();
    this.editSettings = { showDeleteConfirmDialog: false, allowAdding: true, allowEditing: true, allowEditOnDblClick: true, allowDeleting: true };
    this.toolbar = [
      // { text: 'اضافة', tooltipText: 'اضافة', prefixIcon: 'e-add', id: 'normalgrid_add' },
      { text: 'تعديل', tooltipText: 'تعديل', prefixIcon: 'e-edit', id: 'normalgrid_edit' },
      { text: 'حذف', tooltipText: 'حذف', prefixIcon: 'e-delete', id: 'normalgrid_delete' },
      { text: 'حفظ', tooltipText: 'حفظ', prefixIcon: 'e-update', id: 'normalgrid_update' },
      { text: 'تراجع', tooltipText: 'تراجع', prefixIcon: 'e-cancel', id: 'normalgrid_cancel' },
      'Search']
    this.filterSettings = { type: "CheckBox" };
    this.filter = { type: "CheckBox" };
    this.stTime = performance.now();
    this.pageSettings = { pageCount: 5 };
    this.selectionSettings = { type: "Multiple" };
    this.lines = 'Horizontal';
    this.citiesParameter = {
      params: {
        allowFiltering: true,
        dataSource: new DataManager({
          url: this.countryapi,
          headers: [{ 'Authorization': 'Bearer ' + localStorage.getItem('token') }],
        },
        ),
        fields: { text: 'name', value: 'id' },
        actionComplete: () => false
      }
    };
  }
  actionComplete(args: SaveEventArgs) {

    if (args.action === "edit") {

      args.cancel = true;
      let obj: any = { id: Number.parseInt(args.data['id']), name: args.data['name'] }
      this.customService.addOrUpdate(this.apiName, obj, 'update').subscribe(
        res => {
          this.notifications.create('success', 'تم تعديل  المنطقة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

        }
      )

    }
    if (args.requestType == 'delete') {
      let id = args.data[0].id;
      this.customService.delete(this.apiName, id).subscribe(
        res => {
          this.notifications.create('success', 'تم حذف المنطقة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 4000, showProgressBar: false });

        }
      )

    }
  }
  addRegion() {
    if (!this.name) {
      this.notifications.create('', 'الأسم فارغ', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
      return
    }

    if (!this.countryId) {
      this.notifications.create('', 'يجب اختيار المدينة', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
      return
    }
    if (this.regions.filter(c => c.name == this.name && c.country.id == this.countryId).length != 0) {
      this.notifications.create('', 'الاسم مكرر', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
      return
    } else {
      this.customService.Create(this.apiName, { name: this.name, countryId: this.countryId }).toPromise().then(res => {
        this.notifications.create('', 'تم اضافة المنطقة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        this.regions.push(res);
        this.gridInstance.refresh();
        this.name = null;
        this.countryId = null;
      });
    }
  }
  onActionBegin(args: ActionEventArgs) {
    if (args.action == 'add') {
      if (args.requestType == "save") {
        if (args.data['name'] == undefined || args.data['name'] == "") {
          this.notifications.create('', 'الأسم فارغ', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
          args.cancel = true;
        }

        let name = args.data["name"].trim();
        let countryId = args.data['country']['name'];
        if (countryId == null) {
          args.cancel = true;
          this.notifications.create('', 'يجب اختيار المدينة', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
        }
        if (this.regions.filter(c => c.name == name && c.country.id == countryId).length != 0) {
          this.notifications.create('', 'الاسم مكرر', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
          args.cancel = true;
        } else {
          args.cancel = true;
          this.customService.Create(this.apiName, { name: name, countryId: countryId }).toPromise().then(res => {
            this.notifications.create('', 'تم اضافة المنطقة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
            this.regions.push(res);
            this.gridInstance.refresh();
          });
        }
      }
    }
    if (args.action == "edit") {
      let name = args.data["name"].trim();
      var id = args.data["id"];
      if (name == "") {
        this.notifications.create('', 'الأسم فارغ', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
        args.cancel = true;
      } let countryId = args.data['country']['id'];
      if (this.regions.filter(c => c.name == name && c.country.id != countryId).length != 0) {
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
  load() {
    const rowHeight: number = this.gridInstance.getRowHeight();  // height of the each row
    const gridHeight: any = this.gridInstance.height;  // grid height
    const pageSize: number = this.gridInstance.pageSettings.pageSize;   // initial page size
    const pageResize: any = (gridHeight - (pageSize * rowHeight)) / rowHeight; // new page size is obtained here
    this.gridInstance.pageSettings.pageSize = pageSize + Math.round(pageResize);
  }

  getRegions() {
    this.customService.getAll('Region').subscribe(
      res => {
        this.regions = res;
      }
    )
  }
  getCities() {
    this.customService.getAll(this.countryapi).subscribe(
      res => {
        this.cities = res;
      }
    )
  }
}
