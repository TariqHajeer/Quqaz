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
import { SparklineModule, SparklineTooltipService } from '@syncfusion/ej2-angular-charts';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService } from '@syncfusion/ej2-angular-grids';
import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
import { PieSeriesService, AccumulationTooltipService, AccumulationDataLabelService } from '@syncfusion/ej2-angular-charts';
import {
     DataLabelService,
    StepAreaSeriesService, SplineSeriesService,  StripLineService,
    SelectionService, ScatterSeriesService, ZoomService, 
} from '@syncfusion/ej2-angular-charts';

@NgModule({
  declarations: [HomePageComponent, StartComponent],
  imports: [
    CommonModule,
    ChartModule,
    HomePageRoutingModule,
    SparklineModule,
    FormsModule, ReactiveFormsModule ,DatePickerModule,DateRangePickerModule,
    AccumulationChartModule,
    GridModule,
    
  ],
  providers: [LineSeriesService, DateTimeService, ColumnSeriesService, DataLabelService, ZoomService, StackingColumnSeriesService, CategoryService,
    StepAreaSeriesService, SplineSeriesService, ChartAnnotationService, LegendService, TooltipService, StripLineService,
    PieSeriesService, AccumulationTooltipService, ScrollBarService, AccumulationDataLabelService, SelectionService, ScatterSeriesService
    , PageService,SparklineTooltipService]
    ,schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule { }
