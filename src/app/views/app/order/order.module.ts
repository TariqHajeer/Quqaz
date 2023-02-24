import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { ViewOrdersComponent } from '../order/view-orders/view-orders.component'
import { AddOrdersComponent } from '../order/add-orders/add-orders.component'
import { EditOrdersComponent } from '../order/edit-orders/edit-orders.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ViewNewOrderComponent } from './view-new-order/view-new-order.component';
import { CreateMulitpleOrderComponent } from './create-mulitple-order/create-mulitple-order.component';
import { GridAllModule, GridModule } from '@syncfusion/ej2-angular-grids';
import { NgxPrintModule } from 'ngx-print';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CreatemultipleOrderFromClientComponent } from './createmultiple-order-from-client/createmultiple-order-from-client.component';
import { ProfitsOfOrdersComponent } from './profits-of-orders/profits-of-orders.component';
import { ChartModule } from '@syncfusion/ej2-angular-charts';
import {CategoryService, DateTimeService, ScrollBarService, ColumnSeriesService, LineSeriesService,ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService} from '@syncfusion/ej2-angular-charts';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CreateMultiOrderAgentAndClientComponent } from './create-multi-order-agent-and-client/create-multi-order-agent-and-client.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CreatemultipulorderagentComponent } from './createmultipulorderagent/createmultipulorderagent.component';
import { ReceiptNewOrdersComponent } from './receipt-new-orders/receipt-new-orders.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditClientOrdersComponent } from './edit-client-orders/edit-client-orders.component';
import { MoveOrdersComponent } from './move-orders/move-orders.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrdersWithClientComponent } from './orders-with-client/orders-with-client.component';
import { NewOrdersDontSendComponent } from './new-orders-dont-send/new-orders-dont-send.component';
import { ReceiptsNewOrdersComponent } from './receipts-new-orders/receipts-new-orders.component';
import { AddMulitpleOrdersWithRegionComponent } from './add-mulitple-orders-with-region/add-mulitple-orders-with-region.component';
import { AddMultipulOrdersAgentWithRegionComponent } from './add-multipul-orders-agent-with-region/add-multipul-orders-agent-with-region.component';
import { ReceiptOrderComponent } from './receipt-order/receipt-order.component';
import { TransferToSecondBranchComponent } from './transfer-to-second-branch/transfer-to-second-branch.component';
import { ReSendOrdersComponent } from './re-send-orders/re-send-orders.component';
import { GetOrdersComeToMyBranchComponent } from './get-orders-come-to-my-branch/get-orders-come-to-my-branch.component';
import { GetOrderReturnedToSecondBranchComponent } from './get-order-returned-to-second-branch/get-order-returned-to-second-branch.component';
import { GetOrdersReturnedToMyBranchComponent } from './get-orders-returned-to-my-branch/get-orders-returned-to-my-branch.component';
import { PrintOrdersComponent } from './printPreview/print-orders/print-orders.component';
import { GetDisapprovedReturnedOrderByBranchComponent } from './get-disapproved-returned-order-by-branch/get-disapproved-returned-order-by-branch.component';
import { ShipmentReceivedByAgentComponent } from './shipment-received-by-agent/shipment-received-by-agent.component';
import { ShipmentReceivedByDeliveredComponent } from './shipment-received-by-delivered/shipment-received-by-delivered.component';
import { ShipmentReceivedByReturnedComponent } from './shipment-received-by-returned/shipment-received-by-returned.component';
import { MoveOrdersToAgentByCodeComponent } from './move-orders-to-agent-by-code/move-orders-to-agent-by-code.component';

@NgModule({
  declarations: [
    ViewOrdersComponent,
    AddOrdersComponent,
    EditOrdersComponent,
    ViewNewOrderComponent,
    CreateMulitpleOrderComponent,
    CreatemultipleOrderFromClientComponent,
    ProfitsOfOrdersComponent,
    CreateMultiOrderAgentAndClientComponent,
    CreatemultipulorderagentComponent,
    ReceiptNewOrdersComponent,
    EditClientOrdersComponent,
    MoveOrdersComponent,
    OrdersWithClientComponent,
    NewOrdersDontSendComponent,
    ReceiptsNewOrdersComponent,
    AddMulitpleOrdersWithRegionComponent,
    AddMultipulOrdersAgentWithRegionComponent,
    ReceiptOrderComponent,
    TransferToSecondBranchComponent,
    ReSendOrdersComponent,
    GetOrdersComeToMyBranchComponent,
    GetOrderReturnedToSecondBranchComponent,
    GetOrdersReturnedToMyBranchComponent,
    PrintOrdersComponent,
    GetDisapprovedReturnedOrderByBranchComponent,
    ShipmentReceivedByAgentComponent,
    ShipmentReceivedByDeliveredComponent,
    ShipmentReceivedByReturnedComponent,
    MoveOrdersToAgentByCodeComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
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
    ChartAnnotationService, RangeColumnSeriesService, StackingColumnSeriesService, LegendService, TooltipService,]
  , schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
})
export class OrderModule { }
