import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DashboardService } from '../dashboard.service';
import { Subject, takeUntil } from 'rxjs';
import * as entidades from '../dashboard-interface';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrl: './pipeline.component.scss'
})
export class PipelineComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  // TABLA 

  public displayedColumns: string[] = [
    'fechaYHora',
    'informacion',
    'empresa',
    'statusCompany',
    'totalPrice',
    'products',
    'estadopais',
    'acciones',
    'operaciones'
  ];

  public dataDummy: any[] = [
    {
      empresa: 'RECK SOLUCIONES',
      fechaYHora: '2023-09-30 12:38:49',
      statusCompany: 'Cliente',
      precioTotal: '$4,000,000.00',
      estatus: 'LEAD',
      estadopais: 'Mexico, Nuevo Leon',
      totalPrice: [
        {
          op: ' $12354.00',
          expires: '2023-09-30',
        },
        {
          op: ' $12354.00',
          expires: '2023-09-30',
        }
      ],
      documentos: [
        {
          cotizacion: 'Cotización',
          cotizacionAprobada: 'Cotización aprobada',
        }
      ],
      informacion: [
        {
          numero: '#4234234',
          status: 'Aprobada',
          cotizacionAprobada: 'Cotización aprobada',
        }
      ],
      lugares: [
        {
          no: '1548',
          tipo: 'Lista',
          lugares: '5',
          curso: 'C029 - Seguridad en el mantenimiento de instalaciones eléctrica',
          precio: '$1,995.00',
        }
      ],
    }
  ]

  public formFilters = this.formBuilder.group({
    client: [{ value: null, disabled: false }],
    agent: [{ value: null, disabled: false }],
    status: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });

  public fechaHoy = new Date();

  constructor(
    private moduleServices: DashboardService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.dataDummy
  }

  ngAfterViewInit(): void {
    
  }

  searchWithFilters() {
    console.log(this.formFilters.value);
  }

  newDataQuote() {
    this.router.navigateByUrl(`/home/conversion/nueva-cotizacion`)
  }
  
  getPipeline(filters:entidades.DataTableFilters) {
    this.moduleServices.getPipeline(filters).pipe(takeUntil(this.onDestroy)).subscribe({
      next: ({ data }: entidades.DataProductsTable) => {
        console.log(data);
      },
      error: (error) => console.error(error)
    })
  }

  onTabChange(event: MatTabChangeEvent): void {
    console.log(event.tab.textLabel);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
