import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPagesRoutingModule } from './client-pages-routing.module';
import { ClientPagesComponent } from './client-pages.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClientPagesComponent, LoginComponent],
  imports: [
    CommonModule,
    ClientPagesRoutingModule,
    FormsModule,

  ]
})
export class ClientPagesModule { }
