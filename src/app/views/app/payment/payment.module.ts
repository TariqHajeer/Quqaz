import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { GridModule, GridAllModule } from '@syncfusion/ej2-angular-grids';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPrintModule } from 'ngx-print';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
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
    MatButtonModule,
    MatTabsModule,
    ModalModule.forRoot(),
  ]
})
export class PaymentModule { }
