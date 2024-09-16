import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Subject, takeUntil } from 'rxjs';
import { AdminService } from '../../admin.service';
import { NewDiscountComponent } from './new-discount/new-discount.component';
import * as entity from '../../admin-interface';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
})
export class DiscountsComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'name',
    'scale',
    'productsApply',
    'categoriesApply',
    'countriesApply',
    'currencyApply',
    'actions'
  ];

  public dataDummy: any[] = [
    {
      name: 'CD4557',
      iva: '25.75%',
      currency: '25.75%',
      productsApplies: [
        {
          name : 'Categoría X'
        },
        {
          name : 'Categoría X'
        },
        {
          name : 'Categoría X'
        },
      ],
      scale: [
        {
          name : 'Escala 1'
        },
        {
          name : 'Escala 2'
        },
        {
          name : 'Escala 3'
        },
      ],
      productsApply: [
        {
          name : 'Producto 1'
        },
        {
          name : 'Producto 2'
        },
        {
          name : 'Producto 3'
        },
      ],
      categoriesApply: [
        {
          name : 'Categoría 1'
        },
        {
          name : 'Categoría 2'
        },
        {
          name : 'Categoría 3'
        },
      ],
      countriesApply: [
        {
          name : 'País 1'
        },
        {
          name : 'País 2'
        },
        {
          name : 'País 3'
        },
      ],
      currencyApply: [
        {
          name : 'Moneda 1'
        },
        {
          name : 'Moneda 2'
        },
        {
          name : 'Moneda 3'
        },
      ],
    },
  ]

  constructor(
    private moduleServices: AdminService,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
  ) { }
  
  ngOnInit(): void {
    this.dataSource.data = this.dataDummy;
    this.getDataTable();
  }

  getDataTable() {
    this.moduleServices.getDataTableDiscounts().pipe(takeUntil(this.onDestroy)).subscribe({
        next: ({ data } : entity.DataDiscountTable) => {
          console.log(data);
          this.dataSource.data = data;
        },
        error: (error) => console.error(error)
      })
  }

  editData(id: string) {
    this.dialog.open(NewDiscountComponent, {
      data: {
        idEdit: id
      },
      disableClose: true,
      width: '800px',
      maxHeight: '700px',
      panelClass: 'custom-dialog'
    });
  }


  actionQuestionDelete(id: string) {
    this.notificationService
      .notificacion(
        'Pregunta',
        '¿Estás seguro de eliminar el registro?',
        'question'
      )
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.deleteData(id)
        }
      });
  };

  deleteData(id: string) {
    this.moduleServices.deleteDataDiscount(id).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (_) => {
        this.notificationService
          .notificacion(
            'Éxito',
            'Registro eliminado.',
            'delete',
          );
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }
  
  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
