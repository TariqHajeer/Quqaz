import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { UserPermission } from 'src/app/shared/auth.roles';
import { AgentOrderStateComponent } from './agent-order-state/agent-order-state.component';
import { AgentOrdersLastTimeComponent } from './agent-orders-last-time/agent-orders-last-time.component';
import { AgentPrintComponent } from './agent-print/agent-print.component';
import { AgentStatisticsComponent } from './agent-statistics/agent-statistics.component';
import { ChangeAgentByOrdersComponent } from './change-agent-by-orders/change-agent-by-orders.component';
import { ClientOrderComponent } from './client-order/client-order.component';
import { ClientPrintComponent } from './client-print/client-print.component';
import { OrderInCompanyComponent } from './order-in-company/order-in-company.component';
import { OrderVicdanAgentComponent } from './order-vicdan-agent/order-vicdan-agent.component';
import { OrdersTodayComponent } from './orders-today/orders-today.component';
import { OrdersUnacceptableComponent } from './orders-unacceptable/orders-unacceptable.component';
import { ReceiptAgentComponent } from './print/receipt-agent/receipt-agent.component';
import { AgentComponent } from './printpreview/agent/agent.component';
import { ClientComponent } from './printpreview/client/client.component';
import { PayComponent } from './printpreview/pay/pay.component';
import { PrintOrderInCompanyComponent } from './printpreview/print-order-in-company/print-order-in-company.component';
import { SetPrintNumberClientComponent } from './printpreview/set-print-number-client/set-print-number-client.component';
import { SetPrintNumberComponent } from './printpreview/set-print-number/set-print-number.component';
import { ReceiptShipmentAgentComponent } from './receipt-shipment-agent/receipt-shipment-agent.component';
import { ReceiptsAndExchangesComponent } from './receipts-and-exchanges/receipts-and-exchanges.component';
import { ShipmentInStockComponent } from './shipment-in-stock/shipment-in-stock.component';
import { ShipmentsNotBeenDeliveredComponent } from './shipments-not-been-delivered/shipments-not-been-delivered.component';
import { ShipmentsOnWayComponent } from './shipments-on-way/shipments-on-way.component';
import { StatisticsComponent } from './statistics/statistics.component';


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
    path:'agentprintnumber/:printnumber',
    component: SetPrintNumberComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'clientprintnumber/:printnumber',
    component: SetPrintNumberClientComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'Statistics',
    component: StatisticsComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'AgentStatistics',
    component: AgentStatisticsComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'pay',
    component: PayComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'test',
    component: ReceiptAgentComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'OrderVicdanAgent',
    component: OrderVicdanAgentComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'agentprint',
    component: AgentPrintComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'clientprint',
    component: ClientPrintComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'receiptsandexchanges',
    component: ReceiptsAndExchangesComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'orderincompany',
    component: OrderInCompanyComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'printorderincompany',
    component: PrintOrderInCompanyComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'orderstoday',
    component: OrdersTodayComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'ordersUnacceptable',
    component: OrdersUnacceptableComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'changeagentbyorders',
    component: ChangeAgentByOrdersComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'agentOrderstaterequests',
    component: AgentOrderStateComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
  {
    path:'agentOrdersLastTime',
    component: AgentOrdersLastTimeComponent,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowReports]}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
