import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionEventArgs, EditSettingsModel, GridComponent, IEditCell, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { City } from 'src/app/Models/Cities/city.Model';
import { CreateCity } from 'src/app/Models/Cities/create-city.Model';
import { PointSetting } from 'src/app/Models/pointSettings/point-setting.model';
import { PointSettingsService } from 'src/app/services/point-settings.service';
import { CustomService } from '../../../../services/custom.service'

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  city = new CreateCity();
  constructor(private customService: CustomService, private notifications: NotificationsService,
    private pointService: PointSettingsService,) { }
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
    this.Getpoints()
    this.editSettings = { showDeleteConfirmDialog: false, allowAdding: false };
    this.toolbar = [
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
    this.selectionSettings = { type: "Multiple" };
    this.lines = 'Horizontal';
  }
  onTrackBy(index) {
    return index;
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
    this.city = new CreateCity
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
      this.city.deliveryCost = this.city.deliveryCost ? Number(this.city.deliveryCost) * 1 : 0;
      this.city.points = this.city.points ? Number(this.city.points) * 1 : 0;
      this.customService.addOrUpdate(this.apiName, this.city, 'add').subscribe(
        res => {
          this.notifications.create('success', 'تم اضافة مدينة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
          this.city = new CreateCity
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
  editCity: CreateCity = new CreateCity
  edit(data) {
    var city = this.cities.find(c => c.id == data.id)
    this.editCity.id = city.id
    this.editCity.name = city.name
    this.editCity.mediatorId = city.mediator ? city.mediator.id : null
    this.editCity.deliveryCost = city.deliveryCost
    this.editCity.regions = city.regions
    this.editCity.points = city.points
  }
  delete(city) {
    if (city.canDeleteWithRegion) {
      if (confirm("سوف يتم حذف المناطق الموجودة ضمن هذه المدينة")) {
        this.customService.delete(this.apiName, city.id).subscribe(res => {
          this.notifications.create('', 'تم حذف المدينة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
          this.getCities()
        })
      }
    } else if (!city.canDelete) {
      this.notifications.create('', 'لا يمكن الحذف', NotificationType.Error, { timeOut: 6000, showProgressBar: false });
    }
    else {
      this.customService.delete(this.apiName, city.id).subscribe(res => {
        this.notifications.create('', 'تم حذف المدينة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        this.getCities()
      })
    }
  }
  save() {
    if (this.cities.filter(c => c.name == this.editCity.name && c.id != this.editCity.id).length > 0) {
      this.notifications.create('', 'الاسم مكرر', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
      return
    } else if (!this.editCity.name) {
      this.notifications.create('', 'الاسم حقل مطلوب', NotificationType.Warn, { timeOut: 6000, showProgressBar: false });
      return
    }
    else {
      this.editCity.deliveryCost = this.editCity.deliveryCost ? Number(this.editCity.deliveryCost) * 1 : 0;
      this.editCity.points = this.editCity.points ? Number(this.editCity.points) * 1 : 0;
      this.customService.addOrUpdate(this.apiName, this.editCity, "update").subscribe(res => {
        this.notifications.create('', 'تم تعديل المدينة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        this.editCity = new CreateCity
        this.gridInstance.refresh();
        this.getCities()
      });

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
  PointSettings: PointSetting[] = []
  Getpoints() {
    this.pointService.Get().subscribe(response => {
      this.PointSettings = response
    },
      err => {

      });
  }
}
