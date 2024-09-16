import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'app/authentication/authentication.service';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Subject } from 'rxjs';
import { AdminService } from '../../admin.service';
import { CatalogsService } from 'app/shared/services/catalogs.service';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'settings-account',
  templateUrl: './account.component.html',
})
export class SettingsAccountComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();
  formData: UntypedFormGroup;

  public user: any;
  public userbackupData: any;
  public actionCancel:boolean = false;

  constructor(
    private moduleServices: AdminService,
    private catalogsServices: CatalogsService,
    private notificationService: OpenModalsService,
    private adminServices: AuthenticationService,
    private _formBuilder: UntypedFormBuilder,
  ) { }

  ngOnInit(): void {
    this.user = this.adminServices.getDecryptedUser();
    console.log('USER:', this.user);
    
    this.formData = this._formBuilder.group({
      first_name: [this.user?.first_name || '-'],
      user_id_slack: [this.user?.user_id_slack ||'-'],
      username: [this.user?.username || '-'],
      last_name: [this.user?.last_name || '-'],
      email: [this.user?.email, Validators.email],
      phone_number: [this.user?.phone_number || '-'],
      voice_identifier: [this.user?.voice_identifier || '-'],
      profile_picture : ['']
    });
    this.userbackupData = { ...this.formData.value }
  }

  ngAfterViewInit(): void {
    this.formData.valueChanges.subscribe((changes) => {
      this.actionCancel = true;
    });
  }

  actionSave() {
    console.log(this.formData.value);
    this.saveDataPatch(this.formData.value)
  }

  saveDataPatch(objData) {
    this.moduleServices.patchDataUser(this.user.id, objData).subscribe({
      next: () => {
        this.catalogsServices.getDataUser(this.user.id).subscribe(response => {
          console.log('NUEVO INFO USER', response);
          const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(response), 'secretKey').toString();
          localStorage.setItem('UserAbrevia', encryptedUser);
          this.completionMessage(true)
        })
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
        `Información guardada.`,
        'save',
      )
  }

  configInput(event: Event, control:string): void {
		const inputElement = event.target as HTMLInputElement;
		const inputValue = inputElement.value;
		const sanitizedValue = inputValue.replace(/\D/g, '');
    const formControl = this.formData.get(control);
    
    if (formControl) formControl.setValue(sanitizedValue, { emitEvent: false });
	}

  cancel() {
    this.formData.patchValue(this.userbackupData);
    this.actionCancel = false;
  }

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.formData.patchValue({ profile_picture: file });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
