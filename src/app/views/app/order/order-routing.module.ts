import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrdersComponent } from './add-orders/add-orders.component';
import { EditOrdersComponent } from './edit-orders/edit-orders.component';
import { ViewNewOrderComponent } from './view-new-order/view-new-order.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';


const routes: Routes = [
  {
    path:'',
    component:ViewOrdersComponent
  },
  {
    path:'addorder',
    component:AddOrdersComponent
  },
  {
    path:'addMulitpleOutCome',
    component:AddOrdersComponent
  },
  {
    path:'editorder',
    component:EditOrdersComponent
  },
  {
    path:'neworders',
    component:ViewNewOrderComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
