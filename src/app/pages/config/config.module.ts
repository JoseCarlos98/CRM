import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ConfigComponent } from './config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'app/shared/material/material.module';
import { CONFIG_ROUTES } from './config.routes';
import { ModalProductComponent } from './products/modal-product/modal-product.component';



@NgModule({
  declarations: [ConfigComponent, ProductsComponent, ModalProductComponent],
  imports: [
    CommonModule,
    CONFIG_ROUTES,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
  ]
})
export class ConfigModule { }
