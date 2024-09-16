import { Component, Inject, OnInit } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../../config.service';
import { modalInfoTable } from 'app/shared/interfaces/TableColumns';
import * as entity from '../../config-interface';

@Component({
  selector: 'app-modal-new-campaing-categories',
  templateUrl: './modal-new-campaing-categories.component.html',
})
export class ModalNewCampaingCategoriesComponent implements OnInit {
  private onDestroy = new Subject<void>();

  public formData = this.formBuilder.group({
    campaign_type_name: ['', Validators.required],
    campaign_abbrev: ['', [Validators.required, Validators.pattern('[A-Za-z]{2}')]]
  });

  private objEditData: entity.GetDataCampaingType;

  constructor(
    private moduleServices: ConfigService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: modalInfoTable
  ) { }

  ngOnInit(): void {
    this.assignInformation();
  }

  assignInformation() {
    this.objEditData = this.data.info;
    this.formData.patchValue(this.objEditData)
  }

  actionSave() {
    let objData: any = {
      ...this.formData.value
    }

    if (this.objEditData) this.saveDataPatch(objData)
    else this.saveDataPost(objData)
  }

  saveDataPost(objData) {
    this.moduleServices.postDataCampaingType(objData).subscribe({
      next: () => {
        this.completionMessage()
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  saveDataPatch(objData) {
    this.moduleServices.patchDataCampaingType(this.objEditData.campaign_type_id, objData).subscribe({
      next: () => {
        this.completionMessage(true)
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  completionMessage(edit = false) {
    this.notificationService
      .notificacion(
        'Éxito',
        `Registro ${edit ? 'editado' : 'guardado'}.`,
        'save',
      )
      .afterClosed()
      .subscribe((_) => this.closeModal());
  }

  onAbbreviationInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    if (inputValue.length > 2) inputElement.value = inputValue.substr(0, 2);
    if (!/^[a-zA-Z]*$/.test(inputElement.value)) inputElement.value = inputValue.replace(/[^a-zA-Z]/g, '');
  }

  closeModal() {
    this.dialogRef.close({ close: true })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
