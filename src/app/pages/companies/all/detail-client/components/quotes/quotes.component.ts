import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { CompaniesService } from 'app/pages/companies/companies.service';
import { ConversionService } from 'app/pages/conversion/conversion.service';
import { ModalCloseSaleComponent } from 'app/pages/conversion/modal-close-sale/modal-close-sale.component';
import { ModalBillingComponent } from 'app/pages/conversion/modal-billing/modal-billing.component';
import { ModalUploadDocumentComponent } from 'app/pages/conversion/modal-upload-document/modal-upload-document.component';
import { TableDataQuoteMapperResponse } from 'app/pages/conversion/conversion-interface';

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
export class QuotesComponent implements OnInit {
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

  @Input() idCompany:string = '';
 
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

  public searchBar = new FormControl('')
  public companyData:any = '';

  constructor(
    private moduleServices: CompaniesService,
    private moduleServicesQuote: ConversionService,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.idCompany) this.getDataTable()
  }
  
  ngAfterViewInit(): void {
    this.paginator._intl.nextPageLabel = "Página siguiente";
    this.paginator._intl.previousPageLabel = "Página anterior";
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      this.applyFilter(content)
    })
  }

  getDataTable() {
    let filters = `company_id=${ this.idCompany }&`;

    if(this.pageNext == null)
      this.pageNext = 1

    filters += `page=${this.pageNext}&`;
    
    this.moduleServicesQuote.getDataDetailQuoteTable(filters).subscribe({
      next: ( data : TableDataQuoteMapperResponse) => {
        console.log(data);
        this.dataSource.data = data.dataList;
        this.pageSize = data.pageSize;
        this.pagePrevious = data.pagePrevious;
        this.pageNext = data.pageNext;
        this.total = data.count;
        
        this.companyData = data?.dataList[0]?.companyName
      },
      error: (error) => console.error(error)
    })
  }

  newData() {
    this.moduleServices.sendData(this.companyData);
    this.router.navigateByUrl('/home/conversion/nueva-cotizacion')
  }

  getActions(type:string, data:any) {
    if (type == 'Aceptar') {
      this.acceptQuote({
        company_id : data.companyName.id,
        quote_id : data.id,
        status_id : '3944df8e-d359-4569-b712-ea174be69cca'
      }) 
    } else if(type == 'Cerrar como venta') {
      this.closeSale(data)
    }
  }

  acceptQuote(data : any) {
    this.notificationService
    .notificacion(
      'Pregunta',
      '¿Estás seguro de aceptar la cotización?',
      'question',
    )
    .afterClosed()
    .subscribe((response) => {
      if (response) {
        this.moduleServicesQuote.acceptQuote({quote : data}).subscribe({
          next: () => {
              this.notificationService
              .notificacion(
                'Éxito',
                'Cotización aceptada.',
                'save',
              )
              .afterClosed()
              .subscribe((_) => this.getDataTable());
          },
          error: (error) => console.error(error)
        })
      }
    });
  }

  moneyAccount(data:any) {
    let objData:any = {
      payment_date: new Date(),
      status_id : 'f4fa3c48-8b48-4d39-ad09-a6699a66459f',
      quote_id : data.id,
      company_id : data.companyName.id,
    }
    
    this.notificationService
    .notificacion(
      'Pregunta',
      '¿Estás seguro que el dinero ya está en la cuenta bancaria?',
      'question',
    )
    .afterClosed()
    .subscribe((response) => {
      if (response) {
        this.moduleServicesQuote.moneyAccount({quote: objData}).subscribe({
          next: () => {
              this.notificationService
              .notificacion(
                'Éxito',
                'Dinero en cuenta, pago confirmado.',
                'save',
              )
              .afterClosed()
              .subscribe((_) => this.getDataTable());
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
        this.moduleServices.deleteData(id).subscribe({
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
  
  editData(id:string) {
    this.router.navigateByUrl(`/home/conversion/editar-cotizacion/${id}`)
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
    .subscribe((_) => this.getDataTable());
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
  .subscribe((_) => this.getDataTable());
  }

  seeData(id:string) {
    //this.router.navigateByUrl(`/home/conversion/detalle-cotizacion/${id}`)
    const url = `/home/conversion/detalle-cotizacion/${id}`;
    window.open(url, '_blank');
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
          .subscribe((_) => {

          });
  }

  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
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
