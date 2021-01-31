import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import{ViewOrdersComponent} from '../order/view-orders/view-orders.component'
import{AddOrdersComponent} from '../order/add-orders/add-orders.component'
import{EditOrdersComponent} from '../order/edit-orders/edit-orders.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ViewNewOrderComponent } from './view-new-order/view-new-order.component';
import { CreateMulitpleOrderComponent } from './create-mulitple-order/create-mulitple-order.component';
import { GridAllModule, GridModule } from '@syncfusion/ej2-angular-grids';

@NgModule({
  declarations: [ViewOrdersComponent,AddOrdersComponent,EditOrdersComponent,  ViewNewOrderComponent, CreateMulitpleOrderComponent],
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
  ],schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class OrderModule { }
