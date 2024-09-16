import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { ConversionService } from '../conversion.service';
import { Subject, takeUntil } from 'rxjs';
import { GetDataQuoteMapper } from '../conversion-interface';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalEmailComponent } from './modal-email/modal-email.component';

@Component({
  selector: 'app-details-quotes',
  templateUrl: './details-quotes.component.html',
  styleUrl: './details-quotes.component.scss'
})
export class DetailsQuotesComponent implements OnInit {
  private onDestroy = new Subject<void>();

  public objEditData: any;

  public idTest = '9aa67cb4-ccb1-4c01-8d7f-4b269db134ce'
  public quotesOptions: any[] = [];

  public emailText = new FormControl('');

  constructor(
    private moduleServices: ConversionService,
    private notificationService: OpenModalsService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getId();
  }
  
  getId() {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe((params:any) => {
      if (params.id) this.getDataById(params.id);
    });
  }

  getDataById(id:string) {
    this.moduleServices.getDataId(id).subscribe({
      next: (response: GetDataQuoteMapper) => {
        this.objEditData = response;
        this.quotesOptions = response.quoteOptions;
      },
      error: (error) => {
        this.notificationService.notificacion('Error', `Hable con el administrador.`, '', 'mat_outline:error')
        console.error(error)
      }
    })
  }

  sendEmail(){
    let objEmail:any = {
      quote_id : this.objEditData.id,
      message : this.emailText.value,
    };

    this.dialog.open(ModalEmailComponent, {
      data: {
        info: objEmail,
      },
      disableClose: true,
      width: '350px',
      maxHeight: '628px',
      panelClass: 'custom-dialog',
    })
    .afterClosed()
    .subscribe((_) => this.toBack() );
  }

  toBack(){
    this.router.navigateByUrl(`/home/conversion/cotizaciones`)
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
