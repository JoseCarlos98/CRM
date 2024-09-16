import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AdminService } from '../admin.service';
import * as entity from '../admin-interface';
import moment from 'moment';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import { ModalInformationInTableComponent } from 'app/pages/catchment/campaigns/modal-information-in-table/modal-information-in-table.component';

@Component({
  selector: 'app-bonuses',
  templateUrl: './bonuses.component.html',
  styleUrl: './bonuses.component.scss'
})
export class BonusesComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns: string[] = [
    'name',
    'assignedTask',
    'periodThe',
    'solutions',
    'bonusType',
    'agent',
    'base',
    'goal',
    'acciones'
  ];

  public formFilters = this.formBuilder.group({
    rangeDateStart: [{ value: '', disabled: false }],
    rangeDateEnd: [{ value: '', disabled: false }],
  });

  public searchBar = new FormControl('')

  public fechaHoy = new Date();

  public isBono :boolean = true;
  
  constructor(
    private moduleServices: AdminService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.searchWithFilters();
  }

  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      this.applyFilter(content); 
    })
  }

  searchWithFilters() {
    let filters: string = '';

    if (this.formFilters.get('rangeDateStart').value && this.formFilters.get('rangeDateEnd').value) {
      filters += `deadline_start=${moment(this.formFilters.get('rangeDateStart').value).format('YYYY-MM-DD')}&`,
        filters += `deadline_end=${moment(this.formFilters.get('rangeDateEnd').value).format('YYYY-MM-DD')}&`
    }

    this.getDataTable(filters)
  }

  getDataTable(filters?: string) {
    this.moduleServices.getDataTableBonus(filters).subscribe({
      next: (data: entity.TableDataBonusMapper[]) => {
        this.dataSource.data = data;
        console.log(data);
      },
      error: (error) => console.error(error)
    })
  }

  newData() {
    this.router.navigateByUrl(`/home/admin/nuevo-bono`)
  }

  editData(id: string) {
    this.router.navigateByUrl(`home/admin/editar-bono/${id}`)
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
        this.moduleServices.deleteDataBonus(id).subscribe({
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

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
