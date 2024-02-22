import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalNewCompanyTypeComponent } from '../../modal-new-company-type/modal-new-company-type.component';
import { Subject, Subscription } from 'rxjs';
import { ConfigService } from 'app/pages/config/config.service';
import * as entity from '../../../config-interface';
import { SharedModalComponent } from '../shared-modal/shared-modal.component';
import { UpdateComponentsService } from '../../../../../shared/services/updateComponents.service';

@Component({
  selector: 'app-origin-company',
  templateUrl: './origin-company.component.html',
})
export class OriginCompanyComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();
  private updateSubscription: Subscription;

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'platform_name',
    'acciones'
  ];

  constructor(
    private moduleServices: ConfigService,
    private updateService: UpdateComponentsService,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.updateSubscription = this.updateService.updateEvent$.subscribe(() => {
      this.getDataTable();
    });
    this.getDataTable();
  }

  getDataTable() {
    this.moduleServices.getTableDataOrigin().subscribe({
      next: (data: entity.TableDataOrigin[]) => {
        this.dataSource.data = data;
      },
      error: (error) => console.error(error)
    })
  }
  
  editData(data:any) {
    this.dialog.open(SharedModalComponent, {
      data: {
        info : data,
        type : 'origin'
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '428px',
      panelClass: 'custom-dialog',
    })
    .afterClosed()
    .subscribe(() => this.getDataTable());
  }
  
  deleteData(id: string) {
    this.notificationService
    .notificacion(
      'Pregunta',
      '¿Estas seguro de eliminar el registro?',
      'question',
    )
    .afterClosed()
    .subscribe((response) => {
      if (response) {
        this.moduleServices.deleteDataOrigin(id).subscribe({
          next: () => {
              this.notificationService
              .notificacion(
                'Éxito',
                'Registro eliminado.',
                'delete',
              )
              .afterClosed()
              .subscribe((_) => this.getDataTable());
          },
          error: (error) => console.error(error)
        })
      }
    });
  }

  ngOnDestroy(): void {
    this.updateSubscription.unsubscribe();
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
