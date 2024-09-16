import { NgModule } from '@angular/core';
import { CommonModule, I18nPluralPipe, NgIf } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { AUTH_ROUTES } from './authentication.routes';
import { LoginComponent } from './login/login.component';
import { RouterLink } from '@angular/router';
import { MaterialModule } from 'app/shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AuthenticationComponent, LoginComponent],
  imports: [
    CommonModule,
    AUTH_ROUTES,
    NgIf, 
    RouterLink, 
    I18nPluralPipe,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
