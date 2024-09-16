import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ModalNewPriceComponent } from './modal-new-price/modal-new-price.component';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AdminService } from '../../admin.service';
import * as entity from '../../admin-interface';
import { UpdateComponentsService } from 'app/shared/services/updateComponents.service';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
})
export class PriceComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();
  private updateSubscription: Subscription;

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'code',
    'price',
    'tax_percentage',
    'currency',
    'productsApplies',
    'actions'
  ];


  constructor(
    private updateService: UpdateComponentsService,
    private moduleServices: AdminService,
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
    this.moduleServices.getDataTablePrices().subscribe({
        next: (data : entity.DataPriceTable[]) => {
          console.log(data);
          this.dataSource.data = data;
        },
        error: (error) => console.error(error)
      })
  }

  editData(data:any) {
    this.dialog.open(ModalNewPriceComponent, {
      data: {
        info: data
      },
      disableClose: true,
      width: '800px',
      maxHeight: '628px',
      panelClass: 'custom-dialog'
    })
    .afterClosed()
    .subscribe((_) => this.getDataTable());
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
        this.moduleServices.deleteDataPrice(id).subscribe({
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
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
