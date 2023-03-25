import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../views/error/error.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { UnauthorizedComponent } from '../views/unauthorized/unauthorized.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { DeliveryCostInputComponent } from './components/delivery-cost-input/delivery-cost-input.component';
import { PointInputComponent } from './components/point-input/point-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDriverComponent } from './components/select-driver/select-driver.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    ErrorComponent,
    UnauthorizedComponent,
    CustomInputComponent,
    DeliveryCostInputComponent,
    PointInputComponent,
    SelectDriverComponent],
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  exports: [
    PerfectScrollbarModule,
    RouterModule,
    ErrorComponent,
    UnauthorizedComponent,
    TranslateModule,
    CommonModule,
    CustomInputComponent,
    DeliveryCostInputComponent,
    PointInputComponent,
    SelectDriverComponent
  ],
})
export class SharedModule { }
