import { NgModule } from '@angular/core';
import { StartComponent } from './start/start.component';
import { HomePageComponent } from './homePage.component';
import { HomePageRoutingModule } from './homePage.routing';

@NgModule({
  declarations: [HomePageComponent, StartComponent],
  imports: [
 
    HomePageRoutingModule
  ]
})
export class HomePageModule { }
