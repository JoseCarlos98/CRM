import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalAgentsComponent } from './modal-agents/modal-agents.component';
import { ModalBonusProgressComponent } from './modal-bonus-progress/modal-bonus-progress.component';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import * as entidades from '../dashboard-interface';


@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.scss'
})
export class GoalsComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  public dataSourceGoalHistory = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatPaginator) paginatorGoalHistory!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;
  public longitudPaginaGoals = 50;
  public totalGoals = 0;
  public indicePaginaGoals = 0;

  // TABLA 

  public displayedColumnsGoals: string[] = [
    'bonusName',
    'taskAssigned',
    'period',
    'agent',
    'compliance',
    'bonusAchieved'
  ];

  public dataDummyGoals: any[] = [
    {
      bonusName: 'Nombre 1',
      taskAssigned: 'Campaña',
      agent: 'Ver agentes',
      compliance: '25%',
      bonusAchieved: '$20,000.00',
      period: {
        inicial: '2022-02-28',
        final: '2022-02-28',

      }
    },
    {
      bonusName: 'Nombre 1',
      taskAssigned: 'Campaña',
      agent: 'Ver agentes',
      compliance: '25%',
      bonusAchieved: '$20,000.00',
      period: {
        inicial: '2022-02-28',
        final: '2022-02-28',

      }
    },
    {
      bonusName: 'Nombre 1',
      taskAssigned: 'Campaña',
      agent: 'Ver agentes',
      compliance: '25%',
      bonusAchieved: '$20,000.00',
      period: {
        inicial: '2022-02-28',
        final: '2022-02-28',

      }
    },
    {
      bonusName: 'Nombre 1',
      taskAssigned: 'Campaña',
      agent: 'Ver agentes',
      compliance: '25%',
      bonusAchieved: '$20,000.00',
      period: {
        inicial: '2022-02-28',
        final: '2022-02-28',

      }
    },
    {
      bonusName: 'Nombre 1',
      taskAssigned: 'Campaña',
      agent: 'Ver agentes',
      compliance: '25%',
      bonusAchieved: '$20,000.00',
      period: {
        inicial: '2022-02-28',
        final: '2022-02-28',

      }
    },
  ]

  public displayedColumns: string[] = [
    'goals',
    'taskAssigned',
    'agents',
    'actions',
  ];

  public dataDummy: any[] = [
    {
      goals: {
        bono: 'Bono 1',
        expenses: 111763.34,
        expensesLimit: 61763.34,
      },
      taskAssigned: '_',
      agents: '_',
    },
    {
      goals: {
        bono: 'Bono 2',
        expenses: 111763.34,
        expensesLimit: 61763.34,
      },
      taskAssigned: '_',
      agents: '_',
    },
    {
      goals: {
        bono: 'Bono 3',
        expenses: 111763.34,
        expensesLimit: 61763.34,
      },
      taskAssigned: '_',
      agents: '_',
    },
  ]

  constructor(
    private moduleServices: DashboardService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    setTimeout(() => {

      this.dataSource.data = this.dataDummy
      this.dataSourceGoalHistory.data = this.dataDummyGoals
    }, 500);
  }

  ngAfterViewInit(): void {
    
  }

  getGoalsTable() {
    this.moduleServices.getGoalsTable().pipe(takeUntil(this.onDestroy)).subscribe({
      next: ({ data }: entidades.DataCampaingsHistoryTable) => {
        console.log(data);
      },
      error: (error) => console.error(error)
    })
  }

  getGoalsHistors() {
    this.moduleServices.getGoalsHistors().pipe(takeUntil(this.onDestroy)).subscribe({
      next: ({ data }: entidades.DataCampaingsHistoryTable) => {
        console.log(data);
      },
      error: (error) => console.error(error)
    })
  }
  



  editData(data: any) {
    this.router.navigateByUrl(`home/dashboard/editar-meta/1`)
  }

  seeData(data: any) {
    this.router.navigateByUrl(`home/dashboard/nueva-meta`)
  }

  newData() {
    this.router.navigateByUrl(`home/dashboard/nueva-meta`)
  }

  seeBonusProgress() {
    this.dialog.open(ModalBonusProgressComponent, {
      data: {},
      disableClose: true,
      width: '1000px',
      maxHeight: '700px',
      panelClass: 'custom-dialog',
    });
  }

  seeAgents() {
    this.dialog.open(ModalAgentsComponent, {
      data: {},
      disableClose: true,
      width: '1000px',
      maxHeight: '700px',
      panelClass: 'custom-dialog',
    });
  }

  deleteData() {
    this.notificationService
      .notificacion(
        'Pregunta',
        '¿Estás seguro de eliminar el registro?',
        'question',
      )
      .afterClosed()
      .subscribe((_) => {
        this.notificationService
          .notificacion(
            'Éxito',
            'Registro eliminado.',
            'delete',
          )
          .afterClosed()
          .subscribe((_) => {

          });
      });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
