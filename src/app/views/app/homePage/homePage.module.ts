import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { StartComponent } from './start/start.component';
import { HomePageComponent } from './homePage.component';
import { HomePageRoutingModule } from './homePage.routing';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import { DateFormatOptions } from '@syncfusion/ej2-base'
import { CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService, 
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService,LegendService, TooltipService
 } from '@syncfusion/ej2-angular-charts';
 import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
//import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [HomePageComponent, StartComponent],
  imports: [
    CommonModule,
    ChartModule,
    HomePageRoutingModule,
    FormsModule, ReactiveFormsModule ,DatePickerModule,DateRangePickerModule
  ],
  providers: [ CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService, 
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,]
    ,schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule { }
