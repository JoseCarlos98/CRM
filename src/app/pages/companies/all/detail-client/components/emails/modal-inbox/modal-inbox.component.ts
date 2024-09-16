import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-inbox',
  templateUrl: './modal-inbox.component.html',
  styleUrl: './modal-inbox.component.scss'
})
export class ModalInboxComponent {
  constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) {
	
	}

  ngOnInit(): void {
    console.log(this.data);
  }

  closeModal() {
		this.dialogRef.close({
     
    })
  }
}
