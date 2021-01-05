import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CitiesComponent } from './cities/cities.component';
import { CoinsComponent } from './coins/coins.component';
import { DepartmentsComponent } from './departments/departments.component';
import { ExportsTypesComponent } from './exports-types/exports-types.component';
import { GroupsComponent } from './groups/groups.component';
import { ImportsTypesComponent } from './imports-types/imports-types.component';
import { RegionComponent } from './region/region.component';
import { ShipmentsTypesComponent } from './shipments-types/shipments-types.component';
const routes: Routes = [
  {
    path:'cities',
    component:CitiesComponent
  },
  {
    path:'regions',
    component:RegionComponent
  },
  {
    path:'departments',
    component:DepartmentsComponent
  },
  {
    path:'exportTypes',
    component:ExportsTypesComponent
  },
  {
    path:'importTypes',
    component:ImportsTypesComponent
  },
   {
    path:'shipmentsTypes',
    component:ShipmentsTypesComponent
  },
  {
    path:'coins',
    component:CoinsComponent
  },
  {
    path:'group',
    component:GroupsComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
