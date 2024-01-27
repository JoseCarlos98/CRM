import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-rol',
  templateUrl: './new-rol.component.html',
  styleUrl: './new-rol.component.scss'
})
export class NewRolComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public panelOpenState = false;

  public url = document.location.href;

  
  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
  ) { }


  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
  }

  
  save() {
    this.notificationService
      .notificacion(
        'Éxito',
        'Registro guardado.',
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
