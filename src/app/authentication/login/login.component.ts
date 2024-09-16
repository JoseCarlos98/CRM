import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthenticationService } from '../authentication.service';
import { Subject, takeUntil } from 'rxjs';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
    .c-main {
      position: relative;
      display: flex;
      width: 100vw;
      display: flex;
      justify-content: center;
      height: 100vh;

      img {
        width :267px;
        margin: auto;
      }
    }
  `
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public rememberMe = new FormControl(null)

  public signInForm = this.formBuilder.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(
    private moduleServices:AuthenticationService,
    private formBuilder: UntypedFormBuilder,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getDecryptedUser();

  }

  signIn() {
    let objLogin : any = {
    ...this.signInForm.value
    }

    this.moduleServices.login(objLogin).subscribe({
      next: (response) => {
        if (response) {
          if (this.rememberMe.value) this.saveUser();
          this.router.navigateByUrl('/home')
        }
      },
      error: (error) => console.error(error)
    })
  }

  saveUser() {
    const User = CryptoJS.AES.encrypt(JSON.stringify(this.signInForm.value), 'secretKey').toString();
    localStorage.setItem('User', User);
  }

  getDecryptedUser() {
    const User = localStorage.getItem('User');

    if (User) {
      const decryptedBytes = CryptoJS.AES.decrypt(User, 'secretKey');
      const decryptedUser = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
      this.signInForm.setValue(decryptedUser);
    }
  }
  
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
