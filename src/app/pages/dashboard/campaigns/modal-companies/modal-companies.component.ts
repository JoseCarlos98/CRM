import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { modalInfoTable } from 'app/shared/interfaces/TableColumns';
import { DashboardService } from '../../dashboard.service';
import * as entidades from '../../dashboard-interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-modal-companies',
  templateUrl: './modal-companies.component.html',
  styleUrl: './modal-companies.component.scss'
})
export class ModalCompaniesComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  public displayedColumns:string[]

  constructor(
    private moduleServices: DashboardService,
		@Inject(MAT_DIALOG_DATA) public data: modalInfoTable,
		private dialogRef: MatDialogRef<any>,
	) { }

  ngOnInit(): void {
    this.displayedColumns = this.data.columns
    this.dataSource.data  = this.data.info
  }

  getCampaingsHistoryCompanies(filters:entidades.DataTableFilters) {
    this.moduleServices.getCampaingsHistoryCompanies().pipe(takeUntil(this.onDestroy)).subscribe({
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
