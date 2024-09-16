import { Component, OnDestroy, OnInit, QueryList, ViewChildren, ElementRef  } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from 'app/pages/admin/admin.service';
import { CatalogsService } from 'app/shared/services/catalogs.service';
import * as entityGeneral from '../../../../../shared/interfaces/general-interface';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
})
export class NewUserComponent implements OnInit, OnDestroy {
  @ViewChildren('accordion') accordions: QueryList<ElementRef>;
  private onDestroy = new Subject<void>();
  public panelOpenState = false;

  public url = document.location.href;

  public formData = this.formBuilder.group({
    username: ['', Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.pattern(/^\S+@\S+\.\S+$/)],
    phone_number: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    voice_identifier: ['', Validators.required],
    user_id_slack: ['', [Validators.required]],
    password : ['', Validators.required],
    user_rol : ['', Validators.required],
  });

  public objEditData : any;

  public catRoles: entityGeneral.DataCatRol[] = [];
  public checkboxesJSON: any[] = [];

  constructor(
    private moduleServices: AdminService,
    private catalogsServices: CatalogsService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getId();
    this.getCatalogs()
  }

  getId() {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe((params: any) => {
      if (params.id) this.getDataById(params.id);
    });
  }

  getDataById(id: string) {
    this.moduleServices.getDataUsertId(id).subscribe({
      next: (response: any) => {
        this.objEditData = response;
        this.formData.patchValue(this.objEditData);
        this.formData.get('password').clearValidators();
        this.formData.get('password').updateValueAndValidity();
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  getCatalogs() {
    this.catalogsServices.getCatRoles().subscribe({
      next: (response: any) => {
        this.catRoles = response;
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  actionSave() {

    let permissions = this.obtenerCheckboxes();
    let objData: any = {
      ...this.formData.value,
      permissions: {
        permissions
      }
    }
    
    console.log('OBJETO :', objData);

    if (this.objEditData) this.saveDataPatch(objData);
    else this.saveDataPost(objData);
  }

  saveDataPost(objData) {
    console.log('saveDataPost');
    
    this.moduleServices.postDataUser(objData).subscribe({
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
    this.moduleServices.patchDataUser(this.objEditData.id, objData).subscribe({
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
        this.toBack()
      });
  }

  configInput(event: Event, control:string): void {
		const inputElement = event.target as HTMLInputElement;
		const inputValue = inputElement.value;
		const sanitizedValue = inputValue.replace(/\D/g, '');
    const formControl = this.formData.get(control);
    
    if (formControl) formControl.setValue(sanitizedValue, { emitEvent: false });
	}

  preventWhitespace(event: KeyboardEvent): void {
    if (event.key === ' ') {
      event.preventDefault();
    }
  }

  obtenerCheckboxes() {
    this.accordions.forEach(accordion => {
      const checkboxes = accordion.nativeElement.querySelectorAll('mat-checkbox');
      checkboxes.forEach(checkbox => {
        const permiso = checkbox.textContent.trim().toLowerCase().replace(/ /g, '_');
        const acceso = checkbox.querySelector('input').checked;
        const url = checkbox.getAttribute('data-url');
  
        this.checkboxesJSON.push({
          permiso: url,
          acceso: acceso,
        });
      });
    });
    return this.checkboxesJSON;
  }
  

  toBack() {
    this.router.navigateByUrl(`/home/admin/usuarios`)
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
