import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import * as entity from '../companies-interface';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import moment from 'moment';
import { CatalogsService } from 'app/shared/services/catalogs.service';
import { CompaniesService } from '../companies.service';
@Component({
  selector: 'app-prospects',
  templateUrl: './prospects.component.html',
})
export class ProspectsComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 5;
  public total = 0;
  public indicePagina = 0;
  public pageSize = 20;
  public currentPage = 0;
  public pageNext = 1;
  public pagePrevious = 0;
  public pageIndex: number = 1;
  public totalPages: number = 0;

  public displayedColumns: string[] = [
    'companyName',
    'status',
    'country',
    'origin',
    'category',
    'business',
    'campaign',
    'quotes',
    'sales',
    'lastContactDate',
    'history',
    'acciones'
  ];

  public formFilters = this.formBuilder.group({
    status: [{ value: '', disabled: false }],
    business: [{ value: '', disabled: false }],
    campaign: [{ value: '', disabled: false }],
    rangeDateStart: [{ value: '', disabled: false }],
    rangeDateEnd: [{ value: '', disabled: false }],
  });

  public searchBar = new FormControl('')
  public paginateNumber = new FormControl('')

  public catBusiness: entityGeneral.DataCatBusiness[] = [];
  public catStatus: entityGeneral.DataCatStatus[] = [];
  public catCampaing: entityGeneral.DataCatCampaing[] = [];

  public url = document.location.href;
  public title: string = 'cliente';

  public fechaHoy = new Date();

  constructor(
    private moduleServices: CompaniesService,
    private catalogsServices: CatalogsService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchWithFilters();
    this.getCatalogs()
  }

  ngAfterViewInit(): void {
    this.paginator._intl.nextPageLabel = "Página siguiente";
    this.paginator._intl.previousPageLabel = "Página anterior";
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      this.applyFilter(content); 
    })

    this.paginateNumber.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: any) => {
      this.pageIndex = content
      // this.pageIndex = (content - 1)
      if (content <= this.totalPages) this.onPageChange();
    })
  }

  getCatalogs() {
    this.catalogsServices.getCatBusiness().subscribe({
      next: (data: entityGeneral.DataCatBusiness[]) => {
        this.catBusiness = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatStatus('module_id=1').subscribe({
      next: (data: entityGeneral.DataCatStatus[]) => {
        this.catStatus = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatCampaing().subscribe({
      next: (data: entityGeneral.DataCatCampaing[]) => {
        this.catCampaing = data;
      },
      error: (error) => console.error(error)
    });
  }

  searchWithFilters() {
    let filters: string = 'company_phase=ec43fa4e-1ade-46ea-9841-1692074ce8cd&';

    filters += `page=${this.currentPage + 1}&`;

    if (this.formFilters.get('status').value) filters += `status_id=${this.formFilters.get('status').value}&`;
    if (this.formFilters.get('business').value) filters += `business_id=${this.formFilters.get('business').value}&`;
    if (this.formFilters.get('campaign').value) filters += `campaign_id=${this.formFilters.get('campaign').value}&`;
    if (this.formFilters.get('rangeDateStart').value && this.formFilters.get('rangeDateEnd').value) {
      filters += `register_date_start=${moment(this.formFilters.get('rangeDateStart').value).format('YYYY-MM-DD')}&`,
        filters += `register_date_end=${moment(this.formFilters.get('rangeDateEnd').value).format('YYYY-MM-DD')}&`
    }

    this.getDataTable(filters)
  }

  getDataTable(filters?: string) {
    this.moduleServices.getDataTable(filters).subscribe({
      next: (data: entity.TableDataCompaniesMapperResponse) => {
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

  seeData(id: string) {
    const url = `home/empresas/detalles-empresa/${id}`;
    window.open(url, '_blank');
  }

  newData() {
    this.router.navigateByUrl(`/home/empresas/nuevo-prospecto`)
  }

  editData(id: string) {
    this.router.navigateByUrl(`/home/empresas/editar-prospecto/${id}`)
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
          this.moduleServices.deleteData(id).subscribe({
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

  douwnloadExel(id?: string) {
    // this.moduleServices.excel('prospect', id).pipe(takeUntil(this.onDestroy)).subscribe({
    //   next: (_) => {
    //     this.notificationService
    //       .notificacion(
    //         'Éxito',
    //         'Excel descargado.',
    //         'save',
    //         'heroicons_outline:document-arrow-down'
    //       )
    //       .afterClosed()
    //       .subscribe((_) => {

    //       });
    //   },
    //   error: (error) => console.error(error)
    // })


    this.notificationService
      .notificacion(
        'Éxito',
        '¡Restablecimiento de contraseña enviado!',
        'save',
        'heroicons_outline:document-arrow-down'
      )
      .afterClosed()
      .subscribe((_) => {

      });
  }

  downloadBulkUpload(id?: string) {
    // this.moduleServices.bulkLoad('prospect',id).pipe(takeUntil(this.onDestroy)).subscribe({
    //   next: (_) => {
    //     this.notificationService
    //       .notificacion(
    //         'Éxito',
    //         'Carga masiva.',
    //         'save',
    //         'mat_solid:downloading'
    //       )
    //       .afterClosed()
    //       .subscribe((_) => { });
    //   },
    //   error: (error) => console.error(error)
    // })

    this.notificationService
      .notificacion(
        'Éxito',
        'Carga masiva.',
        'save',
        'mat_solid:downloading'
      )
      .afterClosed()
      .subscribe((_) => {

      });
  }

  async(id?: string) {
    // this.moduleServices.async('prospect', id).pipe(takeUntil(this.onDestroy)).subscribe({
    //   next: (_) => {
    //     this.notificationService
    //       .notificacion(
    //         'Éxito',
    //         'Sincronización.',
    //         'save',
    //         'mat_solid:sync'
    //       )
    //       .afterClosed()
    //       .subscribe((_) => {

    //       });
    //   },
    //   error: (error) => console.error(error)
    // })

    this.notificationService
      .notificacion(
        'Éxito',
        'Sincronización.',
        'save',
        'mat_solid:sync'
      )
      .afterClosed()
      .subscribe((_) => {

      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
