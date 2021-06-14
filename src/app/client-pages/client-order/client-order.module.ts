import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientOrderRoutingModule } from './client-order-routing.module';
import { ShowClientOrderComponent } from './show-client-order/show-client-order.component';
import { AddClientOrderComponent } from './add-client-order/add-client-order.component';
import { EditClientOrderComponent } from './edit-client-order/edit-client-order.component';


@NgModule({
  declarations: [ShowClientOrderComponent,
     AddClientOrderComponent,
      EditClientOrderComponent,
    ],
  imports: [
    CommonModule,
    ClientOrderRoutingModule,
    
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ClientOrderModule { }
