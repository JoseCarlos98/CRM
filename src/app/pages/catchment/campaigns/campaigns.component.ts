import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalInformationInTableComponent } from 'app/pages/catchment/campaigns/modal-information-in-table/modal-information-in-table.component';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { CatchmentService } from '../catchment.service';
import * as entity from '../catchment-interface';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import moment from 'moment';
import { CatalogsService } from 'app/shared/services/catalogs.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
})
export class CampaignsComponent implements OnInit, AfterViewInit, OnDestroy {
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

  public displayedColumnsCampaign: string[] = [
    'codeAndname',
    'dateStartEnd',
    'companyType',
    'agents',
    'companies',
    'results',
    'amounInvested',
    'totalCompanies',
    'quotesMade',
    'totalSalesAmount',
    'actions',
  ];

  public formFilters = this.formBuilder.group({
    status: [{ value: '', disabled: false }],
    type: [{ value: '', disabled: false }],
    agent: [{ value: '', disabled: false }],
    rangeDateStart: [{ value: '', disabled: false }],
    rangeDateEnd: [{ value: '', disabled: false }]
  });

  public catTypes: entityGeneral.DataCatType[] = [];
  public catStatus: entityGeneral.DataCatStatus[] = [];
  public catAgents: entityGeneral.DataCatAgents[] = [];

  public searchBar = new FormControl('');
  public paginateNumber = new FormControl('')

  public fechaHoy = new Date();

  constructor(
    private moduleServices: CatchmentService,
    private catalogsServices: CatalogsService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDataTable();
    this.getCatalogs()
  }

  ngAfterViewInit(): void {
    this.paginator._intl.nextPageLabel = "Página siguiente";
    this.paginator._intl.previousPageLabel = "Página anterior";
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      this.applyFilter(content); 
    });

    this.paginateNumber.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: any) => {
      this.pageIndex = content
      // this.pageIndex = (content - 1)
      if (content <= this.totalPages) this.onPageChange();
    })
  }

  getCatalogs() {
    this.catalogsServices.getCatCapaignType().subscribe({
      next: (data: entityGeneral.DataCatType[]) => {
        this.catTypes = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatStatus('module_id=1').subscribe({
      next: (data: entityGeneral.DataCatStatus[]) => {
        this.catStatus = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatAgents().subscribe({
      next: (data: entityGeneral.DataCatAgents[]) => {
        this.catAgents = data;
      },
      error: (error) => console.error(error)
    });
  }

  searchWithFilters() {
    let filters = '';

    filters += `page=${this.currentPage + 1}&`;

    if (this.formFilters.get('status').value) filters += `status_id=${this.formFilters.get('status').value}&`;
    if (this.formFilters.get('type').value) filters += `campaign_type_id=${this.formFilters.get('type').value}&`;
    if (this.formFilters.get('agent').value) filters += `user_id=${this.formFilters.get('agent').value}&`;
    if (this.formFilters.get('rangeDateStart').value && this.formFilters.get('rangeDateEnd').value) {
      filters += `start_date=${moment(this.formFilters.get('rangeDateStart').value).format('YYYY-MM-DD')}&`,
        filters += `end_date=${moment(this.formFilters.get('rangeDateEnd').value).format('YYYY-MM-DD')}&`
    }

    this.getDataTable(filters)
  }

  getDataTable(filters?: any) {
    this.moduleServices.getDataTableCampaing(filters).subscribe({
      next: (data: entity.TableDataCampaingMapperResponse) => {
        console.log('getDataTable' , data);
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


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  newData() {
    this.router.navigateByUrl(`home/captacion/nueva-campania`)
  }

  editData(id: string) {
    this.router.navigateByUrl(`home/captacion/editar-campania/${id}`)
  }

  cloneData(id: string) {
    this.router.navigateByUrl(`home/captacion/clonar-campania/${id}`)
  }

  seeCampaignsResults(data:any) {
    console.log(data);
    this.moduleServices.sendData(data);
    this.router.navigateByUrl('/home/captacion/resultados-campanias/campaign');
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

  seeDataModal(type: string, data: entityGeneral.User | entity.Company, CampaingName: String) {
    this.dialog.open(ModalInformationInTableComponent, {
      data: {
        type: type,
        info: data,
        campaingName: CampaingName,
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '700px',
      panelClass: 'custom-dialog',
    });
  }

  douwnloadExel() {
    //   this.moduleServices.excel(id).pipe(takeUntil(this.onDestroy)).subscribe({
    //   next: (_) => {
    //     this.notificationService
    //       .notificacion(
    //         'Éxito',
    //         'Excel descargado.',
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
        'Excel descargado.',
        'save',
        'heroicons_outline:document-arrow-down'
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


