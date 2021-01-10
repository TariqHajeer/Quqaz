import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMoreIncomeComponent } from './add-more-income/add-more-income.component';
import { ViewIncomComponent } from './view-incom/view-incom.component';


const routes: Routes = [
  {
    path:'',
    component:ViewIncomComponent
  },
  {
    path:'addmoreincome',
    component:AddMoreIncomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeRoutingModule { }
