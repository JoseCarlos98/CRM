import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Observable, Subject } from 'rxjs';
import { ConfigService } from '../../config.service';
import { FormControl, Validators } from '@angular/forms';
import { modalInfoTable } from 'app/shared/interfaces/TableColumns';
import * as entity from '../../config-interface';
import { UpdateComponentsService } from '../../../../shared/services/updateComponents.service';

@Component({
  selector: 'app-modalnew-activity',
  templateUrl: './modalnew-activity.component.html',
})
export class ModalnewActivityComponent {
  private onDestroy = new Subject<void>();

  public name = new FormControl('', Validators.required);
  public icon = new FormControl('', Validators.required);
  public color = new FormControl('#000000', Validators.required);
  public activityType = new FormControl('', Validators.required);

  public objEditData: any;

  public typeName: string = '';

  public icons: any[] = [
    { name: 'phone_iphone' },
    { name: 'mail' },
    { name: 'headphones' },
    { name: 'emoji_objects' },
    { name: 'delete' },
    { name: 'person' },
    { name: 'link' },
    { name: 'desktop_windows' },
    { name: 'star' },
    { name: 'settings' },
    { name: 'calendar_today' },
    { name: 'schedule' },
    { name: 'edit' },
    { name: 'work' },
    { name: 'menu_book' },
    { name: 'account_balance_wallet' },
    { name: 'push_pin' },
    { name: 'lock' },
    { name: 'visibility' },
    { name: 'arrow_selector_tool' },
    { name: 'search' },
    { name: 'folder' },
    { name: 'contract_edit' }
  ]

  public activityTypes: entity.TableDataActivityType[] = [];


  constructor(
    private moduleServices: ConfigService,
    private notificationService: OpenModalsService,
    private updateService: UpdateComponentsService,
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: modalInfoTable
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.getCatalogs();
    }, 10);
  }

  assignInformation() {
    console.log('assignInformation');
    this.objEditData = this.data.info;
    if (this.data?.type == 'activity') {
      this.name.patchValue(this.objEditData.activity)
      this.icon.patchValue(this.objEditData.icon)
      this.typeName = 'actividad'
    } else {
      this.name.patchValue(this.objEditData.sub_activity)
      this.activityType.setValue(this.objEditData.type_activity);
      this.typeName = 'subactividad'
    }
    this.color.patchValue(this.objEditData.color)
  }

  getCatalogs() {
    this.moduleServices.getTableDataActivityType().subscribe({
      next: (data: entity.TableDataActivityType[]) => {
        this.activityTypes = data;
        this.assignInformation();
      },
      error: (error) => console.error(error)
    });
  }

  actionSave() {
    console.log(this.color.value);

    let objData: any = {
      color: this.color.value
    }

    if (this.data.type == 'activity') {
      objData.activity = this.name.value;
      objData.icon = this.icon.value;
      this.saveDataPostPatchActivityType(objData);

    } else {
      objData.sub_activity = this.name.value;
      objData.type_activity = this.activityType.value;
      this.saveDataPostPatchSubActivityType(objData);
    }

  }

  saveDataPostPatchActivityType(objData: any) {
    this.saveData(this.objEditData, this.moduleServices.postDataActivityType(objData), this.moduleServices.patchDataActivityType(this.objEditData?.type_activity_id, objData));
  }

  saveDataPostPatchSubActivityType(objData: any) {
    this.saveData(this.objEditData, this.moduleServices.postDatasSubactivityType(objData), this.moduleServices.patchDataSubactivityType(this.objEditData?.sub_type_activity_id, objData));
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

  get canSave() {
    if (this.name.value && this.icon.value) {
      return false 
    } else {
      return true
    }
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
