import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { UserPermission } from 'src/app/shared/auth.roles';
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
    component:CoinsComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddClient,UserPermission.AddCountry]}
  },
  {
    path:'group',
    component:GroupsComponent ,
    canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddGroup,UserPermission.ShowGroup]}
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
