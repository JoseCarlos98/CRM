import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ConfigComponent } from './config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'app/shared/material/material.module';
import { CONFIG_ROUTES } from './config.routes';
import { ModalProductComponent } from './products/modal-product/modal-product.component';
import { ActivityTypeComponent } from './activity-type/activity-type.component';
import { WayToPayComponent } from './way-to-pay/way-to-pay.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { CompanyCategoriesComponent } from './company-categories/company-categories.component';
import { ActivityComponent } from './activity-type/activity/activity.component';
import { SubactivityComponent } from './activity-type/subactivity/subactivity.component';
import { ModalnewActivityComponent } from './activity-type/modalnew-activity/modalnew-activity.component';
import { ModalNewWayToPayComponent } from './way-to-pay/modal-new-way-to-pay/modal-new-way-to-pay.component';
import { ModalNewProductCategoryComponent } from './product-categories/modal-new-product-category/modal-new-product-category.component';
import { CampaignCategoriesComponent } from './campaign-categories/campaign-categories.component';
import { ModalNewCampaingCategoriesComponent } from './campaign-categories/modal-new-campaing-categories/modal-new-campaing-categories.component';
import { ModalNewCompanyTypeComponent } from './company-categories/modal-new-company-type/modal-new-company-type.component';
import { ClientTypeComponent } from './company-categories/components/client-type/client-type.component';
import { GiroCompanyComponent } from './company-categories/components/giro-company/giro-company.component';
import { OriginCompanyComponent } from './company-categories/components/origin-company/origin-company.component';
import { SizeCompanyComponent } from './company-categories/components/size-company/size-company.component';
import { SharedModalComponent } from './company-categories/components/shared-modal/shared-modal.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { NewSolutionComponent } from './solutions/new-solution/new-solution.component';

@NgModule({
  declarations: [
    ConfigComponent, 
    ProductsComponent, 
    ModalProductComponent,
    ActivityTypeComponent,
    WayToPayComponent,
    ProductCategoriesComponent,
    CompanyCategoriesComponent,
    ActivityComponent,
    SubactivityComponent,
    ModalnewActivityComponent,
    ModalNewWayToPayComponent,
    ModalNewProductCategoryComponent,
    CampaignCategoriesComponent,
    ModalNewCampaingCategoriesComponent,
    ModalNewCompanyTypeComponent,
    ClientTypeComponent,
    GiroCompanyComponent,
    OriginCompanyComponent,
    SizeCompanyComponent,
    SharedModalComponent,
    SolutionsComponent,
    NewSolutionComponent
    
  ],
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
