import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ConversionService } from '../conversion.service';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ModalBillingComponent } from '../modal-billing/modal-billing.component';
import { MatDialog } from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-pre-bill',
  templateUrl: './pre-bill.component.html',
  styleUrl: './pre-bill.component.scss'
})
export class PreBillComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public date = new Date();
  public dateBill :string = ''
//  public objData :any;
  public objData :any
  public objDataSave :any

  constructor(
    private moduleServices: ConversionService,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dateBill = moment(this.date).format('DD/MM/YYYY')
    
    this.moduleServices.getData().pipe(takeUntil(this.onDestroy)).subscribe((data) => {
      console.log('DATOS A FACTURAR: ', data);
      if (!data) {
        this.toBack()
      } else {
        this.objData = data.allInfo
        this.objDataSave = data.actionSave
      }
    });
  }


  actionSave() {
    console.log(this.objDataSave);
    this.moduleServices.billing({quote : this.objDataSave}).subscribe({
      next: () => {
        this.completionMessage()
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  billing() {
    this.dialog.open(ModalBillingComponent, {
      data: {
        info: this.objData,
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
    .afterClosed()
    .subscribe((_) => {});
  }

  completionMessage() {
    this.notificationService
      .notificacion(
        'Éxito',
        `Registro actualizado.`,
        'save',
      )
      .afterClosed()
      .subscribe((_) => this.toBack());
  }

  toBack(){
    this.router.navigateByUrl(`/home/conversion/cotizaciones`)
  }
  
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
