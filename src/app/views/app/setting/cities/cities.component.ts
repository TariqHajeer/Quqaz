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
  city={name:'',DeliveryCost:0,regions:[]};
  constructor(private customService:CustomService,private notifications:NotificationsService) { }
  cities:any[]=[];
  tempRegion:any;
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
  currentId:any;
  currentMode='';
  ngOnInit(): void {
    this.getCities();
    this.editSettings = { showDeleteConfirmDialog: true, allowDeleting: true };
    this.toolbar = ['Search', 'Delete', 'Update', 'Cancel'];
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
  addRegionToCity(){
    if(!this.tempRegion){
      return;
    }
    this.city.regions.push(this.tempRegion);
    this.tempRegion='';
  }
  setCueerntCity(data){
    this.currentMode='edit'
  this.city={name:'',DeliveryCost:0,regions:[]};
    console.log(data);
    this.currentId=data.id
    this.city.name=data.name;
    // for(let item of data.regions){
    //   this.city.regions.push(item.name)
    // }
  }
  addCity(){
    console.log(this.city)
    if(!this.city.name){
      this.notifications.create('error', 'يجب اضافة الاسم', NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      return;
    }
    if(this.currentMode!='edit'){
      this.city.DeliveryCost = Number(this.city.DeliveryCost);
    this.customService.addOrUpdate('Country',this.city,'add').subscribe(
      res=>{
        console.log(res)
        this.notifications.create('success', 'تم اضافة مدينة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
          this.getCities();
  this.city={name:'',DeliveryCost:0,regions:[]};
  this.currentMode='';
    }
    )}
    else if(this.currentMode=='edit'){
      let obj:any={id:Number.parseInt(this.currentId),name:this.city.name}
      console.log(obj);
      this.customService.addOrUpdate('Country',obj,'update').subscribe(
        res=>{
          console.log(res)
          this.notifications.create('success', 'تم تعديل المدينة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
  this.city={name:'',DeliveryCost:0,regions:[]};
          this.getCities();
          this.currentMode='';
      }
      )
    }

  }
  deldetRegionFromCity(i){
    
    var city= this.city.regions.splice(i,1);
    console.log(city);
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
      console.log(obj)
        this.customService.addOrUpdate('Country',obj,'add').subscribe(
          res=>{
            console.log(res)
            if(res.result){
            this.notifications.create('success', 'تم اضافة مدينة بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
              this.getCities();
          }
        }
        )
    }
    else if (args.action === "edit") {

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
      console.log(res);
      this.cities=res;
      console.log(this.cities);
    }
  )
}
}
