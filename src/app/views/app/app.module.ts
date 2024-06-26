import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutContainersModule } from 'src/app/containers/layout/layout.containers.module';
import { PdfExportService } from '@syncfusion/ej2-angular-grids';
import { UsersModule } from '../app/users/users.module';
import { OrderModule } from '../app/order/order.module';
import { ReportsModule } from '../app/reports/reports.module';
import { SpinnerComponent } from './spinner/spinner.component';
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

