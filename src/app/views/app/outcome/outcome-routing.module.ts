import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewOutComeComponent } from './view-out-come/view-out-come.component';


const routes: Routes = [
  {
    path:'',
    component:ViewOutComeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutcomeRoutingModule { }
