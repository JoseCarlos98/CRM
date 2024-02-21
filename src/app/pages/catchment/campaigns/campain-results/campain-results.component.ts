import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { OpenModalsService } from 'app/shared/services/openModals.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CompaniesService } from 'app/pages/companies/companies.service';
import { ReactivationService } from 'app/pages/reactivation/reactivation.service';
import { TableDataCampaing } from '../../catchment-interface';
import { CatchmentService } from '../../catchment.service';

@Component({
  selector: 'app-campain-results',
  templateUrl: './campain-results.component.html',
  styleUrl: './campain-results.component.scss'
})
export class CampainResultsComponent implements OnInit, OnDestroy {
  private onDestroy = new Subject<void>();

  public dataSubscription: Subscription;
  public campaingData: any = {}

  public url = document.location.href;
  public componentType:string = ''

  constructor(
    private moduleReactivationServices: ReactivationService,
    private moduleCatchmentServices: CatchmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntil(this.onDestroy)).subscribe(({type}) => {
      this.componentType = type;
      if (this.componentType == 'calls') this.getDataCalls();
       else if (this.componentType == 'campaign') this.getDataCampaign();
    });
  }

  getDataCalls() {
    this.moduleReactivationServices.getData().pipe(takeUntil(this.onDestroy)).subscribe((data) => {
      this.campaingData = data?.campaingData;
    });
  }
  
  getDataCampaign() {
    this.moduleCatchmentServices.getData().pipe(takeUntil(this.onDestroy)).subscribe((data) => {
      this.campaingData = data?.campaingData;
      console.log('getDataCampaign', this.campaingData);
      
    });
  }
  
  toBack(){
    if (this.componentType == 'calls') {
      this.router.navigateByUrl(`/home/reactivacion/llamadas-pendientes`)
    } else if (this.componentType == 'campaign') {
      this.router.navigateByUrl(`/home/captacion/campanias`)
    } else {
      this.router.navigateByUrl(`/home/dashboard/campanias`)
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }
}
