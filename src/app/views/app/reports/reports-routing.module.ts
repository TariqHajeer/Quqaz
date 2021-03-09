import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { ClientInsideCompanyComponent } from './client-inside-company/client-inside-company.component';
import { ClientOrderComponent } from './client-order/client-order.component';
import { ReceiptAgentComponent } from './print/receipt-agent/receipt-agent.component';
import { ReceiptClientComponent } from './print/receipt-client/receipt-client.component';
import { ReceiptSetPrintNumberComponent } from './print/receipt-set-print-number/receipt-set-print-number.component';
import { AgentComponent } from './printpreview/agent/agent.component';
import { ClientComponent } from './printpreview/client/client.component';
import { SetPrintNumberComponent } from './printpreview/set-print-number/set-print-number.component';
import { ReceiptShipmentAgentComponent } from './receipt-shipment-agent/receipt-shipment-agent.component';
import { ShipmentInStockComponent } from './shipment-in-stock/shipment-in-stock.component';
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
    path:'printagentpreview',
    component: AgentComponent,canActivate: [AuthGuard],
  },
  {
    path:'printclientpreview',
    component: ClientComponent,canActivate: [AuthGuard],
  },
  {
    path:'printsetprintnumberpreview',
    component: SetPrintNumberComponent,canActivate: [AuthGuard],
  },
  {
    path:'printnumber',
    component: ReceiptSetPrintNumberComponent,canActivate: [AuthGuard],
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
