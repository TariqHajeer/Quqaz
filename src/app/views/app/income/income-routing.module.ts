import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewIncomComponent } from './view-incom/view-incom.component';


const routes: Routes = [
  {
    path:'',
    component:ViewIncomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeRoutingModule { }
