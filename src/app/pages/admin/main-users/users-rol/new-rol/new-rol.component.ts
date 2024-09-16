import { Component, OnDestroy, OnInit } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from 'app/pages/admin/admin.service';

@Component({
  selector: 'app-new-rol',
  templateUrl: './new-rol.component.html',
})
export class NewRolComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public panelOpenState = false;

  public url = document.location.href;
  
  public formData = this.formBuilder.group({
    rol_name: ['', Validators.required],
  });
  
  public objEditData : any;

  constructor(
    private moduleServices: AdminService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getId();
  }

  getId() {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe((params: any) => {
      if (params.id) this.getDataById(params.id);
    });
  }

  getDataById(id: string) {
    this.moduleServices.getDataRolId(id).subscribe({
      next: (response: any) => {
        this.objEditData = response;
        this.formData.patchValue(this.objEditData);
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }
  
  actionSave() {
    let objData: any = {
      ...this.formData.value,
    }
    
    console.log('OBJETO :', objData);
    if (this.objEditData) this.saveDataPatch(objData);
    else this.saveDataPost(objData);
  }

  saveDataPost(objData) {
    this.moduleServices.postDataRol(objData).subscribe({
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
    this.moduleServices.patchDataRol(this.objEditData.id, objData).subscribe({
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

  toBack() {
    this.router.navigateByUrl(`/home/admin/usuarios`)
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
