import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-mailbox',
  templateUrl: './modal-mailbox.component.html',
})
export class ModalMailboxComponent {

  constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) {
	
	}

  ngOnInit(): void {
    console.log(this.data);
  }

  public saveDraft() {

  }

  public send() {

  }

  public closeModal() {
		this.dialogRef.close({
     
    })
  }
}