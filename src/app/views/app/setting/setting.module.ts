import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';

import { GridAllModule, GridModule, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { TranslateModule } from '@ngx-translate/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CitiesComponent } from './cities/cities.component';
import { ImportsTypesComponent } from './imports-types/imports-types.component';
import { ExportsTypesComponent } from './exports-types/exports-types.component';
import { ShipmentsTypesComponent } from './shipments-types/shipments-types.component';
import { RegionComponent } from './region/region.component';
import { GroupsComponent } from './groups/groups.component';
import { MainCityComponent } from './main-city/main-city.component';
import { PointSettingComponent } from './point-setting/point-setting.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DatePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgxPrintModule } from 'ngx-print';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [ CitiesComponent, ImportsTypesComponent, ExportsTypesComponent, ShipmentsTypesComponent, RegionComponent, GroupsComponent, MainCityComponent, PointSettingComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    GridAllModule,
    GridModule,
    TranslateModule,
    SimpleNotificationsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    ModalModule.forRoot(),
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    NgxPrintModule,
    DatePickerModule,
    DateRangePickerModule,
    NgxSpinnerModule,

  ],
  providers: [ToolbarService]

})
export class SettingModule { }
