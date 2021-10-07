import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { AgentOrdersComponent } from './agent-orders/agent-orders.component';
import { AgenthomeComponent } from './agenthome/agenthome.component';


const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full'  ,canActivate: [AuthGuard],},
  { path: 'start', component: AgenthomeComponent, canActivate: [AuthGuard], },
  { path: 'orders', component: AgentOrdersComponent, canActivate: [AuthGuard], },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
