import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as entity from '../../../admin-interface';



@Component({
  selector: 'app-new-discount',
  templateUrl: './new-discount.component.html',
  styleUrl: './new-discount.component.scss'
})
export class NewDiscountComponent {

  public fechaHoy = new Date();
  public toppings = new FormControl('');
  public toppingList: string[] = ['Empresa A', 'Empresa B', 'Empresa C'];
  public valuesSpecifications: any[] = [];

  public url = document.location.href;

  public formulario = this.formBuilder.group({
    scaleType: ['', Validators.required],
    percentage: ['', Validators.required],
    amount: ['', Validators.required],
  });

  constructor(
    private notificationService: OpenModalsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }


  ngAfterViewInit(): void {
    this.addFormSpecifications();
  }

  addFormSpecifications(datos?: any) {
    const instance: any = {
      ...(datos && { id: datos.id }),
      scaleTypeControl: new FormControl({ value: datos?.scaleType || '', disabled: false }, Validators.required),
      percentageControl: new FormControl({ value: datos?.percentage || '', disabled: false }, Validators.required),
      amountControl: new FormControl({ value: datos?.amount || '', disabled: false }),
    };

    this.valuesSpecifications.push(instance);
  }

  getSpecificationsValue() {
    const specificationsValues = (e: any) => {
      let obj = {
        scaleType: e.scaleTypeControl.value,
        percentage: e.percentageControl.value,
        amount: e.amountControl.value,
      }

      return obj
    };

    return this.valuesSpecifications.map(specificationsValues);
  }

  deleteSpecifications(index:number) {
    this.valuesSpecifications.splice(index, 1)
  }
  
  getSpecifications() {
    let cont = 0;
    let contactInfo: any[] = [];

    for (const _ of this.valuesSpecifications) {
      contactInfo.push(this.getSpecificationsValue()[cont])
      cont++;
    }
    console.log(contactInfo);
  }


  save(){
    this.notificationService
      .notificacion(
        'Éxito',
        `Registro ${this.url.includes('editar') ? 'editado' : 'guardado'}.`,
        'save',
      )
      .afterClosed()
      .subscribe((_) => {
        this.toBack()
      });
  }

  toBack(){
    this.router.navigateByUrl(`/home/admin/productos`)
  }
}
