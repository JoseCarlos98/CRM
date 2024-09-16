import { Component, Inject, OnInit } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfigService } from '../../config.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { modalInfoTable } from 'app/shared/interfaces/TableColumns';
import * as entity from '../../config-interface';

@Component({
  selector: 'app-modal-new-product-category',
  templateUrl: './modal-new-product-category.component.html',
})
export class ModalNewProductCategoryComponent implements OnInit {
  private onDestroy = new Subject<void>();

  public formData = this.formBuilder.group({
    category_name: ['', Validators.required]
  });

  private objEditData: entity.GetDataProductCategory;

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
    this.formData.patchValue(this.objEditData);
  }

  actionSave() {
    let objData: any = {
      ...this.formData.value
    }

    if (this.objEditData) this.saveDataPatch(objData)
    else this.saveDataPost(objData)
  }

  saveDataPost(objData) {
    this.moduleServices.postDataProductCategory(objData).subscribe({
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
    this.moduleServices.patchDataProductCategory(this.objEditData.product_category_id, objData).subscribe({
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
      .subscribe((_) => {
        this.closeModal()
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
