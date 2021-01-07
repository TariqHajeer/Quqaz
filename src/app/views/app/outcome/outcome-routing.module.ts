import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMoreOutcomeComponent } from './add-more-outcome/add-more-outcome.component';
import { ViewOutComeComponent } from './view-out-come/view-out-come.component';


const routes: Routes = [
  {
    path: '',
    component: ViewOutComeComponent,

  }, {
    path: 'addmore',
    component: AddMoreOutcomeComponent,

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutcomeRoutingModule { }
