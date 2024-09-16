import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import { Subject, takeUntil } from 'rxjs';
import * as entity from '../../companies-interface';
import { CompaniesService } from '../../companies.service';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrl: './detail-client.component.scss'
})
export class DetailClientComponent implements OnInit {
  private onDestroy = new Subject<void>();

  public dataSourceQuotes = new MatTableDataSource<any>([]);
  public dataSourceCampaign = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  @ViewChild('contactTab') contactTab: ElementRef;

  public selectedTabIndex = 0;

  public displayedColumns: string[] = [
    'empresa',
    'fecha',
    'folio',
    'precioTotal',
    'nivelInteres',
    'estadopais',
    'estatus',
    'agente',
    'lugares',
    'actividades',
    'agregarOpciones',
    'modificarEstatus',
    'acciones',
  ];

  public objEditData: any;
  public phoneCompany: string = '';

  constructor(
    private moduleServices: CompaniesService,
    private activatedRoute: ActivatedRoute,
    private notificationService: OpenModalsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getId()
  }

  getId() {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe((params:any) => {
      if (params.id) this.getDataById(params.id);
    });
  }

  getDataById(id:string) {
    this.moduleServices.getDataDetailsCompanyId(id).subscribe({
      next: (response: entity.GetDataDetailsCompanyMapper) => {
        console.log(response);
        this.objEditData = response;
        this.phoneCompany = response.phone;
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  goCall() {
    console.log(this.objEditData.phone);
    this.router.navigateByUrl(`/home/comunicaciones/voip/${this.objEditData.phone}`)
    
  }

  selectTab(index: number) {
    this.selectedTabIndex = index;
    this.tabGroup.selectedIndex = index;

    const contactosTabElement = document.getElementById('contactosTab');
    if (contactosTabElement) contactosTabElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  goEdit() {
    this.router.navigateByUrl(`/home/empresas/editar-${this.objEditData?.statusCompany}/${this.objEditData?.id}`)
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
