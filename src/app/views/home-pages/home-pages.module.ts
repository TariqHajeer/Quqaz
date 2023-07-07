import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePagesRoutingModule } from './home-pages-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePagesComponent } from './home-pages.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, HomePagesComponent],
  imports: [
    CommonModule,
    HomePagesRoutingModule
  ]
})
export class HomePagesModule { }
