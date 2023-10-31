import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserComponent } from './view-user/view-user.component';

import { GridAllModule, GridModule } from '@syncfusion/ej2-angular-grids';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ShowAgentComponent } from './show-agent/show-agent.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UserTreasuryComponent } from './user-treasury/user-treasury.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { GetGiveFormComponent } from './data/get-give-form/get-give-form.component';
import { TreasuryTableComponent } from './data/treasury-table/treasury-table.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ShowReciptAndExchangeComponent } from './data/show-recipt-and-exchange/show-recipt-and-exchange.component';
import { TreasuryStatictisComponent } from './data/treasury-statictis/treasury-statictis.component';
import { CategoryService, ChartModule, DataLabelService, LegendService, LineSeriesService, TooltipService } from '@syncfusion/ej2-angular-charts';
import { DatePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [AddUserComponent, ViewUserComponent, EditUserComponent, ShowAgentComponent, UserTreasuryComponent, UserProfileComponent, GetGiveFormComponent, TreasuryTableComponent, ShowReciptAndExchangeComponent, TreasuryStatictisComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
    NgxSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    ChartModule,
    DatePickerModule,
    DateRangePickerModule
  ],
  providers: [CategoryService, LegendService, TooltipService, DataLabelService, LineSeriesService]
})
export class UsersModule { }
