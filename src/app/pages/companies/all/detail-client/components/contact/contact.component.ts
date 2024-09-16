import { Component, Input, OnInit } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewContactComponent } from './modal-new-contact/modal-new-contact.component';
import { Subject } from 'rxjs';
import { CompaniesService } from 'app/pages/companies/companies.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  private onDestroy = new Subject<void>();

  @Input() idCompany:string = '';
  
  public contacts:any[] = []

  constructor(
    private moduleServices: CompaniesService,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    console.log('this.contacts', this.contacts);
    if(this.idCompany) {
      this.getAllContacts()
    }
  }

  getAllContacts() {
    this.moduleServices.getDataContact(`?company_id=${this.idCompany}`).subscribe({
      next: (data : any) => {
        console.log('getAllContacts', data);
        this.contacts = data;
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  neworEditContact(data = null) {
    console.log('neworEditContact', data);
    this.dialog.open(ModalNewContactComponent, {
      data: {
        idCompany : this.idCompany,
        info : data
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
    .afterClosed()
    .subscribe((resp) => { if (resp) this.getAllContacts() });
  }

  deleteData(id: string) {
    console.log('deleteData', id);
    
    this.notificationService
    .notificacion(
      'Pregunta',
      '¿Estás seguro de eliminar el registro?',
      'question',
    )
    .afterClosed()
    .subscribe((response) => {
      if (response) {
        this.moduleServices.deleteDataContact(id).subscribe({
          next: () => {
              this.notificationService
              .notificacion(
                'Éxito',
                'Registro eliminado.',
                'delete',
              )
              .afterClosed()
              .subscribe((_) => {
                this.getAllContacts()
              });
          },
          error: (error) => console.error(error)
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
