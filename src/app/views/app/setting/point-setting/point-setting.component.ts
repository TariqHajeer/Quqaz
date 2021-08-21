import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { PointSettingsService } from 'src/app/services/point-settings.service';
import { PointSetting } from 'src/app/Models/pointSettings/point-setting.model'
import { CreatePointSetting } from 'src/app/Models/pointSettings/create-point-setting.model'

@Component({
  selector: 'app-point-setting',
  templateUrl: './point-setting.component.html',
  styleUrls: ['./point-setting.component.scss']
})
export class PointSettingComponent implements OnInit {

  displayedColumns: string[] = ['index', 'points', 'money','delete'];
  dataSource = new MatTableDataSource([]);
  selection = new SelectionModel<any>(true, []);


  constructor(
    private pointService: PointSettingsService,
    private notifications: NotificationsService,
    public route: Router
  ) { }
  noDataFound: boolean = false
  ngOnInit(): void {
    this.Get()
  }

  PointSettings: PointSetting[] = []
  PointSetting: CreatePointSetting = new CreatePointSetting
  Get() {
    this.pointService.Get().subscribe(response => {
      // console.log(response)
      if (response)
        if (response.length == 0)
          this.noDataFound = true
        else this.noDataFound = false
      this.PointSettings = response
      this.dataSource = new MatTableDataSource(this.PointSettings)
    },
      err => {

      });
  }

  Add() {
    if (!this.PointSetting.Money || !this.PointSetting.Points) {
      this.notifications.create('error', 'يجب ادخال جميع الحقول', NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
      return
    } else {
      if(this.validate())return
      this.PointSetting.Points = this.PointSetting.Points * 1
      this.PointSetting.Money = this.PointSetting.Money * 1
      this.pointService.Add(this.PointSetting).subscribe(res => {
        this.notifications.create('success', 'تمت الاضافة  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });
        this.Get()
        this.PointSetting=new CreatePointSetting()
      })
    }

  }
  validate(){
    var points=this.PointSettings.filter(p=>p.points==this.PointSetting.Points).length>0
    if(points){
      this.notifications.create('error', 'النقاط مضافة مسبقا', NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
    }
    var money=this.PointSettings.filter(p=>p.money==this.PointSetting.Money).length>0
    if(money){
      this.notifications.create('error', 'المبلغ مضاف مسبقا', NotificationType.Error, { theClass: 'error', timeOut: 6000, showProgressBar: false });
    }
    if(points||money)return true
    else return false
  }
  Delete(id) {
    this.pointService.delete(id).subscribe(res => {
      this.Get()
      this.notifications.create('success', 'تم الحذف  بنجاح', NotificationType.Success, { theClass: 'success', timeOut: 6000, showProgressBar: false });

    })
  }
}
