import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { UserPermission } from 'src/app/shared/auth.roles';
import { AddClientComponent } from './add-client/add-client.component';
import { ClientPointComponent } from './client-point/client-point.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ReceiptAndExchangeComponent } from './receipt-and-exchange/receipt-and-exchange.component';
import { ViewClientsComponent } from './view-clients/view-clients.component';


const routes: Routes = [
  {path:'',
    component:ViewClientsComponent ,canActivate: [AuthGuard],
    data: { roles: [UserPermission.ShowClient,UserPermission.AddClient]}
  },
    {
      path:'addClient',
      component:AddClientComponent ,canActivate: [AuthGuard],
      data: { roles: [UserPermission.AddClient]}
    }
    ,
    {
      path:'edit/:id',
      component:EditClientComponent ,canActivate: [AuthGuard],
      data: { roles: [UserPermission.UpdateClient]}
    },
    {
      path:'ReceiptAndExchange',
      component:ReceiptAndExchangeComponent ,canActivate: [AuthGuard],
    },
    {
      path:'clientPoint',
      component:ClientPointComponent ,canActivate: [AuthGuard],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
