import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { UserPermission } from 'src/app/shared/auth.roles';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { CreateMulitpleOrderComponent } from './create-mulitple-order/create-mulitple-order.component';
import { CreatemultipleOrderFromClientComponent } from './createmultiple-order-from-client/createmultiple-order-from-client.component';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';
import { ProfitsOfOrdersComponent } from './profits-of-orders/profits-of-orders.component';
import { ViewNewOrderComponent } from './view-new-order/view-new-order.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';


const routes: Routes = [
  {
    path:'',
    component:ViewOrdersComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder,UserPermission.AddOrder]}
  },
  {
    path:'addorder',
    component:AddOrdersComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddOrder]}
  },
  {
    path:'addMulitpleOrders',
    component:CreateMulitpleOrderComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddOrder]}
  },
  {
    path:'addMulitpleOrdersfromClient',
    component:CreatemultipleOrderFromClientComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.AddOrder]}
  },
  {
    path:'editorder',
    component:EditOrdersComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.UpdateOrder]}
  },
  {
    path:'neworders',
    component:ViewNewOrderComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder]}
  },
 
  {
    path:'ProfitsOfOrders',
    component:ProfitsOfOrdersComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowOrder]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
