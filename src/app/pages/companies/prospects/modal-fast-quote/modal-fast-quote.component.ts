import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-fast-quote',
  templateUrl: './modal-fast-quote.component.html',
  styleUrl: './modal-fast-quote.component.scss'
})
export class ModalFastQuoteComponent {

  constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) { }

  closeModal(close = true) {
		this.dialogRef.close({ close })
  }
}
