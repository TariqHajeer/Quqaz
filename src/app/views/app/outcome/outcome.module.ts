import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutcomeRoutingModule } from './outcome-routing.module';
import { ViewOutComeComponent } from './view-out-come/view-out-come.component';
import { AddOutComeComponent } from './add-out-come/add-out-come.component';
import { GridAllModule, GridModule } from '@syncfusion/ej2-angular-grids';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddMoreOutcomeComponent } from './add-more-outcome/add-more-outcome.component';


@NgModule({
  declarations: [ViewOutComeComponent, AddOutComeComponent, AddMoreOutcomeComponent],
  imports: [
    CommonModule,
    OutcomeRoutingModule,
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

  ], schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OutcomeModule { }
