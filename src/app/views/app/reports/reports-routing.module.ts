import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { ClientOrderComponent } from './client-order/client-order.component';
import { ShipmentInStockComponent } from './shipment-in-stock/shipment-in-stock.component';


const routes: Routes = [
  {
    path:'ShipmentInStock',
    component: ShipmentInStockComponent,canActivate: [AuthGuard],
  },
  {
    path:'clientorder',
    component: ClientOrderComponent,canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
