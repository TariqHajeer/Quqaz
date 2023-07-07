import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePagesComponent } from './home-pages.component';


const routes: Routes = [
  {
    path: '',
    component: HomePagesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePagesRoutingModule { }
