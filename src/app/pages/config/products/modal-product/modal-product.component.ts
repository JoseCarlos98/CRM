import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import * as entityGeneral from '../../../../shared/interfaces/general-interface';
import { CatalogsService } from 'app/shared/services/catalogs.service';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: []
})
export class ModalProductComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public catBusiness: entityGeneral.DataCatBusiness[] = [];

  constructor(
    private catalogsServices: CatalogsService,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private dialogRef: MatDialogRef<any>,
	) { }

  ngOnInit(): void {
    console.log(this.data);

    setTimeout(() => {
      this.getCatalogs()
    }, 500);
  }

  getCatalogs() {
    this.catalogsServices.getCatBusiness().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatBusiness[]) => {
        this.catBusiness = data;
      },
      error: (error) => console.error(error)
    });
  }

  closeModal() {
		this.dialogRef.close({
      close : true
    })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
