import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ModalUploadDocumentComponent } from '../modal-upload-document/modal-upload-document.component';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ConversionService } from '../conversion.service';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import moment from 'moment';
import { ModalCloseSaleComponent } from '../modal-close-sale/modal-close-sale.component';
import { CatalogsService } from 'app/shared/services/catalogs.service';
import { ModalBillingComponent } from '../modal-billing/modal-billing.component';
import { TableDataQuoteMapperResponse } from '../conversion-interface';
import { filter } from 'lodash';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styles: [`
      .c-quote {
        ::ng-deep .mat-mdc-tab-body-content {
          padding: 0!important;
          overflow: hidden!important;
        }
      }
  `]
})
export class QuotesComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina: number = 50;
  public total: number = 0;
  public pageSize: number = 20;
  public currentPage: number = 0;
  public pageNext: number = 1;
  public pagePrevious: number = 0;
  public pageIndex: number = 1;
  public totalPages: number = 0;

  public displayedColumns: string[] = [
    'dateAndHour',
    'information',
    'companyName',
    'status',
    'totalPrice',
    'products',
    'stateCountry',
    'actions',
    'operations'
  ];

  public formFilters = this.formBuilder.group({
    status: [{ value: null, disabled: false }],
    agent: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });

  public searchBar = new FormControl('')
  public paginateNumber = new FormControl('')

  public actions = new FormControl('')

  public catStatus: entityGeneral.DataCatStatus[] = [];
  public catAgents: entityGeneral.DataCatAgents[] = [];

  public fechaHoy = new Date();

  public totalQuotes: number = 0;
  public filterDayMonthYear: string = 'Mes'

  constructor(
    private moduleServices: ConversionService,
    private catalogsServices: CatalogsService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCatalogs();
    this.searchWithFilters();
  }

  ngAfterViewInit(): void {
    this.paginator._intl.nextPageLabel = "Página siguiente";
    this.paginator._intl.previousPageLabel = "Página anterior";
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      this.applyFilter(content)
    })

    this.paginateNumber.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: any) => {
      // this.pageIndex = (content - 1)
      this.pageIndex = content
      if (content <= this.totalPages) this.onPageChange();
    })
  }

  getCatalogs() {
    this.catalogsServices.getCatStatus('module_id=5').subscribe({
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

  searchWithFilters(excel?: boolean) {
    let filters = "";

    filters += `page=${this.currentPage + 1}&`;


    if (this.formFilters.get('status').value) filters += `status_id=${this.formFilters.get('status').value}&`;
    if (this.formFilters.get('agent').value) filters += `user_id=${this.formFilters.get('agent').value}&`;
    if (this.formFilters.get('rangeDateStart').value && this.formFilters.get('rangeDateEnd').value) {
      filters += `register_date_start=${moment(this.formFilters.get('rangeDateStart').value).format('YYYY-MM-DD')}&`,
        filters += `register_date_end=${moment(this.formFilters.get('rangeDateEnd').value).format('YYYY-MM-DD')}&`
    }

    if (!this.formFilters.get('status').value && !this.formFilters.get('agent').value && !this.formFilters.get('rangeDateStart').value && !this.formFilters.get('rangeDateEnd').value) {
      if (this.filterDayMonthYear == 'Día') filters += `current_day=true&`
      else if (this.filterDayMonthYear == 'Mes') filters += `current_month=true&`
      else filters += `current_year=true&`
    }

    if (excel) {
      filters += `download=true`
      this.downloadExcel(filters)
    } else this.getDataTable(filters)
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

  getDataTable(filters: string) {
    this.moduleServices.getDataTable(filters).subscribe({
      next: (data: TableDataQuoteMapperResponse) => {
        this.dataSource.data = data.dataList;
        this.totalQuotes = data.totalQuotes;
        this.pageSize = data.pageSize;
        this.pagePrevious = data.pagePrevious;
        this.pageNext = data.pageNext;
        this.total = data.count;
        this.pageIndex = this.currentPage;
        this.totalPages = Math.ceil(this.total / this.pageSize);
      },
      error: (error) => console.error(error)
    });
  }
  
  isNumber(value) {
    if (isNaN(value)) {
      return ''
    } else {
      return value
    }
  }


  getActions(type: string, data: any) {
    if (type == 'Aceptar') {
      this.acceptQuote({
        company_id: data.companyName.id,
        quote_id: data.id,
        status_id: '3944df8e-d359-4569-b712-ea174be69cca'
      })
    } else if (type == 'Cerrar como venta') {
      this.closeSale(data)
    } else if (type == 'Rechazar') {
      this.rejectQuote({
        company_id: data.companyName.id,
        quote_id: data.id,
        status_id: '92014f59-ea76-41ea-bbad-396c4fe3dd73'
      })
    } else if (type == 'Cancelar') {
      this.cancelQuote({
        company_id: data.companyName.id,
        quote_id: data.id,
        status_id: '0830d65c-8fb3-488b-aa3f-56f0ebbd6983'
      })
    }
  }

  seeData(id: string) {
    //this.router.navigateByUrl(`/home/conversion/detalle-cotizacion/${id}`)
    const url = `/home/conversion/detalle-cotizacion/${id}`;
    window.open(url, '_blank');
  }

  seeDataCompany(id: string) {
    const url = `home/empresas/detalles-empresa/${id}`;
    window.open(url, '_blank');
  }

  editData(id: string) {
    this.router.navigateByUrl(`/home/conversion/editar-cotizacion/${id}`)
  }

  newData() {
    this.router.navigateByUrl(`/home/conversion/nueva-cotizacion`)
  }

  selectOption(option: string) {
    this.filterDayMonthYear = option;
    this.searchWithFilters();
  }

  acceptQuote(data: any) {
    this.notificationService
      .notificacion(
        'Pregunta',
        '¿Estás seguro de aceptar la cotización?',
        'question',
      )
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.moduleServices.acceptQuote({ quote: data }).subscribe({
            next: () => {
              this.notificationService
                .notificacion(
                  'Éxito',
                  'Cotización aceptada.',
                  'save',
                )
                .afterClosed()
                .subscribe((_) => this.searchWithFilters());
            },
            error: (error) => console.error(error)
          })
        }
      });
  }

  rejectQuote(data: any) {
    this.notificationService
      .notificacion(
        'Pregunta',
        '¿Estás seguro de rechazar la cotización?',
        'question',
      )
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.moduleServices.rejectQuote({ quote: data }).subscribe({
            next: () => {
              this.notificationService
                .notificacion(
                  'Éxito',
                  'Cotización rechazada.',
                  'save',
                )
                .afterClosed()
                .subscribe((_) => this.searchWithFilters());
            },
            error: (error) => console.error(error)
          })
        }
      });
  }

  cancelQuote(data: any) {
    this.notificationService
      .notificacion(
        'Pregunta',
        '¿Estás seguro de cancelar la cotización?',
        'question',
      )
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.moduleServices.cancelQuote({ quote: data }).subscribe({
            next: () => {
              this.notificationService
                .notificacion(
                  'Éxito',
                  'Cotización rechazada.',
                  'save',
                )
                .afterClosed()
                .subscribe((_) => this.searchWithFilters());
            },
            error: (error) => console.error(error)
          })
        }
      });
  }

  moneyAccount(data: any) {
    let objData: any = {
      payment_date: new Date(),
      status_id: 'f4fa3c48-8b48-4d39-ad09-a6699a66459f',
      quote_id: data.id,
      company_id: data.companyName.id,
    }
    console.log('moneyAccount', objData);

    this.notificationService
      .notificacion(
        'Pregunta',
        '¿Estás seguro que el dinero ya está en la cuenta bancaria?',
        'question',
      )
      .afterClosed()
      .subscribe((response) => {
        if (response) {
          this.moduleServices.moneyAccount({ quote: objData }).subscribe({
            next: () => {
              this.notificationService
                .notificacion(
                  'Éxito',
                  'Dinero en cuenta, pago confirmado.',
                  'save',
                )
                .afterClosed()
                .subscribe((_) => this.searchWithFilters());
            },
            error: (error) => console.error(error)
          })
        }
      });
  }

  closeSale(data: any) {
    this.dialog.open(ModalCloseSaleComponent, {
      data: {
        info: data,
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
      .afterClosed()
      .subscribe((_) => this.searchWithFilters());
  }

  billing(data: any) {
    this.dialog.open(ModalBillingComponent, {
      data: {
        info: data,
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
      .afterClosed()
      .subscribe((_) => this.searchWithFilters());
  }

  addUpladFile() {
    this.dialog.open(ModalUploadDocumentComponent, {
      data: {},
      disableClose: true,
      width: '800px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
      .afterClosed()
      .subscribe((_) => this.searchWithFilters());
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

  downloadPdf() {
    this.notificationService
      .notificacion(
        'Éxito',
        'PDF descargado.',
        'save',
        'mat_outline:picture_as_pdf'
      )
      .afterClosed()
      .subscribe((_) => {
      });
  }

  downloadExcel(filters: string) {
    window.open(`https://backend.abrevia.io/api/v1/conversion/quote/?${filters}`)
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // onPageChange(event?: PageEvent) {
  //   this.currentPage = event.pageIndex;
  //   this.pageSize = event.pageSize;
  //   this.pageNext = this.currentPage + 1;

  //   this.searchWithFilters();
  // }



  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
