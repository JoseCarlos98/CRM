import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalNewCampaingCategoriesComponent } from './modal-new-campaing-categories/modal-new-campaing-categories.component';
import { Subject } from 'rxjs';
import * as entity from '../config-interface';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-campaign-categories',
  templateUrl: './campaign-categories.component.html',
})
export class CampaignCategoriesComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'campaign_type_name',
    'campaign_abbrev',
    'acciones'
  ];

  constructor(
    private moduleServices: ConfigService,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getDataTable();
  }

  getDataTable() {
    this.moduleServices.getTableDataCampaingType().subscribe({
      next: (data: entity.TableDataCampaingType[]) => {
        console.log(data);
        
        this.dataSource.data = data;
      },
      error: (error) => console.error(error)
    })
  }

  newOrEditData(data = null) {
    this.dialog.open(ModalNewCampaingCategoriesComponent, {
      data: {
        info : data
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '428px',
      panelClass: 'custom-dialog',
    })
    .afterClosed()
    .subscribe((_) => {
      this.getDataTable()
    });
  }

  deleteData(id: string) {
    this.notificationService
    .notificacion(
      'Pregunta',
      '¿Estás seguro de eliminar el registro?',
      'question',
    )
    .afterClosed()
    .subscribe((response) => {
      if (response) {
        this.moduleServices.deleteDataCampaingType(id).subscribe({
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

  douwnloadExel(){
    this.notificationService
          .notificacion(
            'Éxito',
            'Excel descargado.',
            'save',
            'heroicons_outline:document-arrow-down'
          )
          .afterClosed()
          .subscribe((_) => { });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
