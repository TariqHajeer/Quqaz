import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { UserPermission } from 'src/app/shared/auth.roles';
import { AddMoreIncomeComponent } from './add-more-income/add-more-income.component';
import { ViewIncomComponent } from './view-incom/view-incom.component';


const routes: Routes = [
  {
    path:'',
    component:ViewIncomComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowIncome,UserPermission.AddIncome]}
  },
  {
    path:'addmoreincome',
    component:AddMoreIncomeComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddIncome]}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeRoutingModule { }
