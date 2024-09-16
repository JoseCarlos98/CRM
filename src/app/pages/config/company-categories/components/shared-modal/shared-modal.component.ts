import { Component, Inject, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConfigService } from 'app/pages/config/config.service';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { modalInfoTable } from 'app/shared/interfaces/TableColumns';
import { UpdateComponentsService } from '../../../../../shared/services/updateComponents.service';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
})
export class SharedModalComponent implements OnInit {
  private onDestroy = new Subject<void>();

  public formData: FormGroup;

  public originName = new FormControl('', Validators.required);
  public businessName = new FormControl('', Validators.required);
  public sizeName = new FormControl('', Validators.required);
  public typeName = new FormControl('', Validators.required);

  public objEditData: any;
  public showForm: boolean = false;

  constructor(
    private moduleServices: ConfigService,
    private updateService: UpdateComponentsService,
    private notificationService: OpenModalsService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: modalInfoTable
  ) {  }

  ngOnInit(): void {
    this.objEditData = this.data.info;
    if (this.data.info) this.actionEdit()
  }


  actionEdit() {
    if (this.data.type == 'origin') {
      this.originName.patchValue(this.data.info.platform_name)

    } else if (this.data.type == 'business') {
      this.businessName.patchValue(this.data.info.business_name)
      
    } else if (this.data.type == 'size') {
      this.sizeName.patchValue(this.data.info.size_name)
      
    } else {
      this.typeName.patchValue(this.data.info.type_name)
    }
  }

  actionSave() {
    let objData: any = {}

    if (this.data.type == 'origin') {
      objData.platform_name = this.originName.value;
      this.saveDataPostPatchOrigin(objData)

    } else if (this.data.type == 'business') {
      objData.business_name = this.businessName.value;
      this.saveDataPostPatchBusiness(objData)

    } else if (this.data.type == 'size') {
      objData.size_name = this.sizeName.value;
      this.saveDataPostPatchSize(objData)

    } else {
      objData.type_name = this.typeName.value;
      this.saveDataPostPatchClientType(objData)
    }
  }

  saveDataPostPatchOrigin(objData: any) {
    this.saveData(this.objEditData, this.moduleServices.postDataOrigin(objData), this.moduleServices.patchDataOrigin(this.objEditData?.platform_id, objData));
  }
  
  saveDataPostPatchBusiness(objData: any) {
    this.saveData(this.objEditData, this.moduleServices.postDataBusiness(objData), this.moduleServices.patchDataBusiness(this.objEditData?.business_id, objData));
  }
  
  saveDataPostPatchSize(objData: any) {
    this.saveData(this.objEditData, this.moduleServices.postDataSize(objData), this.moduleServices.patchDataSize(this.objEditData?.company_size_id, objData));
  }
  
  saveDataPostPatchClientType(objData: any) {
    this.saveData(this.objEditData, this.moduleServices.postDataCompanyType(objData), this.moduleServices.patchDataCompanyType(this.objEditData?.company_type_id, objData));
  }

  saveData(editData: any, postMethod: Observable<any>, patchMethod: Observable<any>) {
    const dataService = editData ? patchMethod : postMethod;
  
    dataService.subscribe({
      next: () => this.completionMessage(editData !== null),
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error');
        console.error(error);
      }
    });
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

  closeModal() {
    this.updateService.triggerUpdate(); 
    this.dialogRef.close({ close: true })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
