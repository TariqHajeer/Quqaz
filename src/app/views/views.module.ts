import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewRoutingModule } from './views.routing';
import { SharedModule } from '../shared/shared.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { ComponentsCarouselModule } from 'src/app/components/carousel/components.carousel.module';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeadroomModule } from '@ctrl/ngx-headroom';
import { HomeComponent } from './home/home.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { AuthGuard } from '../shared/auth.guard';
import { NoconnectionComponent } from './noconnection/noconnection.component';
import { SearchOrderComponent } from './search-order/search-order.component';
import { FormsModule } from '@angular/forms';
import { ClientHomeComponent } from './client-home/client-home.component';
import { NavBarComponent } from './home/data/nav-bar/nav-bar.component';
import { HeaderComponent } from './home/data/header/header.component';
import { CardComponent } from './home/data/card/card.component';
import { FooterComponent } from './home/data/footer/footer.component';
@NgModule({
  declarations: [HomeComponent, NoconnectionComponent, SearchOrderComponent, ClientHomeComponent, NavBarComponent, HeaderComponent, CardComponent, FooterComponent],
  imports: [
    CommonModule,
    ViewRoutingModule,
    SharedModule,
    AngularFireAuthModule,  
    AngularFireAuthGuardModule,
    ComponentsCarouselModule,
    TabsModule.forRoot(),
    BrowserAnimationsModule,
    HeadroomModule,
    ScrollToModule.forRoot(),
    FormsModule,
  ],
  providers: [AuthGuard],
})
export class ViewsModule {}
