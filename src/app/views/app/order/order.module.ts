import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import{ViewOrdersComponent} from '../order/view-orders/view-orders.component'
import{AddOrdersComponent} from '../order/add-orders/add-orders.component'
import{EditOrdersComponent} from '../order/edit-orders/edit-orders.component'

@NgModule({
  declarations: [ViewOrdersComponent,AddOrdersComponent,EditOrdersComponent],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
