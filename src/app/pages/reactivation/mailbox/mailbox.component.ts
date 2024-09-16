import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalMailboxComponent } from './modal-mailbox/modal-mailbox.component';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrl: './mailbox.component.scss'
})
export class MailboxComponent {

  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  openInbox() {
    this.dialog.open(ModalMailboxComponent, {
      data: ['test'],
      disableClose: true,
      width: '800px',
      maxHeight: '750px',
      panelClass: 'custom-dialog',
    });
  }
}
