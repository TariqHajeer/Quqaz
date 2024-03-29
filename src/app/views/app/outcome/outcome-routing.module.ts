import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { UserPermission } from 'src/app/shared/auth.roles';
import { AddMoreOutcomeComponent } from './add-more-outcome/add-more-outcome.component';
import { ViewByIdComponent } from './view-by-id/view-by-id.component';
import { ViewOutComeComponent } from './view-out-come/view-out-come.component';


const routes: Routes = [
  {
    path: '',
    component: ViewOutComeComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOutCome,UserPermission.AddOutCome]}

  }, {
    path: 'addmore',
    component: AddMoreOutcomeComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddOutCome]}
  }
  , {
    path: 'view/:id',
    component: ViewByIdComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOutCome]}
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutcomeRoutingModule { }
