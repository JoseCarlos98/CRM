import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { CatalogsService } from 'app/shared/services/catalogs.service';
import * as entityGeneral from '../../../../shared/interfaces/general-interface';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-new-bonus',
  templateUrl: './new-bonus.component.html',
  styleUrl: './new-bonus.component.scss'
})
export class NewBonusComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public fechaHoy = new Date();
  public radioType = new FormControl('1');
  public toppingList: string[] = ['Empresa A', 'Empresa B', 'Empresa C'];
  public valuesScales: any[] = [];
  public valuesGoalScales: any[] = [];

  public url = document.location.href;
  public isGoal: boolean = false;
  public modalTitle: string = '';

  public catalogAgents: entityGeneral.DataCatAgents[] = [];
  public catalogSolutions: entityGeneral.DataCatSolutions[] = [];

  public formData = this.formBuilder.group({
    bonus_name: [''],
    type_bonus_percentage: ['1'],
    type_bonus_meta: [''],
    campaign: ['', Validators.required],
    assigned_activity: [{ value: '', disabled: true }, Validators.required],
    base_percentage_bonus: [''],
    fixed_base_income: ['0'],
    bonus_user: [''],
    bonus_solution: [''],
    init_date: [''],
    deadline: [''],
  });

  public catCampaign: entityGeneral.DataCatCampaing[] = [];
  private idData: string = '';
  private objEditData: any;

  constructor(
    private notificationService: OpenModalsService,
    private catalogsServices: CatalogsService,
    private formBuilder: FormBuilder,
    private moduleServices: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit(): void {
    if (this.url.includes('dashboard')) {
      this.modalTitle = 'Registrar nueva meta'
      this.isGoal = true;
    }
    else {
      this.modalTitle = 'Registrar nuevo bono'
    }

    if (this.url.includes('editar')) this.modalTitle = this.modalTitle.replace('Registrar', 'Editar');
    if (this.url.includes('clonar')) this.modalTitle = this.modalTitle.replace('Registrar', 'Clonar');

    this.getCatalogs()
    this.getId();
  }

  ngAfterViewInit(): void {
    this.radioType.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(content => {
      if (content == '1') {
        this.formData.get('assigned_activity').disable()
        this.formData.get('assigned_activity').patchValue('')
        this.formData.get('assigned_activity')?.clearValidators();
        this.formData.get('campaign').enable()
        this.formData.get('campaign')?.setValidators(Validators.required);
      } else {
        this.formData.get('campaign').disable()
        this.formData.get('campaign').patchValue('')
        this.formData.get('campaign')?.clearValidators();
        this.formData.get('assigned_activity').enable()
        this.formData.get('assigned_activity')?.setValidators(Validators.required);
      }

      this.formData.get('campaign')?.updateValueAndValidity();
      this.formData.get('assigned_activity')?.updateValueAndValidity();
    })
  }

  getId() {
    this.activatedRoute.params.subscribe(({ id }: any) => {
      if (id) {
        this.idData = id;
        this.getDataById();
      } else  this.addFormScale();
    });
  }

  getDataById() {
    this.moduleServices.getDataBonusId(this.idData).subscribe({
      next: (response: any) => {
        this.objEditData = response;
        console.log(this.objEditData);
        this.formData.patchValue(response)

        if (response.valuesScales.length) {
          response.valuesScales.forEach((scale: any) => {
            this.addFormScale({ percentage: scale.percentage });
          });
        }
  
        if (response.valuesGoalScales.length) {
          response.valuesGoalScales.forEach((goalScale: any) => {
            this.addFormScale({ min_value: goalScale.min_value, max_value: goalScale.max_value });
          });
        }

      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  getCatalogs() {
    this.catalogsServices.getCatCampaing().subscribe({
      next: (data: entityGeneral.DataCatCampaing[]) => {
        this.catCampaign = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatAgents().subscribe({
      next: (data: entityGeneral.DataCatAgents[]) => {
        this.catalogAgents = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatSolutions().subscribe({
      next: (data: entityGeneral.DataCatSolutions[]) => {
        this.catalogSolutions = data;
      },
      error: (error) => console.error(error)
    });
  }

  actionSave() {
    let scales: any[] = [...this.getScaleValue()];
    let bonusMeta: any[] = [...this.getScaleMetaValue()];

    console.log(this.formData.get('fixed_base_income').value);
    console.log(parseFloat(this.formData.get('fixed_base_income').value.replace(/,/g, '')) );
    
    
    let objData = {
      ...this.formData.value,
      bonus_percentage: scales,
      bonus_meta: bonusMeta,
      fixed_base_income : parseFloat(this.formData.get('fixed_base_income').value.replace(/,/g, '')) 
    }

    if (this.objEditData) this.saveDataPatch(objData);
    else this.saveDataPost(objData);
  }

  saveDataPost(objData) {
    this.moduleServices.postDataBonus(objData).subscribe({
      next: () => {
        this.completionMessage()
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  saveDataPatch(objData) {
    this.moduleServices.patchDataBonus(this.objEditData.id, objData).subscribe({
      next: () => {
        this.completionMessage(true)
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  addFormScale(datos?: any) {
    const instance: any = {};
  
    if (datos && datos.hasOwnProperty('percentage')) {
      instance.scaleNumberControl = new FormControl(datos.percentage, Validators.required);
  
      if (this.valuesScales.length > 0) {
        const previousValue = this.valuesScales[this.valuesScales.length - 1].scaleNumberControl.value;
        instance.scaleNumberControl.valueChanges.subscribe(newValue => {
          console.log(newValue);
          
          if (newValue <= previousValue || newValue > 100) instance.scaleNumberControl.setErrors({ 'invalidValue': true });
           else instance.scaleNumberControl.setErrors(null);
        });
      }
  
      this.valuesScales.push(instance);
    }
    
    else if (datos && datos.hasOwnProperty('min_value') && datos.hasOwnProperty('max_value')) {
      instance.minValueControl = new FormControl(datos.min_value, Validators.required);
      instance.maxValueControl = new FormControl(datos.max_value, Validators.required);
      this.valuesGoalScales.push(instance);
    }
  
    else {
      instance.scaleNumberControl = new FormControl('', Validators.required);
      if (this.valuesScales.length > 0) {
        const previousValue = this.valuesScales[this.valuesScales.length - 1].scaleNumberControl.value;
        instance.scaleNumberControl.valueChanges.subscribe(newValue => {
          console.log(newValue);
          
          if (newValue <= previousValue  || newValue > 100) instance.scaleNumberControl.setErrors({ 'invalidValue': true });
           else instance.scaleNumberControl.setErrors(null);
        });
      }
  
      this.valuesScales.push(instance);
      const isNewScale = this.valuesScales.length > this.valuesGoalScales.length;
  
      if (!isNewScale) {
        const lastValues = this.valuesGoalScales[this.valuesGoalScales.length - 1];
        instance.minValueControl = new FormControl(lastValues.minValueControl.value, Validators.required);
        instance.maxValueControl = new FormControl(lastValues.maxValueControl.value, Validators.required);
        this.valuesGoalScales.push(instance);
      } else {
        instance.minValueControl = new FormControl('', Validators.required);
        instance.maxValueControl = new FormControl('', Validators.required);
        this.valuesGoalScales.push(instance);
      }
    }
  }

  getScaleValue() {
    const scaleValues = (e: any) => {
      let obj = { percentage: e.scaleNumberControl.value }
      return obj
    };

    return this.valuesScales.map(scaleValues);
  }

  getScaleMetaValue() {
    let count = 1
    const scaleMetaValues = (e: any) => {
      let obj = {
        scale_number: count,
        min_value: e.minValueControl.value,
        max_value: e.maxValueControl.value,
      }

      count++;
      return obj
    };

    return this.valuesGoalScales.map(scaleMetaValues);
  }

  asignValidators(accion: boolean) {
    if (accion) {
      this.formData.get('campaign')?.setValidators(Validators.required);
      this.formData.get('assigned_activity')?.setValidators(Validators.required);
    } else {
      this.formData.get('campaign')?.clearValidators();
      this.formData.get('assigned_activity')?.clearValidators();
    }
  }

  deleteScale() {
    this.valuesScales.pop()
    this.valuesGoalScales.pop()
  }

  getScale() {
    let cont = 0;
    let contactInfo: any[] = [];

    for (const _ of this.valuesScales) {
      contactInfo.push(this.getScaleValue()[cont])
      cont++;
    }
  }

  formatInput(event: any) {
    setTimeout(() => {
      
      let value = event.target.value;
      let numericValue = parseFloat(value.replace(/[^\d.]/g, ''));
      if (!isNaN(numericValue)) {
        let formattedValue = numericValue.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });

        this.formData.get('fixed_base_income').patchValue(formattedValue, { emitEvent: false });
      }
    }, 1500);
  }

  completionMessage(edit = false) {
    this.notificationService
      .notificacion(
        'Éxito',
        `Registro ${edit ? 'editado' : 'guardado'}.`,
        'save',
      )
      .afterClosed()
      .subscribe((_) => this.toBack());
  }

  toBack() {
    this.router.navigateByUrl(`/home/${this.isGoal ? 'dashboard/metas' : 'admin/bonos'}`)
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }

}
