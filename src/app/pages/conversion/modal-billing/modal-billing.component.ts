import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConversionService } from '../conversion.service';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import { CatalogsService } from 'app/shared/services/catalogs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-billing',
  templateUrl: './modal-billing.component.html',
})
export class ModalBillingComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public comments = new FormControl(null);

  public formData = this.formBuilder.group({
    company_name: [null, Validators.required],
    quote_option_id: [null, Validators.required],
    payment_method_id: [null, Validators.required],
    way_to_pay_id: [null, Validators.required],
    payment_condition_id: [null, Validators.required],
    invoice_use_id: [null, Validators.required],
    tax_id_number: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{12,13}$/)]],
    serie: [null, Validators.required],
    unitCode: [null, Validators.required],
    description: [null, Validators.required],
  });
  
  public formDataTwo = this.formBuilder.group({
    factura_externa: [false],
    serie: ['A', Validators.required],
    unitCode: ['E48 - Servicio', Validators.required],
    descriptionProduct: [null, Validators.required],
  });

  public catWayToPay: entityGeneral.DataCatWayToPay[] = [];
  public catPaymentMethod: entityGeneral.DataCatPaymentMethod[] = [];
  public catPaymentCondiction: entityGeneral.DataCatPaymentCondition[] = [];
  public catInvoiceUse: entityGeneral.DataCatInvoiceUse[] = [];

  public objData: any;
  public objEditData: any;
  public optionSelected: any;

  constructor(
    private moduleServices: ConversionService,
    private catalogsServices: CatalogsService,
    private formBuilder: FormBuilder,
    private notificationService: OpenModalsService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>
  ) { }

  ngOnInit(): void {
    console.log(this.data.info);
    this.assignInformation();
  }

  assignInformation() {
    if (this.data.info) {
      this.objEditData = this.data?.info;
      this.formData.patchValue(this.data?.info?.companyInfo)
      this.optionSelected = this.data.info.products.filter((data:any) => data.selected);
      console.log('optionSelected', this.optionSelected);
      const descriptionProduct = this.optionSelected[0].product[0];
      this.formDataTwo.patchValue({descriptionProduct: descriptionProduct}) 

      if (this.objEditData.editBill) {
        this.formDataTwo.patchValue(this.objEditData?.formDataTwo)
        this.comments.patchValue(this.objEditData?.formDataTwo?.comments)
      }
    }
    setTimeout(() => {
      this.getCatalogs()
    }, 500);
  }

  getCatalogs() {
    this.catalogsServices.getCatDataWayToPay().subscribe({
      next: (data: entityGeneral.DataCatWayToPay[]) => {
        this.catWayToPay = data;
        console.log(data);
        
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatPaymentMethod().subscribe({
      next: (data: entityGeneral.DataCatPaymentMethod[]) => {
        this.catPaymentMethod = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatPaymentCondition().subscribe({
      next: (data: entityGeneral.DataCatPaymentCondition[]) => {
        this.catPaymentCondiction = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatInvoiceUse().subscribe({
      next: (data: entityGeneral.DataCatInvoiceUse[]) => {
        this.catInvoiceUse = data;
      },
      error: (error) => console.error(error)
    });
  }

  actionSave() {
    

    // console.log(objData);
    // this.saveDataPost(objData); 
  }

  saveDataPost(objData: any) {
    console.log(this.objEditData);
    this.moduleServices.billing({quote : objData}).subscribe({
      next: () => {
        this.completionMessage()
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  seePreBilling() {
    let objData  = {
      status_id: 'f4fa3c48-8b48-4d39-ad09-a6699a66459f',
      quote_id : this.objEditData.id,
      company_id : this.objEditData.companyName.id,
      invoice_status_id : '0e202967-7cba-4899-9038-d91b9a14f57e',
      ...this.formDataTwo.value,
      comments : this.comments.value
    }

    let formDataTwo = {
      ...this.formDataTwo.value,
      comments : this.comments.value
    }

    
    this.objEditData.comments = this.comments.value;
    this.objEditData.editBill = true;
    this.objEditData.formDataTwo = formDataTwo;
    console.log(this.objEditData);

    this.moduleServices.sendData({
      actionSave : objData,
      allInfo : this.objEditData
    });

    this.router.navigateByUrl('/home/conversion/pre-factura');
    this.closeModal()
  }

  completionMessage() {
    this.notificationService
      .notificacion(
        'Éxito',
        `Registro actualizado.`,
        'save',
      )
      .afterClosed()
      .subscribe((_) => this.closeModal());
  }

  closeModal() {
    this.dialogRef.close({ close: true })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }

}
