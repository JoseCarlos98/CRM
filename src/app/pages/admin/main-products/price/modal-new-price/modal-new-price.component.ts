import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import * as entity from '../../../admin-interface';
import { Subject } from 'rxjs';
import { AdminService } from 'app/pages/admin/admin.service';
import { UpdateComponentsService } from 'app/shared/services/updateComponents.service';
import * as entityGeneral from '../../../../../shared/interfaces/general-interface';
import { CatalogsService } from 'app/shared/services/catalogs.service';

@Component({
  selector: 'app-modal-new-price',
  templateUrl: './modal-new-price.component.html',
})
export class ModalNewPriceComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public formData = this.formBuilder.group({
    code: [null, Validators.required],
    price: [null, Validators.required],
    tax_percentage: ['', [Validators.required, this.validateTaxPercentage]],
    currency: [null, Validators.required],
  });

  public catCurrency: entityGeneral.DataCatCurrency[] = [];
  public catProductCategories: entityGeneral.DataCatProductCategory[] = [];

  public productsApplies = new FormControl(null);

  public objEditData: any;

  constructor(
    private updateService: UpdateComponentsService,
    private moduleServices: AdminService,
    private catalogsServices: CatalogsService,
    private formBuilder: FormBuilder,
    private notificationService: OpenModalsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit(): void {
    console.log(this.data?.info);

    if (this.data?.info) {
      this.objEditData = this.data?.info
      this.asignedData();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getCatalogs()
    }, 500);
  }

  getCatalogs() {
    this.catalogsServices.getCatCurrency().subscribe({
      next: (data: entityGeneral.DataCatCurrency[]) => {
        this.catCurrency = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatProductCategory().subscribe({
      next: (data: entityGeneral.DataCatProductCategory[]) => {
        this.catProductCategories = data;
      },
      error: (error) => console.error(error)
    });
  }

  actionSave() {
    let objData: any = {
      ...this.formData.value,
    }

    if (this.productsApplies.value) objData.product_category = this.productsApplies.value;

    console.log(objData);

    if (this.objEditData) this.saveDataPatch(objData)
    else this.saveDataPost(objData)
  }

  asignedData() {
    this.formData.patchValue({
      ...this.objEditData,
    })
  }

  saveDataPost(objData: entity.PostDataPrice) {
    this.moduleServices.postDataPrice(objData).subscribe({
      next: () => {
        this.completionMessage()
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  saveDataPatch(objData: entity.PostDataPrice) {
    this.moduleServices.patchDataPrice(this.objEditData.price_id, objData).subscribe({
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
      .subscribe((_) => { this.closeModal() });
  }

  validateTaxPercentage(control: any) {
    const taxPercentage = control.value;
    if (taxPercentage > 100) return { 'invalidPercentage': true };

    return null;
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
