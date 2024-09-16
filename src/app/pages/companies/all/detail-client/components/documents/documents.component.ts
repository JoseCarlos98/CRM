import { Component } from '@angular/core';
import { ModalNewDocumentComponent } from './modal-new-document/modal-new-document.component';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {

  items: any[] = [];

  public seeDocument = false 
  public documentSelected:any 

  constructor(
    private openModalsService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }
  
  uploadDocument() {
    this.dialog.open(ModalNewDocumentComponent, {
      data: ['test'],
      disableClose: true,
      width: '800px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    });
  }

  seeDocumentInfo(file:any) {
    this.seeDocument = true
    this.documentSelected = file
    console.log(this.documentSelected);
    
  }

  trackByFn(index: number, item: any): any
  {
      return item.id || index;
  }

}
