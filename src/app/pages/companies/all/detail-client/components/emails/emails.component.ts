import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import { ModalInboxComponent } from './modal-inbox/modal-inbox.component';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrl: './emails.component.scss'
})
export class EmailsComponent {
  emails = [
    // {
    //   id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
    //   title: 'Empresa S.A',
    //   asunt: 'Asunto',
    //   description: "Nulla pulvinar ex id orci tempor, id accumsan metus pretium. Proin mollis venenatis magn...",
    // },
    // {
    //   id: "ef7b95a7-8e8b-4616-9619-130d9533add9",
    //   title: 'Empresa S.A',
    //   asunt: 'Asunto',
    //   description: "Nulla pulvinar ex id orci tempor, id accumsan metus pretium. Proin mollis venenatis magn...",
    // },
  ]

  constructor(
    private openModalsService: OpenModalsService,
    private dialog: MatDialog,
  ) { }

  isSameDay(current: string, compare: string): boolean {
    return DateTime.fromISO(current).hasSame(DateTime.fromISO(compare), 'day');
  }

  getRelativeFormat(date: string): string {
    return DateTime.fromISO(date).toRelativeCalendar();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  
  openInbox() {
    this.dialog.open(ModalInboxComponent, {
      data: ['test'],
      disableClose: true,
      width: '500px',
      maxHeight: '690px',
      panelClass: 'custom-dialog',
    });
  }
}
