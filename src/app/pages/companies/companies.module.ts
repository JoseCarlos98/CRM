import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MaterialModule } from 'app/shared/material/material.module';
import { CompaniesComponent } from './companies.component';
import { COMPANIES_ROUTES } from './companies.routes';
import { ProspectsComponent } from './prospects/prospects.component';
import { AllComponent } from './all/all.component';
import { LeadsComponent } from './leads/leads.component';
import { ClientsComponent } from './clients/clients.component';
import { ModalFastQuoteComponent } from './prospects/modal-fast-quote/modal-fast-quote.component';
import { DetailClientComponent } from './all/detail-client/detail-client.component';
import { CallsComponent } from './all/detail-client/components/calls/calls.component';
import { ContactComponent } from './all/detail-client/components/contact/contact.component';
import { DocumentsComponent } from './all/detail-client/components/documents/documents.component';
import { EmailsComponent } from './all/detail-client/components/emails/emails.component';
import { QuotesComponent } from './all/detail-client/components/quotes/quotes.component';
import { ModalInboxComponent } from './all/detail-client/components/emails/modal-inbox/modal-inbox.component';
import { ModalNewDocumentComponent } from './all/detail-client/components/documents/modal-new-document/modal-new-document.component';
import { ModalNewContactComponent } from './all/detail-client/components/contact/modal-new-contact/modal-new-contact.component';
import { HistoryComponent } from './all/detail-client/components/history/history.component';
import { FormatoFechaPipe } from 'app/shared/pipe/fecha.pipe';
import { ModalNewActivityComponent } from './all/detail-client/components/history/modal-new-activity/modal-new-activity.component';
import { NewClientOrProspectComponent } from './new-client-or-prospect/new-client-or-prospect.component';
import { CampaignComponent } from './all/detail-client/components/campaign/campaign.component';



@NgModule({
  declarations: [
    CompaniesComponent,
    ProspectsComponent,
    AllComponent,
    LeadsComponent,
    ClientsComponent,
    ModalFastQuoteComponent,
    DetailClientComponent,
    CallsComponent,
    ContactComponent,
    DocumentsComponent,
    EmailsComponent,
    QuotesComponent,
    ModalInboxComponent,
    ModalNewDocumentComponent,
    ModalNewContactComponent,
    HistoryComponent,
    FormatoFechaPipe,
    ModalNewActivityComponent,
    NewClientOrProspectComponent,
    CampaignComponent
  ],
  imports: [
    CommonModule,
    COMPANIES_ROUTES,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
  ],
  exports : [
    ModalNewActivityComponent
  ]
})
export class CompaniesModule { }
