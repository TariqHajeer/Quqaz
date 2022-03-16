import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { UserPermission } from 'src/app/shared/auth.roles';
import { CitiesComponent } from './cities/cities.component';
import { DepartmentsComponent } from './departments/departments.component';
import { ExportsTypesComponent } from './exports-types/exports-types.component';
import { GroupsComponent } from './groups/groups.component';
import { ImportsTypesComponent } from './imports-types/imports-types.component';
import { MainCityComponent } from './main-city/main-city.component';
import { PointSettingComponent } from './point-setting/point-setting.component';
import { RegionComponent } from './region/region.component';
import { ShipmentsTypesComponent } from './shipments-types/shipments-types.component';
const routes: Routes = [
  {
    path:'cities',
    component:CitiesComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowCountry,UserPermission.AddCountry]}
  },
  {
    path:'regions',
    component:RegionComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowRegion,UserPermission.AddRegion]}
  },
  {
    path:'exportTypes',
    component:ExportsTypesComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOutComeType,UserPermission.AddOutComeType]}
  },
  {
    path:'importTypes',
    component:ImportsTypesComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowIncomeType,UserPermission.AddIncomeType]}
  },
   {
    path:'shipmentsTypes',
    component:ShipmentsTypesComponent,
    canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrderType,UserPermission.AddOrderType]}
  },
  {
    path:'group',
    component:GroupsComponent ,
    canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddGroup,UserPermission.ShowGroup]}
  },
  {
    path:'maincity',
    component:MainCityComponent ,
    canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddGroup,UserPermission.ShowGroup]}
  },
  {
    path:'pointsetting',
    component:PointSettingComponent ,
    canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddGroup,UserPermission.ShowGroup]}
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
