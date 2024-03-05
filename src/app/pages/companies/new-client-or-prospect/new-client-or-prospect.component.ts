import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import * as entityGeneral from '../../../shared/interfaces/general-interface';
import * as entity from '../companies-interface';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { CompaniesService } from '../companies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalFastQuoteComponent } from '../prospects/modal-fast-quote/modal-fast-quote.component';
import { TableDataOrigin } from 'app/pages/config/config-interface';
import { CatalogsService } from 'app/shared/services/catalogs.service';
import { ModalNewProductComponent } from '../../admin/main-products/products/modal-new-product/modal-new-product.component';
import moment from 'moment';

@Component({
  selector: 'app-new-client-or-prospect',
  templateUrl: './new-client-or-prospect.component.html',
  styleUrl: './new-client-or-prospect.component.scss'


})
export class NewClientOrProspectComponent implements OnInit, AfterViewInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public addContact = new FormControl(true)
  public movilPhoneContact = new FormControl('', Validators.required)
  public nameContact = new FormControl('', Validators.required)
  public contacts: any[] = []
  public valuesContacts: any[] = []

  public url = document.location.href;
  public modalTitle: string = '';
  public esClient: boolean = false;

  public formData = this.formBuilder.group({
    company_name: ['', Validators.required],
    platform: ['', Validators.required],
    phone_number: [''],
    email: ['', Validators.pattern(/^\S+@\S+\.\S+$/)],
    tax_id_number: [''],
    state: [''],
    owner_user: [''],
    country: [''],
    business: [''],
    city: [''],
    address: [''],
    company_type: [''],
    company_size: [''],
    web_page: ['', [Validators.required, Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/)]],
    comments: ['']
  });

  public taxInclude = new FormControl(false)

  public catCompaniesSizes: entityGeneral.DataCatCompanySize[] = [];
  public catCompaniesTypes: entityGeneral.DataCatCompanyType[] = [];
  public catCountries: entityGeneral.DataCatCountry[] = [];
  public catStates: entityGeneral.DataCatState[] = [];
  public catCities: entityGeneral.DataCatCity[] = [];
  public catBusiness: entityGeneral.DataCatBusiness[] = [];
  public catAgents: entityGeneral.DataCatAgents[] = [];
  public catOrigin: TableDataOrigin[] = [];

  public title: string = 'cliente';

  public objEditData: any;
  public dashboardQuote: boolean = false;

  public productFormValues: any[] = [];
  public optionFormValues: any[] = [];
  public company = new FormControl(null);
  public catProducts: entityGeneral.DataCatProducts[] = [];

  constructor(
    private notificationService: OpenModalsService,
    private moduleServices: CompaniesService,
    private catalogsServices: CatalogsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.verifyType()
  }

  verifyType() {
    this.getId()

    console.log(this.url);
    if (this.url.includes('prospecto') && this.url.includes('dashboard')) {
      this.addContact.patchValue(false)
      this.title = 'prospecto';
      this.dashboardQuote = true;
      this.getCatalogsInitial();
    } else if (this.url.includes('prospecto')) {
      this.title = 'prospecto';
      this.addContact.patchValue(false)
      this.getCatalogsInitial();
    } else if (this.url.includes('cliente')) {
      this.getCatalogs();
    }
  }

  ngAfterViewInit(): void {
    this.addContact.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(resp => {
      if (resp) {
        this.asignValidators(true);
        this.getCatalogs();

      } else this.asignValidators(false);
    })
  }

  getId() {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe((params: any) => {
      if (params.id) this.getDataById(params.id);
      else this.addFormOption();
    });
  }

  getCatalogsInitial() {
    this.catalogsServices.getCatOrigin().pipe(takeUntil(this.onDestroy)).subscribe({
      next: (data: TableDataOrigin[]) => {
        this.catOrigin = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatProducts().subscribe({
      next: (data: entityGeneral.DataCatProducts[]) => {
        this.catProducts = data;
      },
      error: (error) => console.error(error)
    })
  }

  getDataById(id: string) {
    this.moduleServices.getDataId(id).pipe(takeUntil(this.onDestroy)).subscribe({
      next: (response: any) => {
        this.isCompleted(response)
        this.objEditData = response;
        this.formData.patchValue({ ...this.objEditData });
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  getCatalogs() {
    this.getCatalogsInitial()

    this.catalogsServices.getCatAgents().subscribe({
      next: (data: entityGeneral.DataCatAgents[]) => {
        this.catAgents = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatCompanySize().subscribe({
      next: (data: entityGeneral.DataCatCompanySize[]) => {
        this.catCompaniesSizes = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatCompanyType().subscribe({
      next: (data: entityGeneral.DataCatCompanyType[]) => {
        this.catCompaniesTypes = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatCountry().subscribe({
      next: (data: entityGeneral.DataCatCountry[]) => {
        this.catCountries = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatState().subscribe({
      next: (data: entityGeneral.DataCatState[]) => {
        this.catStates = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatCity().subscribe({
      next: (data: entityGeneral.DataCatCity[]) => {
        this.catCities = data;
      },
      error: (error) => console.error(error)
    });

    this.catalogsServices.getCatBusiness().subscribe({
      next: (data: entityGeneral.DataCatBusiness[]) => {
        this.catBusiness = data;
      },
      error: (error) => console.error(error)
    });
  }

  formPatchData() {
    this.formData.patchValue({ ...this.objEditData })
    this.addFormContact(this.objEditData.conctacts)
  }

  actionSave() {
    let contacts: entity.CompanyContacts[] = [...this.getContactsValue()];
    let options: any[] = [...this.getOptionsValues()];


    let objData: any = {
      ...this.formData.value
    }

    if ((!contacts.length && !this.addContact.value)) {
      contacts.push({
        full_name: this.nameContact.value,
        movil_phone: this.movilPhoneContact.value,
      });
      objData.company_contacts = contacts;
    }

    if (contacts.length) objData.company_contacts = contacts;

    objData.tax_include = this.taxInclude.value;

    if (this.url.includes('prospecto')) objData.company_phase = 'ec43fa4e-1ade-46ea-9841-1692074ce8cd';
    else objData.company_phase = 'd1203730-3ac8-4f06-b095-3ec56ef3b54d';

    console.log('OBJETO :', objData);

    if (this.dashboardQuote) {
      this.saveDataQuotePost({
        company: objData,
        quote_options: options
      })
    } else if (this.objEditData) this.saveDataPatch(objData);
    else this.saveDataPost(objData);
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

  saveDataQuotePost(objData) {
    this.moduleServices.postDataQuote(objData).subscribe({
      next: (response: any) => {
        console.log(response);
        this.notificationService
          .notificacion(
            'Éxito',
            `Registro guardado.`,
            'save',
          )
          .afterClosed()
          .subscribe((_) => {
            this.toQuoteDetail(response.quote_id)

          });
        // this.completionMessage()
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  addFormContact(datos?: any) {
    const instance: any = {
      ...(datos && { id: datos.id }),
      fullNameControl: new FormControl({ value: datos?.nombre || '', disabled: false }, Validators.required),
      emailControl: new FormControl({ value: datos?.correo || '', disabled: false }, [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]),
      localPhone: new FormControl({ value: datos?.correo || '', disabled: false }, Validators.required),
      positionControl: new FormControl({ value: datos?.correo || '', disabled: false }, Validators.required),
      movilPhoneControl: new FormControl({ value: datos?.correo || '', disabled: false }, Validators.required),
      extControl: new FormControl({ value: datos?.correo || '', disabled: false }),
    };

    this.valuesContacts.push(instance);
  }

  getContactsValue() {
    const contactValues = (e: any) => {
      let obj = {
        full_name: e.fullNameControl.value,
        email: e.emailControl.value,
        local_phone: e.localPhone.value,
        position: e.positionControl.value,
        movil_phone: e.movilPhoneControl.value,
        ext: e.extControl.value,
      }

      return obj
    };

    return this.valuesContacts.map(contactValues);
  }

  deleteContact(index: number) {
    this.valuesContacts.splice(index, 1)
  }

  getOptionsValues() {
    const formValues = (e: any) => {
      const formattedDate = moment(e.dateControl.value).format('YYYY-MM-DD');
      const formattedTime = moment(e.timeControl.value, 'HH:mm').format('HH:mm');
      const combinedDateTime = moment(`${formattedDate}T${formattedTime}:00.000Z`).toISOString();

      const productValues = e.product.map((productControl: any) => {
        return {
          ...({ option_product_id: productControl.id }),
          quantity: productControl.placesControl.value,
          product: productControl.productControl.value,
          price: productControl.unitPriceControl.value,
          total: productControl.totalPriceControl.value,
        };
      });

      let obj = {
        ...({ quote_option_id: e.id }),
        subtotal: parseFloat(e.subtotalControl.value),
        discount: e.discountControl.value,
        total: e.totalControl.value,
        type_price: e.typePriceControl.value,
        deadline: combinedDateTime,
        option_products: productValues
      }

      return obj
    };

    return this.optionFormValues.map(formValues);
  }

  addFormOption(datos?: any) {
    const instance: any = {
      ...(datos && { id: datos?.id }),
      subtotalControl: new FormControl({ value: datos?.subtotal || '', disabled: true }, Validators.required),
      discountControl: new FormControl({ value: datos?.discount || 0, disabled: false }),
      totalControl: new FormControl({ value: datos?.total || '', disabled: true }, Validators.required),
      typePriceControl: new FormControl({ value: datos?.typePrice || '1', disabled: false }, Validators.required),
      dateControl: new FormControl({ value: datos?.date || '', disabled: false }, Validators.required),
      timeControl: new FormControl({ value: datos?.time || '', disabled: false }, Validators.required),
      product: [],
    };

    if (datos && datos.optionProducts) {
      datos.optionProducts.forEach((productData: any) => {
        const productInstance: any = this.createProductInstance(productData);
        this.enableProductFields(productInstance);

        instance.product.push(productInstance);
      });
    } else {
      const newProductInstance: any = this.createProductInstance();
      instance.product.push(newProductInstance);
    }
    this.setupOptionControlSubscriptions(instance);
    this.optionFormValues.push(instance);
  }

  createProductInstance(productData?: any): any {
    const productInstance: any = {
      ...(productData && { id: productData.id }),
      placesControl: new FormControl({ value: productData?.places || '', disabled: true }, Validators.required),
      productControl: new FormControl({ value: productData?.product || '', disabled: false }, Validators.required),
      unitPriceControl: new FormControl({ value: productData?.unitPri || '', disabled: true }, Validators.required),
      totalPriceControl: new FormControl({ value: productData?.total || '', disabled: true }, Validators.required),
    };

    this.setupProductControlSubscriptions(productInstance);

    return productInstance;
  }

  addAdditionalProduct(optionIndex: number) {
    const newProductInstance: any = this.createProductInstance();
    this.optionFormValues[optionIndex]?.product.push(newProductInstance);
  }

  private setupProductControlSubscriptions(productInstance: any) {
    productInstance.productControl.valueChanges.subscribe((selectedProduct: any) => {
      this.updateProductPrice(productInstance, selectedProduct);
      this.updateSubtotal();
      this.enableProductFields(productInstance);
    });

    productInstance.placesControl.valueChanges.subscribe((newPlacesValue: number) => {
      this.updateProductTotalPrice(productInstance, newPlacesValue);
      this.updateSubtotal();
    });

    productInstance.unitPriceControl.valueChanges.subscribe((newUnitPrice: any) => {
      this.updateProductTotalPriceManually(productInstance, newUnitPrice);
      this.updateSubtotal();
    });
  }

  deleteOptionValue(index: number) {
    this.optionFormValues.splice(index, 1)
  }

  deleteProductValue(index: number) {
    console.log();
    console.log(this.optionFormValues);

    this.optionFormValues.forEach(data => {
      data.product.splice(index, 1)
    })
  }

  updateProductPrice(productInstance: any, selectedProduct: any) {
    const selectedProductInfo = this.catProducts.find(product => product.product_id === selectedProduct);

    if (selectedProductInfo) {
      const listPrice: any = selectedProductInfo.list_price;
      const placesValue = productInstance.placesControl.value;
      const newTotal = listPrice * placesValue;

      productInstance.unitPriceControl.setValue(parseFloat(listPrice).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
      productInstance.totalPriceControl.setValue(newTotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));
    }
  }

  updateProductTotalPrice(productInstance: any, newPlacesValue: number) {
    const listPrice = parseFloat(productInstance.unitPriceControl.value.replace(/,/g, ''));
    const newTotal = listPrice * newPlacesValue;

    productInstance.totalPriceControl.setValue(newTotal.toFixed(2));
  }

  updateSubtotal() {
    this.optionFormValues.forEach((optionInstance: any) => {
      let subtotal = 0;

      optionInstance.product.forEach((productInstance: any) => {
        subtotal += this.parseNumber(productInstance.totalPriceControl.value) || 0;
      });

      optionInstance.subtotalControl.setValue(subtotal.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }));

      const discountValue = optionInstance.discountControl.value;
      const discount = this.parseNumber(discountValue) || 0;

      const total = (subtotal - discount).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      optionInstance.totalControl.setValue(parseFloat(total.replace(/,/g, '')));
    });
  }

  updateProductTotalPriceManually(productInstance: any, newUnitPrice: any) {
    const placesValue = productInstance.placesControl.value;
    const newTotal = newUnitPrice * placesValue;

    productInstance.totalPriceControl.setValue(newTotal.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }));
  }

  updateTotalWithDiscount(productInstance: any, newDiscount: any) {
    const subtotal = this.parseNumber(productInstance?.subtotalControl?.value) || 0;
    const discount = this.parseNumber(newDiscount) || 0;

    const total = (subtotal - discount).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    productInstance.totalControl.setValue(parseFloat(total.replace(/,/g, '')));
  }

  private setupOptionControlSubscriptions(optionInstance: any) {
    optionInstance.discountControl.valueChanges.subscribe((newDiscount: any) => {
      this.updateTotalWithDiscount(optionInstance, newDiscount);
    });
  }

  newDataProduct() {
    this.dialog.open(ModalNewProductComponent, {
      data: null,
      disableClose: true,
      width: '1000px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
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

  parseNumber(value: any): number {
    return parseFloat(typeof value === 'string' ? value.replace(/,/g, '') : value) || 0;
  }

  enableProductFields(productInstance: any) {
    const shouldEnable = !!productInstance.productControl.value;

    productInstance.placesControl[shouldEnable ? 'enable' : 'disable']();
    productInstance.unitPriceControl[shouldEnable ? 'enable' : 'disable']();
    productInstance.totalPriceControl[shouldEnable ? 'enable' : 'disable']();
  }

  fastQuote() {
    this.dialog.open(ModalFastQuoteComponent, {
      data: {},
      disableClose: true,
      width: '400px',
      maxHeight: '400px',
      panelClass: 'custom-dialog',
    })
      .afterClosed()
      .subscribe(({ close }) => {
        console.log(close);
        if (close) this.router.navigateByUrl(`/home/conversion/nueva-cotizacion`)
        else this.router.navigateByUrl(`/home/empresas/${this.url.includes('prospecto') ? 'prospectos' : 'clientes'}`)
      });
  }

  toBack() {
    this.router.navigateByUrl(`/home/empresas/${this.url.includes('todos') ? 'todos' : this.url.includes('prospecto') ? 'prospectos' : 'clientes'}`)
  }

  toBackClient() {
    this.router.navigateByUrl(`/home/empresas/clientes`)
  }

  toAll() {
    this.router.navigateByUrl(`/home/empresas/todos`)
  }

  toQuoteDetail(id: String) {
    this.router.navigateByUrl(`/home/conversion/detalle-cotizacion/${id}`)
  }

  enableOrDisableInputs(accion = false) {
    const key = accion ? 'enable' : 'disable';
    this.formData.get('name')?.[key]();
  }

  isCompleted(data: entity.GetDataCompanyMapper) {
    if (data.country || data.company_type || data.city) this.addContact.patchValue(true);
  }

  asignValidators(accion = false) {
    if (accion) {
      this.formData.get('country')?.setValidators(Validators.required);
      this.formData.get('state')?.setValidators(Validators.required);
      this.formData.get('city')?.setValidators(Validators.required);
      this.formData.get('company_type')?.setValidators(Validators.required);
      this.formData.get('company_size')?.setValidators(Validators.required);
      this.formData.get('business')?.setValidators(Validators.required);
      this.formData.get('tax_id_number')?.setValidators([Validators.required, Validators.minLength(12), Validators.maxLength(12)]);
    } else {
      this.formData.get('country')?.clearValidators();
      this.formData.get('state')?.clearValidators();
      this.formData.get('city')?.clearValidators();
      this.formData.get('company_type')?.clearValidators();
      this.formData.get('company_size')?.clearValidators();
      this.formData.get('business')?.clearValidators();
      this.formData.get('tax_id_number')?.clearValidators();
    }
  }


  get canSave() {
    let save: boolean = true;
    if (this.formData.valid) {
      if (this.valuesContacts.length) {
        this.valuesContacts.forEach(control => {
          if (
            !control?.fullNameControl?.value ||
            !control?.emailControl?.value ||
            !control?.localPhone?.value ||
            !control?.positionControl?.value ||
            !control?.movilPhoneControl?.value) {
            save = false;
          }
        });
      } 
    }
    else save = false;
    return save
  }

  configInput(event: Event, type: string, control?: string): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    const sanitizedValue = inputValue.replace(/\D/g, '');

    if (type == 'movilPhoneContact') {
      this.movilPhoneContact?.patchValue(sanitizedValue, { emitEvent: false });

    } else if (type == 'form') {
      const formControl = this.formData.get(control);
      if (formControl) formControl.setValue(sanitizedValue, { emitEvent: false });

    } else {
      this.valuesContacts[0][control]?.patchValue(sanitizedValue, { emitEvent: false });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
