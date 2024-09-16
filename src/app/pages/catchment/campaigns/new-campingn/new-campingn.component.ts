import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { CatchmentService } from '../../catchment.service';
import * as entityGeneral from '../../../../shared/interfaces/general-interface';
import moment from 'moment';
import { CatalogsService } from 'app/shared/services/catalogs.service';

@Component({
  selector: 'app-new-campingn',
  templateUrl: './new-campingn.component.html',
})
export class NewCampingnComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public formFilters = this.formBuilder.group({
    business: [null],
    country: [''],
    size: [''],
    createdBy: [''],
  });

  public formData = this.formBuilder.group({
    campaign_code: [{ value: '', disabled: true }],
    campaign_name: [null, Validators.required],
    amount_invested: ['', Validators.required],
    campaign_type: [null, Validators.required],
    owner_user: [null, Validators.required],
    users: [null, Validators.required],
    solutions: [null, Validators.required],
    start_date: [null, Validators.required],
    end_date: [null, Validators.required],
    description: [null, Validators.required],
    goal_total_companies: [null],
    goal_total_responses: [null],
    goal_number_quotes: [null],
    goal_number_sales: [null],
    goal_amount: ['']
  });

  public formCompanies = this.formBuilder.group({
    companies: [[], Validators.required],
    radioOption: [{ value: '', disabled: false }]
  });

  public catBusiness: entityGeneral.DataCatBusiness[] = [];
  public catTypes: entityGeneral.DataCatType[] = [];
  public catCompanyType: entityGeneral.DataCatCompanyType[] = [];
  public catalogAgents: entityGeneral.DataCatAgents[] = [];
  public catalogSolutions: entityGeneral.DataCatSolutions[] = [];
  public catalogCompanies: entityGeneral.DataCatCompany[] = [];
  public catalogCountry: entityGeneral.DataCatCountry[] = [];
  public catalogCompanySize: entityGeneral.DataCatCompanySize[] = [];
  public catalogPlatform: entityGeneral.DataCatPlatform[] = [];

  public fechaHoy = new Date();
  public toppings = new FormControl('');
  public selectCompanies = new FormControl('');

  public url = document.location.href;

  public companiesSelected: any[] = [];

  private idData: string = '';
  private objEditData: any;
  private objcampaingType: any;

  constructor(
    private notificationService: OpenModalsService,
    private moduleServices: CatchmentService,
    private catalogsServices: CatalogsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getId();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getCatalogs()
    }, 500);

    this.formData.get('campaign_type').valueChanges.pipe(debounceTime(500), takeUntil(this.onDestroy)).subscribe(content => {
      if (!this.idData) this.formData.get('campaign_code').patchValue(this.objcampaingType?.campaign_abbrev)
    })

    this.formCompanies.get('radioOption').valueChanges.pipe(debounceTime(500), takeUntil(this.onDestroy)).subscribe(content => {
      this.filterRegistros()
    })
    this.formCompanies.get('companies').valueChanges.pipe(debounceTime(500), takeUntil(this.onDestroy)).subscribe(content => {
      this.filterRegistros()
    })
  }

  getId() {
    this.activatedRoute.params.subscribe(({ id }: any) => {
      if (id) {
        this.idData = id;
        this.getDataById();
      }
    });
  }

  getDataById() {
    this.moduleServices.getDataId(this.idData).subscribe({
      next: (response: any) => {
        this.objEditData = response;
        console.log(this.objEditData);
        this.formData.patchValue({ ...this.objEditData });
        this.formCompanies.patchValue({ ...this.objEditData?.formCompanies });
        this.companiesSelected = this.objEditData.companiesSelected;
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  getCatalogs() {
    this.catalogsServices.getCatBusiness().subscribe({
      next: (data: entityGeneral.DataCatBusiness[]) => {
        this.catBusiness = data;;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatCompanyType().subscribe({
      next: (data: entityGeneral.DataCatCompanyType[]) => {
        this.catCompanyType = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatCapaignType().subscribe({
      next: (data: entityGeneral.DataCatType[]) => {
        this.catTypes = data;
        console.log(data);
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatAgents().subscribe({
      next: (data: entityGeneral.DataCatAgents[]) => {
        this.catalogAgents = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatCountry().subscribe({
      next: (data: entityGeneral.DataCatCountry[]) => {
        this.catalogCountry = data;
      },
      error: (error) => console.error(error)
    });
    
    this.catalogsServices.getCatPlatform().subscribe({
      next: (data: entityGeneral.DataCatPlatform[]) => {
        this.catalogPlatform = data;
      },
      error: (error) => console.error(error)
    });
    
    this.catalogsServices.getCatCountry().subscribe({
      next: (data: entityGeneral.DataCatCountry[]) => {
        this.catalogCountry = data;
      },
      error: (error) => console.error(error)
    });
    
    this.catalogsServices.getCatCompanySize().subscribe({
      next: (data: entityGeneral.DataCatCompanySize[]) => {
        this.catalogCompanySize = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatSolutions().subscribe({
      next: (data: entityGeneral.DataCatSolutions[]) => {
        this.catalogSolutions = data;
      },
      error: (error) => console.error(error)
    });

    this.searchCompanies()
  }

  searchCompanies() {
    let filters = '';

    if (this.formFilters.get('business')?.value) {
      const businessIds = this.formFilters.get('business').value.join(','); 
      filters += `business_id=${businessIds}&`;
    }    
    if (this.formFilters.get('country')?.value) filters += `country_id=${this.formFilters.get('country').value}&`;
    if (this.formFilters.get('size')?.value) filters += `company_size_id=${this.formFilters.get('size').value}&`;
    if (this.formFilters.get('createdBy')?.value) filters += `platform_id=${this.formFilters.get('createdBy').value}&`;

    this.catalogsServices.getCatCompany(filters).subscribe({
      next: (data: entityGeneral.DataCatCompany[]) => {
        //console.log(data['data'])
        this.catalogCompanies = data['data'];
      },
      error: (error) => console.error(error)
    });
  }
    
  actionSave() {
    let objData: any = {
      ...this.cleanData(),
      companies: this.companiesSelected.map(data => data.company_id)
    }

    console.log(objData);
    if (this.idData && this.url.includes('editar')) this.saveDataPatch(objData)
    else this.saveDataPost(objData)
  }

  saveDataPost(objData) {
    this.moduleServices.postData(objData).subscribe({
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
    this.moduleServices.patchData(this.objEditData.id, objData).subscribe({
      next: () => {
        this.completionMessage(true)
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  onRadioChange(option: string) {
    this.formCompanies.patchValue({ radioOption: option });
    this.filterRegistros();
  }

  filterRegistros() {
    const selectedCompanies = this.formCompanies?.value?.companies || [];
    const radioOption = this.formCompanies.value.radioOption;

    if (radioOption === 'excepto') {
      this.companiesSelected = this.catalogCompanies.filter(
        (cat) => !selectedCompanies.includes(cat.company_id)
      );
    } else if (radioOption === 'solo') {
      this.companiesSelected = this.catalogCompanies.filter((cat) =>
        selectedCompanies.includes(cat.company_id)
      );
    }
  }

  completionMessage(edit = false) {
    this.notificationService
      .notificacion(
        'Éxito',
        `Registro ${edit ? 'editado' : 'guardado'}.`,
        'save',
      )
      .afterClosed()
      .subscribe((_) => {
        this.toBack()
      });
  }

  toBack() {
    this.router.navigateByUrl(`/home/captacion/campanias`)
  }

  get canSave() {
    let action = true
    if ((
      !this.objEditData && this.formCompanies.get('radioOption')?.value && 
      this.formCompanies.get('companies')?.value) &&
      this.formData.valid
      ||
      this.objEditData && 
      this.formCompanies.get('companies')?.value && this.formData.valid) {
      action = false
    }

    return action
  }

  configInput(event: Event, control:string): void {
		const inputElement = event.target as HTMLInputElement;
		const inputValue = inputElement.value;
		const sanitizedValue = inputValue.replace(/\D/g, '');
    const formControl = this.formData.get(control);
    
    if (formControl) formControl.setValue(sanitizedValue, { emitEvent: false });
	}

  cleanData() {
    return {
      ...this.formData.value,
      amount_invested : parseFloat(this.formData.get('amount_invested')?.value.replace(/[^0-9.-]+/g,"")),
      goal_amount : parseFloat(this.formData.get('goal_amount')?.value.replace(/[^0-9.-]+/g,"")),
      end_date : moment(this.formData.get('end_date').value).format('YYYY-MM-DD'),
      start_date : moment(this.formData.get('start_date').value).format('YYYY-MM-DD')
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
