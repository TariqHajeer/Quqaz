import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { AddClientComponent } from './add-client/add-client.component';
import { ViewClientsComponent } from './view-clients/view-clients.component';
import { GridAllModule, GridModule } from '@syncfusion/ej2-angular-grids';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EditClientComponent } from './edit-client/edit-client.component';
import { CreateReceiptAndExchangeComponent } from './receipt-and-exchange/receipt-and-exchange.component';
import { NgxPrintModule } from 'ngx-print';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClientPointComponent } from './client-point/client-point.component';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  declarations: [AddClientComponent, ViewClientsComponent, EditClientComponent, CreateReceiptAndExchangeComponent, ClientPointComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    GridModule,
    GridAllModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,
    SimpleNotificationsModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    NgxPrintModule,
    NgxSpinnerModule,
    MatCheckboxModule,


  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientModule { }
