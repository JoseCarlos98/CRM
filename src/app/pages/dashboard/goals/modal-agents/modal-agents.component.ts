import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { modalInfoTable } from 'app/shared/interfaces/TableColumns';
import { DashboardService } from '../../dashboard.service';
import * as entidades from '../../dashboard-interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modal-agents',
  templateUrl: './modal-agents.component.html',
  styleUrl: './modal-agents.component.scss'
})
export class ModalAgentsComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  
  public displayedColumns: string[] = [
    'agent',
    'rol',
    'progress',
    'ip',
    'extension'
  ]

  
  public dataDummy:any[] = [
    {
      agent: 'Agente 1',
      isMain: 'Agente principal',
      rol: 'Atención a cliente',
      progress : {
        expenses: 11763.34,
        expensesLimit: 61763.34,
      },
      ip: '12354',
      extension: '3002',
    },
    {
      agent: 'Agente 1',
      isMain: 'Agente principal',
      rol: 'Atención a cliente',
          progress : {
        expenses: 11763.34,
        expensesLimit: 61763.34,
      },
      ip: '12354',
      extension: '3002',
    },
    {
      agent: 'Agente 1',
      isMain: 'Agente principal',
      rol: 'Atención a cliente',
          progress : {
        expenses: 11763.34,
        expensesLimit: 61763.34,
      },
      ip: '12354',
      extension: '3002',
    },
    {
      agent: 'Agente 1',
      isMain: 'Agente principal',
      rol: 'Atención a cliente',
          progress : {
        expenses: 11763.34,
        expensesLimit: 61763.34,
      },
      ip: '12354',
      extension: '3002',
    },
    {
      agent: 'Agente 1',
      isMain: 'Agente principal',
      rol: 'Atención a cliente',
          progress : {
        expenses: 11763.34,
        expensesLimit: 61763.34,
      },
      ip: '12354',
      extension: '3002',
    },
    {
      agent: 'Agente 1',
      isMain: 'Agente principal',
      rol: 'Atención a cliente',
          progress : {
        expenses: 11763.34,
        expensesLimit: 61763.34,
      },
      ip: '12354',
      extension: '3002',
    },
    {
      agent: 'Agente 1',
      isMain: 'Agente principal',
      rol: 'Atención a cliente',
          progress : {
        expenses: 11763.34,
        expensesLimit: 61763.34,
      },
      ip: '12354',
      extension: '3002',
    },
  ]

  constructor(
    private moduleServices: DashboardService,
		@Inject(MAT_DIALOG_DATA) public data: modalInfoTable,
		private dialogRef: MatDialogRef<any>,
	) {}

  ngOnInit(): void {
    this.dataSource.data  = this.dataDummy
  }

  getGoalsAgents() {
    this.moduleServices.getGoalsAgents().pipe(takeUntil(this.onDestroy)).subscribe({
      next: ({ data }: entidades.DataCampaingsHistoryTable) => {
        console.log(data);
      },
      error: (error) => console.error(error)
    })
  }

  closeModal() {
		this.dialogRef.close({
      close : true
    })
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
