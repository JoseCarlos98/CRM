import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { CompaniesService } from 'app/pages/companies/companies.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-new-contact',
  templateUrl: './modal-new-contact.component.html',
  styleUrls: []
})
export class ModalNewContactComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public addContact = new FormControl('')
  public contactos: any[] = []
  public valuesContacts: any[] = []

  public url = document.location.href;
  public modalTitle: string = '';
  public esClient : boolean = false;

  public formData = this.formBuilder.group({
    full_name: ['', Validators.required],
    email: ['', Validators.pattern(/^\S+@\S+\.\S+$/)],
    local_phone: [''],
    position: ['', Validators.required],
    movil_phone: ['', [Validators.pattern(/^\d{10}$/)]],
    ext: [''],
  });

  public objEditData : any;
  public allConatcts : any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private moduleServices: CompaniesService,
    private router: Router,
    private notificationService: OpenModalsService,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) {}

  ngOnInit(): void {
   if (this.data.info) {
    this.objEditData = this.data.info
      this.formData.patchValue(this.objEditData)
   }
  }

  actionSave() {
    let objData: any = {
      ...this.formData.value,
      company: this.data.idCompany
    }
    
    console.log('OBJETO :', objData);
    if (this.objEditData) this.saveDataPatch(objData);
    else this.saveDataPost(objData);
  }

  saveDataPost(objData) {
    this.moduleServices.postDataContact(objData).subscribe({
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
    this.moduleServices.patchDataContact(this.objEditData.contact_id, objData).subscribe({
      next: () => {
        this.completionMessage(true)
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  getAllContacts() {
    this.moduleServices.getDataContact(`?company_id=${this.data.idCompany}`).subscribe({
      next: (response: any) => {
        console.log(response);
        this.allConatcts = response.companyContacts;
        this.closeModal();
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  toBack() {
    this.router.navigateByUrl(`/home/empresas/prospectos`)
  }

  toAll() {
    this.router.navigateByUrl(`/home/empresas/todos`)
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
        this.getAllContacts()
      });
  }

  configInput(event: Event, control:string): void {
		const inputElement = event.target as HTMLInputElement;
		const inputValue = inputElement.value;
		const sanitizedValue = inputValue.replace(/\D/g, '');

    const formControl = this.formData.get(control);
    if (formControl) formControl.setValue(sanitizedValue, { emitEvent: false });
	}

  closeModal() {
		this.dialogRef.close({
      close : true,
      allsContacts: this.allConatcts
    })
  }
  
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
