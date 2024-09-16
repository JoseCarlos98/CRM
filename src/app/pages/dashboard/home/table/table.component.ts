import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  @Input() displayedColumns: string[] = []
  @Input() dataDummy: string[] = []
  @Input() type: string = ''
  @Input() searchAndExcel: boolean = false

  constructor(
    private notificationService: OpenModalsService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.dataSource.data = this.dataDummy
  }

  seeData(id: string) {
    //this.router.navigateByUrl(`/home/empresas/detalles-empresa/${id}`)
    const url = `home/empresas/detalles-empresa/${id}`;
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

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
