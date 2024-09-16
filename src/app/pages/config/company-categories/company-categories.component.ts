import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewCompanyTypeComponent } from './modal-new-company-type/modal-new-company-type.component';
import { Subject } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SharedModalComponent } from './components/shared-modal/shared-modal.component';

@Component({
  selector: 'app-company-categories',
  templateUrl: './company-categories.component.html',
})
export class CompanyCategoriesComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public selectedOption: string = 'origin';

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

  onTabChange(event: MatTabChangeEvent): void {
    const option = event.tab.textLabel;

    if (option.includes('Giro')) this.selectedOption = 'business';
    else if (option.includes('Tamaño')) this.selectedOption = 'size';
    else this.selectedOption = 'clientType';
  }

  newData(data = null) {
    this.dialog.open(SharedModalComponent, {
      data: {
        info: data,
        type: this.selectedOption,
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '428px',
      panelClass: 'custom-dialog',
    })
      .afterClosed()
      .subscribe((_) => { });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
