import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject, Subscription } from 'rxjs';
import { UpdateComponentsService } from 'app/shared/services/updateComponents.service';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-users-rol',
  templateUrl: './users-rol.component.html',
})
export class UsersRolComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();
  private updateSubscription: Subscription;

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;
  public pageSize = 20;
  public currentPage = 0;
  public pageNext = 1;
  public pagePrevious = 0;

  public displayedColumns: string[] = [
    'name',
    'acciones'
  ];

  constructor(
    private moduleServices: AdminService,
    private notificationService: OpenModalsService,
    private updateService: UpdateComponentsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDataTable();
    this.paginator._intl.nextPageLabel = "Página siguiente";
    this.paginator._intl.previousPageLabel = "Página anterior";
    this.updateSubscription = this.updateService.updateEvent$.subscribe(() => {
      this.getDataTable();
    });
  }
  

  getDataTable() {
    let filters = '';
    
    if(this.pageNext == null)
      this.pageNext = 1

    filters += `page=${this.pageNext}&`;

    this.moduleServices.getDataTableRoles(filters).subscribe({
      next: (data:any) => {
        this.dataSource.data = data;
        this.pageSize = data.pageSize;
        this.pagePrevious = data.pagePrevious;
        this.pageNext = data.pageNext;
        this.total = data.count;
      },
      error: (error) => console.error(error)
    })
  }

  editData(id:string) {
    this.router.navigateByUrl(`/home/admin/editar-rol/${id}`)
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
        this.moduleServices.deleteDataRol(id).subscribe({
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

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.pageNext = this.currentPage + 1;
    this.getDataTable()
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
