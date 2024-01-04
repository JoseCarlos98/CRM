import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatHeaderRowDef, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalNewContactComponent } from './components/contact/modal-new-contact/modal-new-contact.component';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent implements OnInit, AfterViewInit {
	public dataSource = new MatTableDataSource<any>([]);
	public dataSourceAgregadosRecientemente = new MatTableDataSource<any>([]);
	public dataSourceMasComprados = new MatTableDataSource<any>([]);
	@ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
	public total = 0;
	public indicePagina = 0;

  public displayedColumnsMascomprados: string[] = ['empresa', 'fechaRegistro', 'monto' ];
  public displayedColumnsAgregadasRecientemente: string[] = ['empresa', 'estatus', 'fechaRegistro', 'monto' ];
  public displayedColumns: string[] = [
    'client',
    'status', 
    'country',
    'origen',
    'categoria', 
    'giro', 
    'campaign', 
    'cotizaciones', 
    'ventas', 
    'fechaUltimoContacto', 
    'history', 
    'acciones'
  ];

  public dataDummy : any[] = [
    {
      estatus : 'LEAD',
      pais : 'México',
      giro : 'Construcción',
      campaign : 'Activa',
      history : 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      categoria : 'LEAD',
      cotizaciones : [
        {
          up : '5',
          bottom : '$15,000.00',

        }
      ],
      ventas : [
        {
          up : '5',
          bottom : '$15,000.00',

        }
      ],
      origen : 'Referencia',
      fechaUltimoContacto : '2022-02-28',
      fechaVencimiento : '2022-02-28',
    },
    {
      estatus : 'CLIENTE',
      pais : 'México',
      giro : 'Construcción',
      campaign : 'Activa',
      history : 'Se envió correo publicitario y se hicieron las llamadas pertinentes para el seguimiento, pero el cliente no contestó en ningún momento.',
      categoria : 'LEAD',
      cotizaciones : [
        {
          up : '5',
          bottom : '$15,000.00',

        }
      ],
      ventas : [
        {
          up : '5',
          bottom : '$15,000.00',

        }
      ],
      origen : 'Referencia',
      fechaUltimoContacto : '2022-02-28',
      fechaVencimiento : '2022-02-28',
    },
  
    
  ]

  public datosAgregadosRecientemente : any[] = [
    {
      empresa : 'Seguridad privada S.A. de S.V.',
      estatus : 'Abierto',
      fechaRegistro : '2020-03-28',
      monto : '$1,000,000.00',
    }
  ]
  
  public datosMascomprados : any[] = [
    {
      empresa : 'Seguridad privada S.A. de S.V.',
      fechaRegistro : '2020-03-28',
      monto : '$1,000,000.00',
    }
  ]

	public fechaHoy = new Date();


  public selectedProject: string = 'todas';

  public formFilters = this.formBuilder.group({
    estatus: [{ value: null, disabled: false }],
    giro: [{ value: null, disabled: false }],
    company: [{ value: null, disabled: false }],
    rangeDateStart: [{ value: null, disabled: false }],
    rangeDateEnd: [{ value: null, disabled: false }],
  });


  constructor(

    private openModalsService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cambiarOpcion('todas')
   }

   ngAfterViewInit(): void {
   }

   cambiarOpcion(opcion : string) {
    if (opcion == 'todas') { 
      this.dataSource.data = this.dataDummy
      this.selectedProject = 'Todas'
    } else if (opcion == 'agregadasRecientemente'){
      this.selectedProject = 'Agregadas recientemente'
      this.dataSourceAgregadosRecientemente.data = this.datosAgregadosRecientemente
    } else {
      this.selectedProject = 'Más comprados'
      this.dataSourceMasComprados.data = this.datosMascomprados
    }
   }

  SearchWithFilters(){
    console.log(this.formFilters.value);
  }

  seeClient(data:any) {
    console.log(data);
    this.router.navigateByUrl(`/home/adquisicion/detalle-cliente/${1}`)
  }

  newClient() {
    this.router.navigateByUrl(`/home/adquisicion/nuevo-cliente`)
  }
}
