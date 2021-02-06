import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { AddMoreIncomeComponent } from './add-more-income/add-more-income.component';
import { ViewIncomComponent } from './view-incom/view-incom.component';


const routes: Routes = [
  {
    path:'',
    component:ViewIncomComponent ,canActivate: [AuthGuard],
  },
  {
    path:'addmoreincome',
    component:AddMoreIncomeComponent ,canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeRoutingModule { }
