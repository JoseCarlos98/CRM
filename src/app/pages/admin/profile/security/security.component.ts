import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'settings-security',
    templateUrl: './security.component.html',
})
export class SettingsSecurityComponent implements OnInit, OnDestroy {
    private onDestroy = new Subject<void>();
    securityForm: UntypedFormGroup;

    constructor(
        private notificationService: OpenModalsService,
        private _formBuilder: UntypedFormBuilder,
    ) { }

    ngOnInit(): void {
        this.securityForm = this._formBuilder.group({
            currentPassword: [''],
            newPassword: ['', [Validators.required, Validators.minLength(8)]],
            twoStep: [true],
            askPasswordChange: [false],
        });
    }

    actionSave() {
        this.completionMessage(true)
    }

    completionMessage(edit = false) {
        this.notificationService
            .notificacion(
                'Éxito',
                `Registro ${edit ? 'editado' : 'guardado'}.`,
                'save',
            )
    }

    cancel() {
    }

    ngOnDestroy(): void {
        this.onDestroy.next();
        this.onDestroy.unsubscribe();
    }
}
