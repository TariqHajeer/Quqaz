import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientPagesComponent } from './client-pages.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: 'clienthome',
    component: ClientPagesComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',

  },
  {
    path: '',
    redirectTo: 'clienthome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientPagesRoutingModule { }
