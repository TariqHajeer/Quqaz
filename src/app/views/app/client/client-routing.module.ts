import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/auth.guard';
import { AddClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ViewClientsComponent } from './view-clients/view-clients.component';


const routes: Routes = [
  {path:'',
    component:ViewClientsComponent ,canActivate: [AuthGuard],
  },
    {
      path:'addClient',
      component:AddClientComponent ,canActivate: [AuthGuard],
    }
    ,
    {
      path:'edit/:id',
      component:EditClientComponent ,canActivate: [AuthGuard],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
