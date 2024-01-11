import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-main-users',
  templateUrl: './main-users.component.html',
})
export class MainUsersComponent {

  public isUser :boolean = true;


  constructor(

    private openModalsService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  onTabChange(event: MatTabChangeEvent): void {
    if (event.tab.textLabel.includes('Usuario')) this.isUser = true
     else this.isUser = false
    
    console.log('Pestaña seleccionada:', event.tab.textLabel);
  }

  newData() {
    this.router.navigateByUrl(`/home/admin/${this.isUser ? 'nuevo-usuario' : 'nuevo-rol'}`)
  }
}
