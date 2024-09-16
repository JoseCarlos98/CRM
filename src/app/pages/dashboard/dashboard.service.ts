import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable, map } from 'rxjs';
import * as entity from './dashboard-interface';
import { Mapper } from './mapper';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = `${environment.apiURL}dashboard/`;

  constructor(private http: HttpClient) { }

  // HOME 
  public getHomeStatics(filters?: string): Observable<any> {
    const url = `${this.apiUrl}statics/${filters ? `?${filters}` : ''}`;

    return this.http.get<any>(url).pipe(
      map((response) => Mapper.getDataStaticsMapper(response)),
    );
  }
  // END HOME  

  // PIPELINE
  public getPipeline(filters?: string): Observable<any> {
    const url = `${this.apiUrl}pipeline/${filters ? `?${filters}` : ''}`;

    return this.http.get<entity.DatsPipeLine>(url).pipe(
      map((response) => Mapper.getDataPipelineMapper(response)),
    );
  }
  // END PIPELINE  

  // CAMPAINGS
  public getCampaing(filters?: string): Observable<entity.DataCampaingsMapper> {
    const url = `${this.apiUrl}campaigns/${filters ? `?${filters}` : ''}`;

    return this.http.get<entity.DataCampaings>(url).pipe(
      map((response) => Mapper.getDataCampaignsMapper(response)),
    );
  }
  // END CAMPAINGS  




































  public getDashboardProductsTable(): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<entity.DataProductsTable>(url)
  }

  public getDashboardArticlesTable(): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<entity.DataArticlesTable>(url)
  }

  public getDashboardProductsExcel(): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
  }

  public getDashboardArticlesExcel(): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
  }

  public getDashboardSells(): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
  }

  public getDashboardQuotes(): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
  }

  public getDashboardSellsStatistics(): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
  }

  public getDashboardQuotesStatistics(): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
  }

  public getDashboardCompaniesStatistics(): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
  }

  public getDashboardClientsStatisticsTable(): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<entity.DataClientsStatisticsTable>(url)
  }

  public getDashboardCountriesStatisticsTable(): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<entity.DataCountryStatisticsTable>(url)
  }

  // END DASHBOARD


  // CAMPAINGS

  public getCampaings(filters: any): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
  }

  public getCampaingsQuotes(filters: any): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
  }

  public getCampaingsSells(filters: any): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<any>(url)
  }

  public getCampaingsHistoryTable(filters: any): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<entity.DataCampaingsHistoryTable>(url)
  }

  public getCampaingsHistoryCompanies(): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<entity.DataCampaingsHistoryTable>(url)
  }

  public getCampaingsHistoryResults(): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<entity.DataCampaingsHistoryTable>(url)
  }

  // END CAMPAINGS

  // GOLADS
  public getGoalsTable(): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<entity.DataGoalsTable>(url)
  }

  public getGoalsHistors(): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<entity.DataGoalsHistoryTable>(url)
  }

  public getGoalsAgents(): Observable<any> {
    const url = `${environment.apiURL}/`;

    return this.http.get<entity.DataGoalAgentsTable>(url)
  }

  // END GOLADS

}
