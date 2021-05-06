import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ReportsRoutingModule } from './reports-routing.module';
import { ShipmentInStockComponent } from './shipment-in-stock/shipment-in-stock.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxPrintModule } from 'ngx-print';
import { ClientOrderComponent } from './client-order/client-order.component';
import { ShipmentsOnWayComponent } from './shipments-on-way/shipments-on-way.component';
import { ReceiptAgentComponent } from './print/receipt-agent/receipt-agent.component';
import { ShipmentsNotBeenDeliveredComponent } from './shipments-not-been-delivered/shipments-not-been-delivered.component';
import { ReceiptClientComponent } from './print/receipt-client/receipt-client.component';
import { ReceiptShipmentAgentComponent } from './receipt-shipment-agent/receipt-shipment-agent.component';
import { ClientComponent } from './printpreview/client/client.component';
import { AgentComponent } from './printpreview/agent/agent.component';
import { ReceiptSetPrintNumberComponent } from './print/receipt-set-print-number/receipt-set-print-number.component';
import { SetPrintNumberComponent } from './printpreview/set-print-number/set-print-number.component';
import { SetPrintNumberClientComponent } from './printpreview/set-print-number-client/set-print-number-client.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { PayComponent } from './printpreview/pay/pay.component';
import { AgentStatisticsComponent } from './agent-statistics/agent-statistics.component';
import {
  CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService,
  ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService
} from '@syncfusion/ej2-angular-charts';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ReceiptSetPrintNumberClientComponent } from './print/receipt-set-print-number-client/receipt-set-print-number-client.component';
import { OrderVicdanAgentComponent } from './order-vicdan-agent/order-vicdan-agent.component';
import { ClientPrintComponent } from './client-print/client-print.component';
import { AgentPrintComponent } from './agent-print/agent-print.component';
import { ReceiptsAndExchangesComponent } from './receipts-and-exchanges/receipts-and-exchanges.component';
@NgModule({
  declarations: [ShipmentInStockComponent,
    ClientOrderComponent,
    ShipmentsOnWayComponent,
    ReceiptAgentComponent,
    ShipmentsNotBeenDeliveredComponent,
    ReceiptClientComponent,
    ReceiptShipmentAgentComponent,
    ClientComponent, 
    AgentComponent,
    ReceiptSetPrintNumberComponent,
    SetPrintNumberComponent,
    SetPrintNumberClientComponent,
    StatisticsComponent,
    PayComponent,
    AgentStatisticsComponent,
    ReceiptSetPrintNumberClientComponent,
    OrderVicdanAgentComponent,
    ClientPrintComponent,
    AgentPrintComponent,
    ReceiptsAndExchangesComponent,],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SimpleNotificationsModule.forRoot(),
    NgxPrintModule,
    DatePickerModule,
    DateRangePickerModule,


  ]
  , providers: [CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService,
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportsModule { }
