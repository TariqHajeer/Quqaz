import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import{ViewOrdersComponent} from '../order/view-orders/view-orders.component'
import{AddOrdersComponent} from '../order/add-orders/add-orders.component'
import{EditOrdersComponent} from '../order/edit-orders/edit-orders.component';
import { CreateMulitpleOutComeComponent } from './create-mulitple-out-come/create-mulitple-out-come.component'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ViewNewOrderComponent } from './view-new-order/view-new-order.component';

@NgModule({
  declarations: [ViewOrdersComponent,AddOrdersComponent,EditOrdersComponent, CreateMulitpleOutComeComponent, ViewNewOrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule
  ],schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class OrderModule { }
