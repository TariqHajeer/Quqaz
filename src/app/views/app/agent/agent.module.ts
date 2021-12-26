import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { AgenthomeComponent } from './agenthome/agenthome.component';
import { AgentOrdersComponent } from './agent-orders/agent-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { DatePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { CategoryService, ChartAnnotationService, ChartModule, ColumnSeriesService, DateTimeService, LegendService, LineSeriesService, RangeColumnSeriesService, ScrollBarService, StackingColumnSeriesService, TooltipService } from '@syncfusion/ej2-angular-charts';
import { GridModule, GridAllModule } from '@syncfusion/ej2-angular-grids';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPrintModule } from 'ngx-print';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OrderInStockComponent } from './order-in-stock/order-in-stock.component';
import { OrdersOnWayComponent } from './orders-on-way/orders-on-way.component';
import { OrderSuspendedComponent } from './order-suspended/order-suspended.component';
import { AgentOrdersReportComponent } from './agent-orders-report/agent-orders-report.component';
import { ShowReportComponent } from './show-report/show-report.component';
import { OwedOrderComponent } from './owed-order/owed-order.component';
import { OrderByCodeComponent } from './order-by-code/order-by-code.component';
import { AgentPrintComponent } from './agent-print/agent-print.component';


@NgModule({
  declarations: [AgenthomeComponent, AgentOrdersComponent, OrderInStockComponent, OrdersOnWayComponent, OrderSuspendedComponent, AgentOrdersReportComponent, ShowReportComponent, OwedOrderComponent, OrderByCodeComponent, AgentPrintComponent],
  imports: [
    CommonModule,
    AgentRoutingModule,
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
    MatCheckboxModule,
  ], providers: [CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService,
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,], schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AgentModule { }
