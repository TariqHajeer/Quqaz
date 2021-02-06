import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { AddMoreOutcomeComponent } from './add-more-outcome/add-more-outcome.component';
import { ViewOutComeComponent } from './view-out-come/view-out-come.component';


const routes: Routes = [
  {
    path: '',
    component: ViewOutComeComponent,canActivate: [AuthGuard],

  }, {
    path: 'addmore',
    component: AddMoreOutcomeComponent ,canActivate: [AuthGuard],

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutcomeRoutingModule { }
