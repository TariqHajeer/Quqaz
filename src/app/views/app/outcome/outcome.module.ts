import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ViewByIdComponent } from './view-by-id/view-by-id.component';


@NgModule({
  declarations: [ViewOutComeComponent, AddOutComeComponent, AddMoreOutcomeComponent, ViewByIdComponent],
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
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe]

})
export class OutcomeModule { }
