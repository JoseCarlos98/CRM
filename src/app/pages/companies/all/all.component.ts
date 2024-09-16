import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import * as entity from '../companies-interface';
import { DataCatBusiness } from 'app/shared/interfaces/general-interface';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import moment from 'moment';
import { CatalogsService } from 'app/shared/services/catalogs.service';
import { CompaniesService } from '../companies.service';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrl: './all.component.scss'
})
export class AllComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  public dataSourceRecentlyAddedMoreBuyed = new MatTableDataSource<any>([]);
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
  // 

  public displayedColumnsRecentlyAddedMoreBuyed: string[] = ['companyName', 'status', 'registrationDate', 'amount'];
 
  public displayedColumns: string[] = [
    'companyName',
    'status',
    'country',
    'origin',
    'category',
    'business',
    'campaing',
    'quotes',
    'sales',
    'lastContactDate',
    'history',
    'acciones'
  ];

  public datosAgregadosRecientemente: any[] = [
    {
      empresa: 'Seguridad privada S.A. de S.V.',
      estatus: 'Abierto',
      fechaRegistro: '2020-03-28',
      monto: '$1,000,000.00',
    }
  ]

  public datosMascomprados: any[] = [
    {
      empresa: 'Seguridad privada S.A. de S.V.',
      fechaRegistro: '2020-03-28',
      monto: '$1,000,000.00',
    }
  ]

  public formFilters = this.formBuilder.group({
    status: [{ value: '', disabled: false }],
    business: [{ value: '', disabled: false }],
    campaign: [{ value: '', disabled: false }],
    rangeDateStart: [{ value: '', disabled: false }],
    rangeDateEnd: [{ value: '', disabled: false }],
  });

  public searchBar = new FormControl('');

  public fechaHoy = new Date();

  public selectedProject: string = 'todas';
  public paginateNumber = new FormControl('')


  public catBusiness: entityGeneral.DataCatBusiness[] = [];
  public catStatus: entityGeneral.DataCatStatus[] = [];
  public catCampaing: entityGeneral.DataCatCampaing[] = [];

  constructor(
    private catalogsServices: CatalogsService,
    private moduleServices: CompaniesService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cambiarOpcion('todas')
    // this.getDataTable();
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
      next: (data: DataCatBusiness[]) => {
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

    this.searchWithFilters()
  }

  searchWithFilters() {
    let filters = '';
    
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
     
  getDataTable(filters?:string) {
    this.moduleServices.getDataTable(filters).subscribe({
      next: (data: entity.TableDataCompaniesMapperResponse) => {
        if (this.selectedProject == 'Todas') {
          this.dataSource.data = data.dataList;
        } else {
          this.dataSourceRecentlyAddedMoreBuyed.data = data.dataList;
        } 

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
    //this.router.navigateByUrl(`home/empresas/detalles-empresa/${id}`)
    const url = `home/empresas/detalles-empresa/${id}`;
    window.open(url, '_blank');
  }

  newData() {
    this.router.navigateByUrl(`/home/empresas/todos-nuevo-cliente`)
  }

  editData(data: any) {
    if (data.status == 'Prospecto') {
      this.router.navigateByUrl(`/home/empresas/editar-prospecto/${data.id}`)
    } else  if (data.status == 'Cliente') {
      this.router.navigateByUrl(`/home/empresas/editar-cliente/${data.id}`)
    } else {
      this.router.navigateByUrl(`/home/empresas/editar-lead/${data.id}`)
    }
  }

  cambiarOpcion(opcion: string) {
    if (opcion == 'todas') {
      this.selectedProject = 'Todas'
    } else if (opcion == 'agregadasRecientemente') {
      this.selectedProject = 'Agregadas recientemente'
      this.getDataTable('company_recent=true');
    } else {
      this.selectedProject = 'Más comprados'
      this.getDataTable('company_buy=true');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();

    if (this.selectedProject == 'Todas') {
      this.dataSource.filter = filterValue;
    } else {
      this.dataSourceRecentlyAddedMoreBuyed.filter = filterValue;
    } 
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

  douwnloadExel() {
    this.moduleServices.excel('CADENA').pipe(takeUntil(this.onDestroy)).subscribe({
      next: (_) => {
        this.notificationService
          .notificacion(
            'Éxito',
            'Excel descargado.',
            'save',
            'heroicons_outline:document-arrow-down'
          )
          .afterClosed()
          .subscribe((_) => {

          });
      },
      error: (error) => console.error(error)
    })


    this.notificationService
      .notificacion(
        'Éxito',
        'Excel descargado.',
        'save',
        'heroicons_outline:document-arrow-down'
      )
      .afterClosed()
      .subscribe((_) => {

      });
  }

  async(id?: string) {
    this.moduleServices.async(id).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (_) => {
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
      },
      error: (error) => console.error(error)
    })

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
