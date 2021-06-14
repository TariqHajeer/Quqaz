import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ComponentsStateButtonModule } from '../components/state-button/components.state-button.module';
import { ShowOrdersComponent } from './show-orders/show-orders.component';
import { HeaderComponent } from './shared/header/header.component';
import { ClienthomeComponent } from './clienthome/clienthome.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ClientProfileComponent } from './client-profile/client-profile.component';


@NgModule({
  declarations: [ClientPagesComponent, LoginComponent, ShowOrdersComponent, HeaderComponent, ClienthomeComponent, NavbarComponent, ClientProfileComponent],
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
    SimpleNotificationsModule.forRoot(),
    ComponentsStateButtonModule

  ], providers: [AuthGuard],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports:[HeaderComponent]

})
export class ClientPagesModule { }
