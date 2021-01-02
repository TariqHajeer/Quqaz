import { Component, OnInit, ViewChild } from '@angular/core';
import { EditSettingsModel, GridComponent, SaveEventArgs, ToolbarItems } from '@syncfusion/ej2-angular-grids';
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
  ngOnInit(): void {
    this.getCities();
    this.editSettings = {allowDeleting: true };
    this.toolbar = [
      { text: 'حذف', tooltipText: 'حذف', prefixIcon: 'e-delete', id: 'normalgrid_delete' },'Search'
      ]
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
    // for(let item of data.regions){
    //   this.city.regions.push(item.name)
    // }
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
      this.customService.addOrUpdate('Country', this.city, 'add').subscribe(
        res => {
          this.notifications.create('success', 'تم اضافة مدينة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
          this.getCities();
          this.city = { name: '', deliveryCost: 0, regions: [] };
          this.currentMode = '';
        }
      )
    }
    else if (this.currentMode == 'edit') {
      let obj: any = { id: Number.parseInt(this.currentId), name: this.city.name, deliveryCost: Number(this.city.deliveryCost) }
      this.customService.addOrUpdate('Country', obj, 'update').subscribe(
        res => {
          this.notifications.create('success', 'تم تعديل المدينة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
          this.city = { name: '', deliveryCost: 0, regions: [] };
          this.getCities();
          this.currentMode = '';
        }
      )
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
  actionComplete(args: SaveEventArgs) {

    if (args.action == 'add') {
      let obj: any = { name: args.data['name'] }
      this.customService.addOrUpdate('Country', obj, 'add').subscribe(
        res => {
          if (res.result) {
            this.notifications.create('success', 'تم اضافة مدينة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
            this.getCities();
          }
        }
      )
    }
    else if (args.action === "edit") {

    }
    console.log(args);
    if (args.requestType == 'delete') {
      let id = args.data[0].id;
      console.log(args.data[0]);
      if (args.data['canDelete']||args.data["canDeleteWithRegion"]) {
        this.customService.delete('Country', id).subscribe(
          res => {
            if (res.result) {
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
  getCities() {
    this.customService.getAll('Country').subscribe(
      res => {
        this.cities = res;
        console.log(this.cities);
      }
    )
  }
}
