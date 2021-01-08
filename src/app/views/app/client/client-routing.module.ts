import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientComponent } from './add-client/add-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { ViewClientsComponent } from './view-clients/view-clients.component';


const routes: Routes = [
  {path:'',
    component:ViewClientsComponent
  },
    {
      path:'addClient',
      component:AddClientComponent
    }
    ,
    {
      path:'edit/:id',
      component:EditClientComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
