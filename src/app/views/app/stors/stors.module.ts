import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorsRoutingModule } from './stors-routing.module';
import { AddStoreComponent } from './add-store/add-store.component';
import { ShowStoresComponent } from './show-stores/show-stores.component';
import { EditStoreComponent } from './edit-store/edit-store.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ChartModule, CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService, ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService } from '@syncfusion/ej2-angular-charts';
import { GridModule, GridAllModule } from '@syncfusion/ej2-angular-grids';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPrintModule } from 'ngx-print';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [AddStoreComponent, ShowStoresComponent, EditStoreComponent],
  imports: [
    CommonModule,
    StorsRoutingModule,
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
    MatTabsModule

  ], providers: [CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService,
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,]
  , schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
 
})
export class StorsModule { }
