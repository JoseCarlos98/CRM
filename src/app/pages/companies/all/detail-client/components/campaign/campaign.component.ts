import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CompaniesService } from 'app/pages/companies/companies.service';
import { CatchmentService } from 'app/pages/catchment/catchment.service';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormControl } from '@angular/forms';
import { TableDataCampaingMapper, TableDataCampaingMapperResponse } from 'app/pages/catchment/catchment-interface';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalInformationInTableComponent } from 'app/pages/catchment/campaigns/modal-information-in-table/modal-information-in-table.component';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
})
export class CampaignComponent implements OnInit, AfterViewInit, OnDestroy {
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

  @Input() idCompany:string = '';

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
    'acciones',
  ];

  public searchBar = new FormControl('');

  constructor(
    private moduleServices: CompaniesService,
    private moduleServicesCampaing: CatchmentService,
    private notificationService: OpenModalsService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.idCompany);
    if (this.idCompany) this.getDataTable()
  }

  ngAfterViewInit(): void {
    this.paginator._intl.nextPageLabel = "Página siguiente";
    this.paginator._intl.previousPageLabel = "Página anterior";
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      console.log(content);
    })
  }

  getDataTable() {
    const filtro = `company_id=${ this.idCompany }`

    this.moduleServicesCampaing.getDataTableCampaing(filtro).subscribe({
      next: (data: TableDataCampaingMapperResponse) => {
        this.dataSource.data = data.dataList;
        this.pageSize = data.pageSize;
        this.pagePrevious = data.pagePrevious;
        this.pageNext = data.pageNext;
        this.total = data.count;
        console.log(data);
        
      },
      error: (error) => console.error(error)
    })
  }

  seeCampaignsResults(data:any) {
    console.log(data);
    this.moduleServicesCampaing.sendData(data);
    this.router.navigateByUrl('/home/captacion/resultados-campanias/campaign');
  }

  seeDataModal(type: string, data: any) {
    this.dialog.open(ModalInformationInTableComponent, {
      data: {
        type: type,
        info: data
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '700px',
      panelClass: 'custom-dialog',
    });
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
        this.moduleServicesCampaing.deleteData(id).subscribe({
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
