import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { UserPermission } from 'src/app/shared/auth.roles';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ShowAgentComponent } from './show-agent/show-agent.component';
import { ViewUserComponent } from './view-user/view-user.component';


const routes: Routes = [
  {
    path:'',
    component:ViewUserComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowUser,UserPermission.AddUser]}
  },
  {
    path:'edit/:id',
    component:EditUserComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.EditUser]}
  },
  {
    path:'showagent/:id',
    component:ShowAgentComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.EditUser]}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
