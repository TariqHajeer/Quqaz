import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncomeRoutingModule } from './income-routing.module';
import { ViewIncomComponent } from './view-incom/view-incom.component';
import { AddInComeComponent } from './add-in-come/add-in-come.component';
import { GridAllModule, GridModule , EditService, ToolbarService, SortService } from '@syncfusion/ej2-angular-grids';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddMoreIncomeComponent } from './add-more-income/add-more-income.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ViewByIdComponent } from './view-by-id/view-by-id.component';
@NgModule({
  declarations: [ViewIncomComponent, AddInComeComponent, AddMoreIncomeComponent, ViewByIdComponent],
  imports: [
    CommonModule,
    IncomeRoutingModule,
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
    NgxSpinnerModule
    

  ],schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [EditService, ToolbarService, SortService]
})
export class IncomeModule { }
