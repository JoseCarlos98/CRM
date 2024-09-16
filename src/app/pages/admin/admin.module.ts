import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'app/shared/material/material.module';
import { ADMIN_ROUTES } from './admin.routes';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './main-users/users/users.component';
import { MainUsersComponent } from './main-users/main-users.component';
import { UsersRolComponent } from './main-users/users-rol/users-rol.component';
import { ProductsComponent } from './main-products/products/products.component';
import { DownloadEmailsComponent } from './download-emails/download-emails.component';
import { NewUserComponent } from './main-users/users/new-user/new-user.component';
import { NewRolComponent } from './main-users/users-rol/new-rol/new-rol.component';
import { MainProductsComponent } from './main-products/main-products.component';
import { PriceComponent } from './main-products/price/price.component';
import { DiscountsComponent } from './main-products/discounts/discounts.component';
import { ModalNewProductComponent } from './main-products/products/modal-new-product/modal-new-product.component';
import { ModalNewPriceComponent } from './main-products/price/modal-new-price/modal-new-price.component';
import { NewDiscountComponent } from './main-products/discounts/new-discount/new-discount.component';
import { BonusesComponent } from './bonuses/bonuses.component';
import { NewBonusComponent } from './bonuses/new-bonus/new-bonus.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsAccountComponent } from './profile/account/account.component';
import { SettingsSecurityComponent } from './profile/security/security.component';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    MainUsersComponent,
    UsersComponent,
    UsersRolComponent,
    ProductsComponent,
    DownloadEmailsComponent,
    NewUserComponent,
    NewRolComponent,
    MainProductsComponent,
    ProductsComponent,
    PriceComponent,
    DiscountsComponent,
    ModalNewProductComponent,
    ModalNewPriceComponent,
    NewDiscountComponent,
    BonusesComponent,
    NewBonusComponent,
    ProfileComponent,
    SettingsAccountComponent,
    SettingsSecurityComponent
  ],
  imports: [
    CommonModule,
    ADMIN_ROUTES,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
