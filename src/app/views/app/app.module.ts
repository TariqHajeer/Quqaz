import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from 'src/app/helpers/jwt.interceptor';
import { GridModule, ToolbarService, PdfExportService } from '@syncfusion/ej2-angular-grids';
import { UsersModule } from '../app/users/users.module';
import { OrderModule } from '../app/order/order.module';
import { ReportsModule } from '../app/reports/reports.module';
import { SpinnerComponent } from './spinner/spinner.component';
//////////
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AppComponent, SpinnerComponent,],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    LayoutContainersModule,
    UsersModule,
    OrderModule,
    ReportsModule,
    NgxSpinnerModule
    
  ],
  providers: [PdfExportService
  //  , { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports:[SpinnerComponent]
})
export class AppModule { }

