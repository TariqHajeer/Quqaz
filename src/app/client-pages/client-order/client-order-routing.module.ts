import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddClientOrderComponent } from './add-client-order/add-client-order.component';
import { EditClientOrderComponent } from './edit-client-order/edit-client-order.component';
import { ShowClientOrderComponent } from './show-client-order/show-client-order.component';


const routes: Routes = [
  {
    path: '',
    component: ShowClientOrderComponent,
    pathMatch: 'full',
  },
  {
    path: 'addorder',
    component: AddClientOrderComponent,
    pathMatch: 'full',
  },
  {
    path: 'editorder',
    component: EditClientOrderComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientOrderRoutingModule { }
