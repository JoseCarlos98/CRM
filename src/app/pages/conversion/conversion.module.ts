import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QUOTES_ROUTES } from './conversion.routes';
import { QuotesComponent } from './quotes/quotes.component';
import { ConversionComponent } from './conversion.component';
import { MaterialModule } from 'app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NewQuoteComponent } from './new-quote/new-quote.component';
import { DetailsQuotesComponent } from './details-quotes/details-quotes.component';
import { ModalUploadDocumentComponent } from './modal-upload-document/modal-upload-document.component';
import { ModalCloseSaleComponent } from './modal-close-sale/modal-close-sale.component';
import { ModalBillingComponent } from './modal-billing/modal-billing.component';
import { ModalEmailComponent } from './details-quotes/modal-email/modal-email.component';
import { PreBillComponent } from './pre-bill/pre-bill.component';


@NgModule({
  declarations: [
    ConversionComponent, 
    DetailsQuotesComponent,
    QuotesComponent, 
    ModalUploadDocumentComponent,
    NewQuoteComponent,
    ModalCloseSaleComponent,
    ModalBillingComponent,
    ModalEmailComponent,
    PreBillComponent

  ],
  imports: [
    CommonModule,
    QUOTES_ROUTES,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
  ]
})
export class ConversionModule { }
