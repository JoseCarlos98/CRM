import { Component, Inject, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ConversionService } from '../../conversion.service';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-email',
  templateUrl: './modal-email.component.html',
})
export class ModalEmailComponent implements OnDestroy {
  private onDestroy = new Subject<void>();

  public email = new FormControl('', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]);

  constructor(
    private moduleServices: ConversionService,
    private notificationService: OpenModalsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>
  ) { }

  sendEmail() {
    let objEmail: any = {
      ...this.data.info,
      email_send: this.email.value
    };

    console.log(objEmail);
    this.moduleServices.sendEmail(objEmail).subscribe({
      next: () => {
        this.notificationService
          .notificacion(
            'Éxito',
            'Correo enviado.',
            'save',
          )
          .afterClosed()
          .subscribe(() => {
            this.closeModal();
          });
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    });
  }

  closeModal() {
    this.dialogRef.close({ close: true })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
