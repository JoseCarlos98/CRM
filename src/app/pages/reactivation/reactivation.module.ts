import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { REACTIVATION_ROUTES } from './reactivation.routes';
import { MaterialModule } from 'app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DiaryComponent } from './diary/diary.component';
import { PendingCallsComponent } from './pending-calls/pending-calls.component';
import { ReactivationComponent } from './reactivation.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MailboxComponent } from './mailbox/mailbox.component';
import { ModalMailboxComponent } from './mailbox/modal-mailbox/modal-mailbox.component';

@NgModule({
  declarations: [
    DiaryComponent,
    PendingCallsComponent,
    ReactivationComponent,
    MailboxComponent,
    ModalMailboxComponent
  ],
  imports: [
    CommonModule,
    REACTIVATION_ROUTES,
    MaterialModule,
    FormsModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class ReactivationModule { }
