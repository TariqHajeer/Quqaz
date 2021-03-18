import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { UserPermission } from 'src/app/shared/auth.roles';
import { ClientOrderComponent } from './client-order/client-order.component';
import { AgentComponent } from './printpreview/agent/agent.component';
import { ClientComponent } from './printpreview/client/client.component';
import { SetPrintNumberClientComponent } from './printpreview/set-print-number-client/set-print-number-client.component';
import { SetPrintNumberComponent } from './printpreview/set-print-number/set-print-number.component';
import { ReceiptShipmentAgentComponent } from './receipt-shipment-agent/receipt-shipment-agent.component';
import { ShipmentInStockComponent } from './shipment-in-stock/shipment-in-stock.component';
import { ShipmentsNotBeenDeliveredComponent } from './shipments-not-been-delivered/shipments-not-been-delivered.component';
import { ShipmentsOnWayComponent } from './shipments-on-way/shipments-on-way.component';


const routes: Routes = [
  {
    path:'ShipmentInStock',
    component: ShipmentInStockComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'Shipmentonway',
    component: ShipmentsOnWayComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'clientorder',
    component: ClientOrderComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  
  
  {
    path:'Shipmentsnotbeendelivered',
    component: ShipmentsNotBeenDeliveredComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'ReceiptShipmentAgentComponent',
    component: ReceiptShipmentAgentComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'printagentpreview',
    component: AgentComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'printclientpreview',
    component: ClientComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'printsetprintnumberagentpreview',
    component: SetPrintNumberComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'printsetprintnumberclientpreview',
    component: SetPrintNumberClientComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
