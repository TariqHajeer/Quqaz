import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { ClientInsideCompanyComponent } from './client-inside-company/client-inside-company.component';
import { ClientOrderComponent } from './client-order/client-order.component';
import { ReceiptAgentComponent } from './print/receipt-agent/receipt-agent.component';
import { ReceiptShipmentAgentComponent } from './receipt-shipment-agent/receipt-shipment-agent.component';
import { ShipmentInStockComponent } from './shipment-in-stock/shipment-in-stock.component';
import { ShipmentsClientOnWayComponent } from './shipments-client-on-way/shipments-client-on-way.component';
import { ShipmentsNotBeenDeliveredComponent } from './shipments-not-been-delivered/shipments-not-been-delivered.component';
import { ShipmentsOnWayComponent } from './shipments-on-way/shipments-on-way.component';


const routes: Routes = [
  {
    path:'ShipmentInStock',
    component: ShipmentInStockComponent,canActivate: [AuthGuard],
  },
  {
    path:'Shipmentonway',
    component: ShipmentsOnWayComponent,canActivate: [AuthGuard],
  },
  {
    path:'clientorder',
    component: ClientOrderComponent,canActivate: [AuthGuard],
  },
  {
    path:'clientorderonway',
    component: ShipmentsClientOnWayComponent,canActivate: [AuthGuard],
  },
  {
    path:'clientinsidecompany',
    component: ClientInsideCompanyComponent,canActivate: [AuthGuard],
  },
  {
    path:'Shipmentsnotbeendelivered',
    component: ShipmentsNotBeenDeliveredComponent,canActivate: [AuthGuard],
  },
  {
    path:'ReceiptShipmentAgentComponent',
    component: ReceiptShipmentAgentComponent,canActivate: [AuthGuard],
  },
  {
    path:'print',
    component: ReceiptAgentComponent,canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
