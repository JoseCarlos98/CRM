import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ModalNewActivityComponent } from 'app/pages/companies/all/detail-client/components/history/modal-new-activity/modal-new-activity.component';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ReactivationService } from '../reactivation.service';
import * as entity from '../reactivation-interface';

@Component({
  selector: 'app-pending-calls',
  templateUrl: './pending-calls.component.html',
})
export class PendingCallsComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;
  public pageSize = 20;
  public currentPage = 0;
  public pageNext = 1;
  public pagePrevious = 0;
  public pageIndex: number = 1;
  public totalPages: number = 0;

  public displayedColumns: string[] = [
    'name',
    'camping',
    'dueDate',
    'expirationTime',
    'user',
    'comments',
    'acciones',
  ];

  public formFilters = this.formBuilder.group({
    estatus: [{ value: null, disabled: false }],
    giro: [{ value: null, disabled: false }],
    company: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });

  public fechaHoy = new Date();

  public searchBar = new FormControl('')
  public paginateNumber = new FormControl('')

  constructor(
    private moduleServices: ReactivationService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchWithFilters()
  }

  ngAfterViewInit(): void {
    this.paginator._intl.nextPageLabel = "Página siguiente";
    this.paginator._intl.previousPageLabel = "Página anterior";
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content:string) => {
      this.applyFilter(content)
    })

    this.paginateNumber.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: any) => {
      this.pageIndex = content 
      if (content <= this.totalPages) this.onPageChange();
    })
  }

  searchWithFilters(excel?: boolean) {
    let filters = "activity_type_id=fde5d736-c7ad-4ccc-9037-d742aa3b8a44&call_pending=true&";

    filters += `page=${this.currentPage + 1}`;
    this.getDataTable(filters)
  }

  getDataTable(filters?: string) {
    this.moduleServices.getDataTableCalls(filters).subscribe({
      next: (data: entity.TableDataCallsMapperResponse) => {
        this.dataSource.data = data.dataList;
        this.pageSize = data.pageSize;
        this.pagePrevious = data.pagePrevious;
        this.pageNext = data.pageNext;
        this.total = data.count;
        this.pageIndex = this.currentPage;
        this.totalPages = Math.ceil(this.total / this.pageSize);
      },
      error: (error) => console.error(error)
    })
  }

  isNumber(value) {
    if (isNaN(value)) {
      return ''
    } else {
      return value
    }
  }

  onPageChange(event?: PageEvent) {
    if (event) {
      this.currentPage = event.pageIndex;
      this.pageSize = event.pageSize;
    } else {
      if (this.pageIndex < 1) this.pageIndex = 1;
      if (this.pageIndex > this.totalPages) {
        this.pageIndex = this.currentPage + 1;
        return;
      }
      this.currentPage = this.pageIndex - 1;
    }
    this.pageNext = this.currentPage + 1;
    this.searchWithFilters();
  }


  newOrEditData(data = null) {
    this.dialog.open(ModalNewActivityComponent, {
      data: {
        info: data,
        type: 'calls'
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })  
    .afterClosed()
    .subscribe((_) => this.searchWithFilters());
  }

  seeCampaignsResults(data:any) {
    this.moduleServices.sendData(data);
    this.router.navigateByUrl('/home/reactivacion/resultados-campanias/calls');
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
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
        this.moduleServices.deleteDataCallOrDaily(id).subscribe({
          next: () => {
              this.notificationService
              .notificacion(
                'Éxito',
                'Registro eliminado.',
                'delete',
              )
              .afterClosed()
              .subscribe((_) => this.searchWithFilters());
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
