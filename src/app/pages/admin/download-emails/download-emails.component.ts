import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-download-emails',
  templateUrl: './download-emails.component.html',
})
export class DownloadEmailsComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;

  // TABLA 

  public displayedColumnsCampaign: string[] = [
    'number',
    'name',
    'rfc',
    'address',
    'country',
    'city',
    'state',
    'web',
    'category',
    'origin',
    'img',
    'giro',
    'type',
    'mail',
    'owner',
    // 'actioms',
  ];

  public dataDummy: any[] = [
    {
      number : '#1',
      name : 'Lorem ipsum',
      rfc : 'Lorem ipsum',
      address : 'Lorem ipsum',
      country : 'Lorem ipsum',
      city : 'Lorem ipsum',
      state : 'Lorem ipsum',
      web : 'Lorem ipsum',
      category : 'Lorem ipsum',
      origin : 'Lorem ipsum',
      img : 'Lorem ipsum',
      giro : 'Lorem ipsum',
      type : 'Lorem ipsum',
      mail : 'Lorem ipsum',
      owner : 'Lorem ipsum'
    },
    {
      number : '#1',
      name : 'Lorem ipsum',
      rfc : 'Lorem ipsum',
      address : 'Lorem ipsum',
      country : 'Lorem ipsum',
      city : 'Lorem ipsum',
      state : 'Lorem ipsum',
      web : 'Lorem ipsum',
      category : 'Lorem ipsum',
      origin : 'Lorem ipsum',
      img : 'Lorem ipsum',
      giro : 'Lorem ipsum',
      type : 'Lorem ipsum',
      mail : 'Lorem ipsum',
      owner : 'Lorem ipsum'
    },
    {
      number : '#1',
      name : 'Lorem ipsum',
      rfc : 'Lorem ipsum',
      address : 'Lorem ipsum',
      country : 'Lorem ipsum',
      city : 'Lorem ipsum',
      state : 'Lorem ipsum',
      web : 'Lorem ipsum',
      category : 'Lorem ipsum',
      origin : 'Lorem ipsum',
      img : 'Lorem ipsum',
      giro : 'Lorem ipsum',
      type : 'Lorem ipsum',
      mail : 'Lorem ipsum',
      owner : 'Lorem ipsum'
    },
    {
      number : '#1',
      name : 'Lorem ipsum',
      rfc : 'Lorem ipsum',
      address : 'Lorem ipsum',
      country : 'Lorem ipsum',
      city : 'Lorem ipsum',
      state : 'Lorem ipsum',
      web : 'Lorem ipsum',
      category : 'Lorem ipsum',
      origin : 'Lorem ipsum',
      img : 'Lorem ipsum',
      giro : 'Lorem ipsum',
      type : 'Lorem ipsum',
      mail : 'Lorem ipsum',
      owner : 'Lorem ipsum'
    },
    {
      number : '#1',
      name : 'Lorem ipsum',
      rfc : 'Lorem ipsum',
      address : 'Lorem ipsum',
      country : 'Lorem ipsum',
      city : 'Lorem ipsum',
      state : 'Lorem ipsum',
      web : 'Lorem ipsum',
      category : 'Lorem ipsum',
      origin : 'Lorem ipsum',
      img : 'Lorem ipsum',
      giro : 'Lorem ipsum',
      type : 'Lorem ipsum',
      mail : 'Lorem ipsum',
      owner : 'Lorem ipsum'
    },
   
  ]

  public fechaHoy = new Date();
  public isBono :boolean = true;

  public searchBar = new FormControl('')
  
  constructor(
    private moduleServices: AdminService,
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.dataDummy
  }


  ngAfterViewInit(): void {
    this.searchBar.valueChanges.pipe(takeUntil(this.onDestroy), debounceTime(500)).subscribe((content: string) => {
      this.applyFilter(content)
    })
  }


  newData() {
    this.router.navigateByUrl(`/home/admin/nuevo-bono`)
  }

  onTabChange(event: MatTabChangeEvent): void {
    if (event.tab.textLabel.includes('Bono')) this.isBono = true;
     else this.isBono = false;
  }

  getDataTable(filters:Object) {
    // this.moduleServices.getDataTable().subscribe({
    //     next: ({ data } : any) => {
    //       console.log(data);
    //     },
    //     error: (error) => console.error(error)
    //   }
    // )
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
