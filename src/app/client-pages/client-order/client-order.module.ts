import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientOrderRoutingModule } from './client-order-routing.module';
import { ShowClientOrderComponent } from './show-client-order/show-client-order.component';
import { AddClientOrderComponent } from './add-client-order/add-client-order.component';
import { EditClientOrderComponent } from './edit-client-order/edit-client-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { GridModule, GridAllModule } from '@syncfusion/ej2-angular-grids';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPrintModule } from 'ngx-print';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [ShowClientOrderComponent,
     AddClientOrderComponent,
      EditClientOrderComponent,
    ],
  imports: [
    CommonModule,
    ClientOrderRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule,
    GridModule,
    GridAllModule,
    NgxPrintModule,
    SimpleNotificationsModule.forRoot(),
    ChartModule,
    DatePickerModule,
    DateRangePickerModule,
    NgxSpinnerModule,
    MatDialogModule,
    MatButtonModule
    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientOrderModule { }
