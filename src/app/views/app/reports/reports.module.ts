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
import { ShipmentsNotBeenDeliveredComponent } from './shipments-not-been-delivered/shipments-not-been-delivered.component';
import { ClientComponent } from './printpreview/client/client.component';
import { AgentComponent } from './printpreview/agent/agent.component';
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
import { OrderVicdanAgentComponent } from './order-vicdan-agent/order-vicdan-agent.component';
import { ClientPrintComponent } from './client-print/client-print.component';
import { AgentPrintComponent } from './agent-print/agent-print.component';
import { ReceiptsAndExchangesComponent } from './receipts-and-exchanges/receipts-and-exchanges.component';
import { OrderInCompanyComponent } from './order-in-company/order-in-company.component';
import { PrintOrderInCompanyComponent } from './printpreview/print-order-in-company/print-order-in-company.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OrdersTodayComponent } from './orders-today/orders-today.component';
import { OrdersUnacceptableComponent } from './orders-unacceptable/orders-unacceptable.component';
import { ChangeAgentByOrdersComponent } from './change-agent-by-orders/change-agent-by-orders.component';
import { AgentOrderStateComponent } from './agent-order-state/agent-order-state.component';
import { ClientReciptAndExchangeComponent } from './printpreview/client-recipt-and-exchange/client-recipt-and-exchange.component';
import { ShowRecetptShipmentsComponent } from './show-recetpt-shipments/show-recetpt-shipments.component';
import { PrintReceiptShipmentComponent } from './printpreview/print-receipt-shipment/print-receipt-shipment.component';
import { ShowTreasuryComponent } from './show-treasury/show-treasury.component';
import { CashMovmentComponent } from './cash-movment/cash-movment.component';
import { ViewsPrintTransferToSecondBranchComponent } from './views-print-transfer-to-second-branch/views-print-transfer-to-second-branch.component';
import { ViewsPrintTransferToSecondBranchByIdComponent } from './views-print-transfer-to-second-branch-by-id/views-print-transfer-to-second-branch-by-id.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrintOrdersDontFinishedComponent } from './printpreview/print-orders-dont-finished/print-orders-dont-finished.component';
import { ViewPrintOrdersDontFinishedComponent } from './view-print-orders-dont-finished/view-print-orders-dont-finished.component';
import { ViewPrintOrdersDontFinishedDetilsComponent } from './view-print-orders-dont-finished-detils/view-print-orders-dont-finished-detils.component';
@NgModule({
  declarations: [ShipmentInStockComponent,
    ClientOrderComponent,
    ShipmentsOnWayComponent,
    ShipmentsNotBeenDeliveredComponent,
    ClientComponent, 
    AgentComponent,
    SetPrintNumberComponent,
    SetPrintNumberClientComponent,
    StatisticsComponent,
    PayComponent,
    AgentStatisticsComponent,
    OrderVicdanAgentComponent,
    ClientPrintComponent,
    AgentPrintComponent,
    ReceiptsAndExchangesComponent,
    OrderInCompanyComponent,
    PrintOrderInCompanyComponent,
    OrdersTodayComponent,
    OrdersUnacceptableComponent,
    ChangeAgentByOrdersComponent,
    AgentOrderStateComponent,
    ClientReciptAndExchangeComponent,
    ShowRecetptShipmentsComponent,
    PrintReceiptShipmentComponent,
    ShowTreasuryComponent,
    CashMovmentComponent,
    ViewsPrintTransferToSecondBranchComponent,
    ViewsPrintTransferToSecondBranchByIdComponent,
    PrintOrdersDontFinishedComponent,
    ViewPrintOrdersDontFinishedComponent,
    ViewPrintOrdersDontFinishedDetilsComponent,],
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
    NgxSpinnerModule,
    SharedModule
  ]
  , providers: [CategoryService, DateTimeService, ScrollBarService, LineSeriesService, ColumnSeriesService,
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportsModule { }
