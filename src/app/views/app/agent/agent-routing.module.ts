import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { AgentOrdersReportComponent } from './agent-orders-report/agent-orders-report.component';
import { AgentOrdersComponent } from './agent-orders/agent-orders.component';
import { AgentPrintComponent } from './agent-print/agent-print.component';
import { AgenthomeComponent } from './agenthome/agenthome.component';
import { OrderByCodeComponent } from './order-by-code/order-by-code.component';
import { OrderInStockComponent } from './order-in-stock/order-in-stock.component';
import { OrderSuspendedComponent } from './order-suspended/order-suspended.component';
import { OrdersOnWayComponent } from './orders-on-way/orders-on-way.component';
import { OwedOrderComponent } from './owed-order/owed-order.component';
import { ShowReportComponent } from './show-report/show-report.component';


const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full'  ,canActivate: [AuthGuard],},
  { path: 'start', component: AgenthomeComponent, canActivate: [AuthGuard], },
  { path: 'orders', component: AgentOrdersComponent, canActivate: [AuthGuard], },
  { path: 'instock', component: OrderInStockComponent, canActivate: [AuthGuard], },
  { path: 'owed', component: OwedOrderComponent, canActivate: [AuthGuard], },
  { path: 'onway', component: OrdersOnWayComponent, canActivate: [AuthGuard], },
  { path: 'Suspended', component: OrderSuspendedComponent, canActivate: [AuthGuard], },
  { path: 'Report', component: AgentOrdersReportComponent, canActivate: [AuthGuard], },
  { path: 'showReport/:id', component: ShowReportComponent, canActivate: [AuthGuard], },
  { path: 'bycode', component: OrderByCodeComponent, canActivate: [AuthGuard], },
  { path: 'agentprint', component: AgentPrintComponent, canActivate: [AuthGuard], },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
