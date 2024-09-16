import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: []
})
export class ProductsComponent implements OnInit {
  public dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public longitudPagina = 50;
  public total = 0;
  public indicePagina = 0;


  public displayedColumns: string[] = [
    'codigo',
    'nombre',
    'precio',
    'link',
    'acciones'
  ];
 
  
  public dataDummy: any[] = [
    {
      codigo: 'CD4557',
      nombre: 'Seguridad y prevención contra incendio en los centros de trabajo',
      precio: '$4,000,000.00',
      link: 'https://abrevius.com/course/c001-seguridad-en-edificios-locales-instalaciones-y-areas-de-trabajo/',
    },
    {
      codigo: 'CD4557',
      nombre: 'Seguridad y prevención contra incendio en los centros de trabajo',
      precio: '$4,000,000.00',
      link: 'https://abrevius.com/course/c001-seguridad-en-edificios-locales-instalaciones-y-areas-de-trabajo/',
    },
    {
      codigo: 'CD4557',
      nombre: 'Seguridad y prevención contra incendio en los centros de trabajo',
      precio: '$4,000,000.00',
      link: 'https://abrevius.com/course/c001-seguridad-en-edificios-locales-instalaciones-y-areas-de-trabajo/',
    },
  ]

  constructor(

    private openModalsService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.dataSource.data = this.dataDummy
  }

  newProduct() {
    this.dialog.open(ModalProductComponent, {
      data: ['test'],
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    });
  }


}
