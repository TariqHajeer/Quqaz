import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { UserPermission } from 'src/app/shared/auth.roles';
import { PaymentRequestsComponent } from './payment-requests/payment-requests.component';
import { PaymentComponent } from './payment.component';


const routes: Routes = [
  {
    path:'',
    component:PaymentComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder,UserPermission.AddOrder]}
  },
  {
    path:'paymentrequest',
    component:PaymentRequestsComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder,UserPermission.AddOrder]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
