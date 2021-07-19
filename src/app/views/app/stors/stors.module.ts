import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StorsRoutingModule } from './stors-routing.module';
import { AddStoreComponent } from './add-store/add-store.component';
import { ShowStoresComponent } from './show-stores/show-stores.component';
import { EditStoreComponent } from './edit-store/edit-store.component';


@NgModule({
  declarations: [AddStoreComponent, ShowStoresComponent, EditStoreComponent],
  imports: [
    CommonModule,
    StorsRoutingModule
  ]
})
export class StorsModule { }
