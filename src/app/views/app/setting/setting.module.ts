import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';

import { GridAllModule, GridModule } from '@syncfusion/ej2-angular-grids';
import { TranslateModule } from '@ngx-translate/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CitiesComponent } from './cities/cities.component';
import { DepartmentsComponent } from './departments/departments.component';
import { ImportsTypesComponent } from './imports-types/imports-types.component';
import { ExportsTypesComponent } from './exports-types/exports-types.component';
import { ShipmentsTypesComponent } from './shipments-types/shipments-types.component';
import { CoinsComponent } from './coins/coins.component';
import { RegionComponent } from './region/region.component';
import { GroupsComponent } from './groups/groups.component';


@NgModule({
  declarations: [ CitiesComponent, DepartmentsComponent, ImportsTypesComponent, ExportsTypesComponent, ShipmentsTypesComponent, CoinsComponent, RegionComponent, GroupsComponent],
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

  ]
})
export class SettingModule { }
