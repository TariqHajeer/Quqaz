import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientPagesComponent } from './client-pages.component';
import { ClienthomeComponent } from './clienthome/clienthome.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { ShowOrdersComponent } from './show-orders/show-orders.component';


const routes: Routes = [
  {
    path: '',
    component: ClientPagesComponent,
    children:[
      {
        path: '',
        component: ClienthomeComponent,
        pathMatch: 'full',
      },
      { path: 'orders', 
      loadChildren: () => import('./client-order/client-order.module')
      .then(m => m.ClientOrderModule) },
      
      // {
      //   path: 'orders',
      //   component: ShowOrdersComponent,
      //   pathMatch: 'full',
      // },
    
     
      // {
      //   path: '',
      //   redirectTo: 'clienthome',
      //   pathMatch: 'full'
      // }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPagesRoutingModule { }
