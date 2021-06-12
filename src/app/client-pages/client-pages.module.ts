import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPagesRoutingModule } from './client-pages-routing.module';
import { ClientPagesComponent } from './client-pages.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [ClientPagesComponent, LoginComponent],
  imports: [
    CommonModule,
    ClientPagesRoutingModule
  ]
})
export class ClientPagesModule { }
