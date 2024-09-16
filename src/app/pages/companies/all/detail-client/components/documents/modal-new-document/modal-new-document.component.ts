import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpenModalsService } from 'app/shared/services/openModals.service';

@Component({
  selector: 'app-modal-new-document',
  templateUrl: './modal-new-document.component.html',
  styleUrl: './modal-new-document.component.scss'
})
export class ModalNewDocumentComponent {

  
  constructor(
    private notificationService: OpenModalsService,

		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) {
  }


  save() {
    this.notificationService
      .notificacion(
        'Éxito',
        'Documento guardado.',
        'save',
      )
      .afterClosed()
      .subscribe((_) => {
        this.closeModal()
      });
  }

  closeModal() {
		this.dialogRef.close({
      close : true
    })
  }

}
