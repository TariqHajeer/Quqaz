import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { ReportsRoutingModule } from './reports-routing.module';
import { ShipmentInStockComponent } from './shipment-in-stock/shipment-in-stock.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxPrintModule } from 'ngx-print';
import { ClientOrderComponent } from './client-order/client-order.component';
import { ShipmentsOnWayComponent } from './shipments-on-way/shipments-on-way.component';
import { ReceiptAgentComponent } from './print/receipt-agent/receipt-agent.component';
import { ClientInsideCompanyComponent } from './client-inside-company/client-inside-company.component';
import { ShipmentsNotBeenDeliveredComponent } from './shipments-not-been-delivered/shipments-not-been-delivered.component';
import { ReceiptClientComponent } from './print/receipt-client/receipt-client.component';
import { ReceiptShipmentAgentComponent } from './receipt-shipment-agent/receipt-shipment-agent.component';
import { ClientComponent } from './printpreview/client/client.component';
import { AgentComponent } from './printpreview/agent/agent.component';
import { ReceiptSetPrintNumberComponent } from './print/receipt-set-print-number/receipt-set-print-number.component';
import { SetPrintNumberComponent } from './printpreview/set-print-number/set-print-number.component';

@NgModule({
  declarations: [ShipmentInStockComponent, ClientOrderComponent, ShipmentsOnWayComponent, ReceiptAgentComponent, ClientInsideCompanyComponent, ShipmentsNotBeenDeliveredComponent, ReceiptClientComponent, ReceiptShipmentAgentComponent, ClientComponent, AgentComponent, ReceiptSetPrintNumberComponent, SetPrintNumberComponent,],
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

  ],schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportsModule { }
