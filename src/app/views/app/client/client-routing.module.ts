import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { ViewClientsComponent } from './view-clients/view-clients.component';


const routes: Routes = [
  {path:'',
    component:ViewClientsComponent
  },
    {
      path:'addClient',
      component:AddClientComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
