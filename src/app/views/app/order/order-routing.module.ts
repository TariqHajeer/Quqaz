import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { CreateMulitpleOrderComponent } from './create-mulitple-order/create-mulitple-order.component';
import { CreatemultipleOrderFromClientComponent } from './createmultiple-order-from-client/createmultiple-order-from-client.component';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';
import { OrderNotBeenFullyPaidComponent } from './order-not-been-fully-paid/order-not-been-fully-paid.component';
import { ProfitsOfOrdersComponent } from './profits-of-orders/profits-of-orders.component';
import { ViewNewOrderComponent } from './view-new-order/view-new-order.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';


const routes: Routes = [
  {
    path:'',
    component:ViewOrdersComponent ,canActivate: [AuthGuard],
  },
  {
    path:'addorder',
    component:AddOrdersComponent ,canActivate: [AuthGuard],
  },
  {
    path:'addMulitpleOrders',
    component:CreateMulitpleOrderComponent ,canActivate: [AuthGuard],
  },
  {
    path:'addMulitpleOrdersfromClient',
    component:CreatemultipleOrderFromClientComponent ,canActivate: [AuthGuard],
  },
  {
    path:'editorder',
    component:EditOrdersComponent ,canActivate: [AuthGuard],
  },
  {
    path:'neworders',
    component:ViewNewOrderComponent ,canActivate: [AuthGuard],
  },
  {
    path:'OrderNotBeenFullyPaid',
    component:OrderNotBeenFullyPaidComponent ,canActivate: [AuthGuard],
  },
  {
    path:'ProfitsOfOrders',
    component:ProfitsOfOrdersComponent ,canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
