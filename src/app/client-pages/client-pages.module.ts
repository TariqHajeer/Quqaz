import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientPagesRoutingModule } from './client-pages-routing.module';
import { ClientPagesComponent } from './client-pages.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { HeadroomModule } from '@ctrl/ngx-headroom';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ComponentsCarouselModule } from '../components/carousel/components.carousel.module';
import { AuthGuard } from '../shared/auth.guard';


@NgModule({
  declarations: [ClientPagesComponent, LoginComponent],
  imports: [
    CommonModule,
    ClientPagesRoutingModule,
    FormsModule,
    SharedModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    ComponentsCarouselModule,
    TabsModule.forRoot(),
    HeadroomModule,
    ScrollToModule.forRoot(),

  ], providers: [AuthGuard],

})
export class ClientPagesModule { }
