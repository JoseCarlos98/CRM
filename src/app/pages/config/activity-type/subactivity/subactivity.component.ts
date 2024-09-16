import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';
import * as entity from '../../config-interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalnewActivityComponent } from '../modalnew-activity/modalnew-activity.component';
import { Subject, Subscription } from 'rxjs';
import { ConfigService } from '../../config.service';
import { UpdateComponentsService } from '../../../../shared/services/updateComponents.service';

@Component({
  selector: 'app-subactivity',
  templateUrl: './subactivity.component.html',
})
export class SubactivityComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();
  private updateSubscription: Subscription;

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'sub_activity',
    'color',
    'actions'
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
    this.moduleServices.getTableDataSubactivityType().subscribe({
      next: (data: entity.TableDataSubactivityType[]) => {
        this.dataSource.data = data;
        console.log(data);

      },
      error: (error) => console.error(error)
    })
  }

  editData(data: any) {
    this.dialog.open(ModalnewActivityComponent, {
      data: {
        info: data,
        type: 'subactivity'
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
        '¿Estás seguro de eliminar el registro?',
        'question',
      )
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.moduleServices.deleteDatSubactivityType(id).subscribe({
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
