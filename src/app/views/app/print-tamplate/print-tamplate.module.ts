import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintTamplateRoutingModule } from './print-tamplate-routing.module';
import { ReceiptComponent } from './receipt/receipt.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [ReceiptComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    PrintTamplateRoutingModule,
    NgxPrintModule,

   ],schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PrintTamplateModule { }
