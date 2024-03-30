import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../views/error/error.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { UnauthorizedComponent } from '../views/unauthorized/unauthorized.component';
import { DeliveryCostInputComponent } from './components/delivery-cost-input/delivery-cost-input.component';
import { PointInputComponent } from './components/point-input/point-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectDriverComponent } from './components/select-driver/select-driver.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NumericalInputComponent } from './components/numerical-input/numerical-input.component';
import { CostInputComponent } from './components/cost-input/cost-input.component';
@NgModule({
  declarations: [
    ErrorComponent,
    UnauthorizedComponent,
    DeliveryCostInputComponent,
    PointInputComponent,
    SelectDriverComponent,
    NumericalInputComponent,
    CostInputComponent
  ],
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
    DeliveryCostInputComponent,
    PointInputComponent,
    SelectDriverComponent,
    CostInputComponent
  ],
})
export class SharedModule { }
