import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { CalendarEventAction, CalendarView } from 'angular-calendar';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { isSameDay, isSameMonth } from 'date-fns';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { ModalNewActivityComponent } from 'app/pages/companies/all/detail-client/components/history/modal-new-activity/modal-new-activity.component';
import { ReactivationService } from '../reactivation.service';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormControl } from '@angular/forms';
import * as entityGeneral from '../../../shared/interfaces/general-interface';


@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrl: './diary.component.scss'
})
export class DiaryComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  public view: CalendarView = CalendarView.Month;

  public CalendarView = CalendarView;
  public viewDate: Date = new Date();

  public typeSeleccion: string = ''

  public modalData: {
    action: string;
    event: CalendarEvent;
  };

  public actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.newOrEditData(event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: any }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.deleteData(event.data.activity_id);
      },
    },
  ];

  public events: any[] = [];
  public filteredEvents: any[] = [];

  public catAgents: entityGeneral.DataCatAgents[] = [];

  public activeDayIsOpen: boolean = true;

  public searchBar = new FormControl('');
  public agent = new FormControl('');

  public filterAgent: string = '';

  constructor(
    private moduleServices: ReactivationService,
    private modal: NgbModal,
    private notificationService: OpenModalsService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getDataTable();
    this.getCatalogs();
  }

  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(
      takeUntil(this.onDestroy),
      debounceTime(500),
    ).subscribe((content: string) => {
      this.filteredEvents = this.events.filter(event => event.title.toLowerCase().includes(content.toLowerCase()));
    });

    this.agent.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(data => {
      if (data.trim()) {
        this.filterAgent = `user_id=${data}`
        this.getDataTable()
      };
      
    })
  }

  getCatalogs() {
    this.moduleServices.getCatAgents().subscribe({
      next: (data: entityGeneral.DataCatAgents[]) => {
        this.catAgents = data;
      },
      error: (error) => console.error(error)
    });
  }

  getDataTable() {
    this.moduleServices.getDataTableDiary(this.filterAgent).subscribe({
      next: (data: any) => {
        this.events = data.map(data => {
          return {
            data: data,
            start: new Date(data.activity_date),
            title: data.description,
            actions: this.actions
          }
        })
      },
      error: (error) => console.error(error)
    })
  }

  newOrEditData(data = null) {
    this.dialog.open(ModalNewActivityComponent, {
      data: {
        info: data?.data,
        type: 'diary'
      },
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
      .afterClosed()
      .subscribe((_) => this.getDataTable());
  }

  deleteData(id: string) {
    this.notificationService
    .notificacion(
      'Pregunta',
      '¿Estas seguro de eliminar el registro?',
      'question',
    )
    .afterClosed()
    .subscribe((response) => {
      if (response) {
        this.moduleServices.deleteDataCallOrDaily(id).subscribe({
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

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }

}
