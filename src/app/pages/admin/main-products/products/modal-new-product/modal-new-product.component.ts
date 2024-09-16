import { AfterViewInit, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'app/pages/admin/admin.service';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Subject, takeUntil } from 'rxjs';
import * as entity from '../../../admin-interface';
import * as entityGeneral from '../../../../../shared/interfaces/general-interface';
import { UpdateComponentsService } from 'app/shared/services/updateComponents.service';
import { CatalogsService } from 'app/shared/services/catalogs.service';

@Component({
  selector: 'app-modal-new-product',
  templateUrl: './modal-new-product.component.html',
})
export class ModalNewProductComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public formData = this.formBuilder.group({
    code: [null, Validators.required],
    name: [null, Validators.required],
    list_price: [null, Validators.required],
    product_category: [null, Validators.required],
    country: [null, Validators.required],
    link: ['https://', [Validators.required, Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/)]],

  });

  public catCountries: entityGeneral.DataCatCountry[] = [];
  public catProductCategories: entityGeneral.DataCatProductCategory[] = [];

  public idData: string = '';
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
    console.log(this.data.info);

    if (this.data.info) {
      this.objEditData = this.data.info
      this.asignedData();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getCatalogs()
    }, 500);
  }

  getCatalogs() {
    this.catalogsServices.getCatCountry().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatCountry[]) => {
        this.catCountries = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatProductCategory().pipe(takeUntil(this.onDestroy)).subscribe({
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

    console.log(objData);

    if (this.idData) this.saveDataPatch(objData)
    else this.saveDataPost(objData)
  }

  asignedData() {
    this.formData.patchValue({
      ...this.objEditData,
      country: this.objEditData?.country?.country_id || '',
      product_category: this.objEditData?.product_category?.product_category_id || ''
    })
  }

  saveDataPost(objData: entity.PostDataProduct) {
    this.moduleServices.postDataProduct(objData).subscribe({
      next: () => {
        this.completionMessage()
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  saveDataPatch(objData: entity.PostDataProduct) {
    this.moduleServices.patchDataProduct(this.idData, objData).subscribe({
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

  closeModal() {
    this.updateService.triggerUpdate();
    this.dialogRef.close({ close: true })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
