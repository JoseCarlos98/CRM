import { Component, Input, OnInit } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { MatDialog } from '@angular/material/dialog';
import { DateTime } from 'luxon';
import { ModalNewActivityComponent } from './modal-new-activity/modal-new-activity.component';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { CompaniesService } from 'app/pages/companies/companies.service';
import { FormControl } from '@angular/forms';
import { CatalogsService } from 'app/shared/services/catalogs.service';
import * as entityGeneral from '../../../../../../shared/interfaces/general-interface';
import { GetDataDetailsHistoryMapper } from 'app/pages/companies/companies-interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  private onDestroy = new Subject<void>();
  
  @Input() objEditData:any;

  public history : GetDataDetailsHistoryMapper[] = [];
  public catActivityType: entityGeneral.DataCatActivityType[] = [];

  public searchBar = new FormControl('')
  public activityType = new FormControl('')

  constructor(
    private moduleServices: CompaniesService,
    private catalogsServices: CatalogsService,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    // console.log(this.objEditData);
    if (this.objEditData) this.getDataTable()
    this.getCatalogs()
  }

  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      console.log(content);
    });

    this.activityType.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      if (content) this.getDataTable(content);
    });
  }

  getCatalogs() {
    this.catalogsServices.getCatActivityType().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: entityGeneral.DataCatActivityType[]) => {
        this.catActivityType = data;
      },
      error: (error) => console.error(error)
    });
  }

  getDataTable(type?:string) {
    let filtro :string = `company_id=${ this.objEditData.id }`;
    if (type) filtro +=`&activity_type_id=${type}`;

    this.moduleServices.getDataHistoryCalls(filtro).subscribe({
      next: ( data : GetDataDetailsHistoryMapper[]) => {
        this.history = data
        console.log('DATAAA', data);
        
      },
      error: (error) => console.error(error)
    })
  }
  
  isSameDay(current: string, compare: string): boolean {
    return DateTime.fromISO(current).hasSame(DateTime.fromISO(compare), 'day');
  }

  getRelativeFormat(date: string): string {
    return DateTime.fromISO(date).toRelativeCalendar();
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  newActivity() {
    this.dialog.open(ModalNewActivityComponent, {
      data: {
        type: 'activities',
        complement : this.objEditData
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
    .afterClosed()
    .subscribe((_) => this.getDataTable());
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}