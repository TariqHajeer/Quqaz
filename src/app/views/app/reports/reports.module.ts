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
import { FooterComponent } from './print/receipt-agent/layout/footer/footer.component';
import { HeaderComponent } from './print/receipt-agent/layout/header/header.component';

@NgModule({
  declarations: [ShipmentInStockComponent, ClientOrderComponent, ShipmentsOnWayComponent, ReceiptAgentComponent, FooterComponent, HeaderComponent,],
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
