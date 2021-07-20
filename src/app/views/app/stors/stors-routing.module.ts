import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { UserPermission } from 'src/app/shared/auth.roles';
import { AddStoreComponent } from './add-store/add-store.component';
import { EditStoreComponent } from './edit-store/edit-store.component';
import { ShowStoresComponent } from './show-stores/show-stores.component';


const routes: Routes = [
  {
    path:'',
    component:ShowStoresComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder,UserPermission.AddOrder]}
  },
  {
    path:'addstore',
    component:AddStoreComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddOrder]}
  },
  {
    path:'editstore/:id',
    component:EditStoreComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddOrder]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorsRoutingModule { }
