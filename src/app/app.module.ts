import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutContainersModule } from './containers/layout/layout.containers.module';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OnReturnDirective } from './helpers/on-return.directive';
import { TestComponent } from './test/test.component';
import { UTCDateDirective } from './directive/utcdate.directive';

@NgModule({
  imports: [
    BrowserModule,
    ViewsModule,
    AppRoutingModule,
    LayoutContainersModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    NgxSpinnerModule,
    SimpleNotificationsModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    OnReturnDirective,
    TestComponent,
    UTCDateDirective,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
  , schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [OnReturnDirective]
})
export class AppModule { }
