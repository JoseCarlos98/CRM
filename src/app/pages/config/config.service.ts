import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable } from 'rxjs';
import * as entity from './config-interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private apiUrl = `${environment.apiURL}settings/`;

  constructor(
    private http: HttpClient
  ) { }

  // PRODUCT CATEGORIES
   
  public getTableDataProductCategory(): Observable<entity.TableDataProductCategory[]> {
		const url = `${this.apiUrl}product-category/`;

    return this.http.get<entity.TableDataProductCategory[]>(url);
	}

  public getDataIdProductCategory(id:string): Observable<entity.GetDataProductCategory> {
		const url = `${this.apiUrl}product-category/${id}/`;

    return this.http.get<entity.GetDataProductCategory>(url);
	}

  public postDataProductCategory(data:entity.PostDataProductCategory): Observable<any> {
		const url = `${this.apiUrl}product-category/`;

    return this.http.post<any>(url, data);
	}

  public patchDataProductCategory(id:string, data:entity.PatchDataProductCategory): Observable<any> {
		const url = `${this.apiUrl}product-category/${id}/`;

    return this.http.patch<any>(url, data);
	}
 
  public deleteDataProductCategory(id:string): Observable<any> {
		const url = `${this.apiUrl}product-category/${id}/`;

    return this.http.delete<any>(url);
	}

  // END PRODUCT CATEGORIES 


  // WAY TO PAY 
   
  public getTableDataWayToPay(): Observable<entity.TableDataWayToPay[]> {
		const url = `${this.apiUrl}payment-method/`;

    return this.http.get<entity.TableDataWayToPay[]>(url);
	}

  public getDataIdWayToPay(id:string): Observable<entity.GetDataWayToPay> {
		const url = `${this.apiUrl}payment-method/${id}/`;

    return this.http.get<entity.GetDataWayToPay>(url);
	}

  public postDataWayToPay(data:entity.PostDataWayToPay): Observable<any> {
		const url = `${this.apiUrl}payment-method/`;

    return this.http.post<any>(url, data);
	}

  public patchDataWayToPay(id:string, data:entity.PatchDataWayToPay): Observable<any> {
		const url = `${this.apiUrl}payment-method/${id}/`;

    return this.http.patch<any>(url, data);
	}
 
  public deleteDataWayToPay(id:string): Observable<any> {
		const url = `${this.apiUrl}payment-method/${id}/`;

    return this.http.delete<any>(url);
	}

  // END WAY TO PAY  
  
  
  // CAMPAING TYPE 
   
  public getTableDataCampaingType(): Observable<entity.TableDataCampaingType[]> {
		const url = `${this.apiUrl}campaign-type/`;

    return this.http.get<entity.TableDataCampaingType[]>(url);
	}

  public getDataIdCampaingType(id:string): Observable<entity.GetDataCampaingType> {
		const url = `${this.apiUrl}campaign-type/${id}/`;

    return this.http.get<entity.GetDataCampaingType>(url);
	}

  public postDataCampaingType(data:entity.PostDataCampaingType): Observable<any> {
		const url = `${this.apiUrl}campaign-type/`;

    return this.http.post<any>(url, data);
	}

  public patchDataCampaingType(id:string, data:entity.PatchDataCampaingType): Observable<any> {
		const url = `${this.apiUrl}campaign-type/${id}/`;

    return this.http.patch<any>(url, data);
	}
 
  public deleteDataCampaingType(id:string): Observable<any> {
		const url = `${this.apiUrl}campaign-type/${id}/`;

    return this.http.delete<any>(url);
	}

  // END CAMPAING TYPE  
  
  // SOLUTIONS
   
  public getTableDataSolution(): Observable<entity.TableDataSolution[]> {
		const url = `${this.apiUrl}solution/`;

    return this.http.get<entity.TableDataSolution[]>(url);
	}

  public getDataIdSolution(id:string): Observable<entity.GetDataSolution> {
		const url = `${this.apiUrl}solution/${id}/`;

    return this.http.get<entity.GetDataSolution>(url);
	}

  public postDataSolution(data:entity.PostDataSolution): Observable<any> {
		const url = `${this.apiUrl}solution/`;

    return this.http.post<any>(url, data);
	}

  public patchDataSolution(id:string, data:entity.PatchDataSolution): Observable<any> {
		const url = `${this.apiUrl}solution/${id}/`;

    return this.http.patch<any>(url, data);
	}
 
  public deleteDataSolution(id:string): Observable<any> {
		const url = `${this.apiUrl}solution/${id}/`;

    return this.http.delete<any>(url);
	}

  // END SOLUTIONS 

  
  // COMPANY TYPE 
   
  public getTableDataCompanyType(): Observable<entity.TableDataCompanyType[]> {
		const url = `${this.apiUrl}company-type/`;

    return this.http.get<entity.TableDataCompanyType[]>(url);
	}

  public getDataIdCompanyType(id:string): Observable<entity.GetDataCompanyType> {
		const url = `${this.apiUrl}company-type/${id}/`;

    return this.http.get<entity.GetDataCompanyType>(url);
	}

  public postDataCompanyType(data:entity.PostDataCompanyType): Observable<any> {
		const url = `${this.apiUrl}company-type/`;

    return this.http.post<any>(url, data);
	}

  public patchDataCompanyType(id:string, data:entity.PatchDataCompanyType): Observable<any> {
		const url = `${this.apiUrl}company-type/${id}/`;

    return this.http.patch<any>(url, data);
	}
 
  public deleteDataCompanyType(id:string): Observable<any> {
		const url = `${this.apiUrl}company-type/${id}/`;

    return this.http.delete<any>(url);
	}

  // END COMPANY TYPE  
  
  // ORIGIN 
   
  public getTableDataOrigin(): Observable<entity.TableDataOrigin[]> {
		const url = `${this.apiUrl}platform/`;

    return this.http.get<entity.TableDataOrigin[]>(url);
	}

  public getDataIdOrigin(id:string): Observable<entity.GetDataOrigin> {
		const url = `${this.apiUrl}platform/${id}/`;

    return this.http.get<entity.GetDataOrigin>(url);
	}

  public postDataOrigin(data:entity.PostDataOrigin): Observable<any> {
		const url = `${this.apiUrl}platform/`;

    return this.http.post<any>(url, data);
	}

  public patchDataOrigin(id:string, data:entity.PatchDataOrigin): Observable<any> {
		const url = `${this.apiUrl}platform/${id}/`;

    return this.http.patch<any>(url, data);
	}
 
  public deleteDataOrigin(id:string): Observable<any> {
		const url = `${this.apiUrl}platform/${id}/`;

    return this.http.delete<any>(url);
	}

  // END ORIGIN  


  // BUSINESS 
   
  public getTableDataBusiness(): Observable<entity.TableDataBusiness[]> {
		const url = `${this.apiUrl}business/`;

    return this.http.get<entity.TableDataBusiness[]>(url);
	}

  public getDataIdBusiness(id:string): Observable<entity.GetDataBusiness> {
		const url = `${this.apiUrl}business/${id}/`;

    return this.http.get<entity.GetDataBusiness>(url);
	}

  public postDataBusiness(data:entity.PostDataBusiness): Observable<any> {
		const url = `${this.apiUrl}business/`;

    return this.http.post<any>(url, data);
	}

  public patchDataBusiness(id:string, data:entity.PatchDataBusiness): Observable<any> {
		const url = `${this.apiUrl}business/${id}/`;

    return this.http.patch<any>(url, data);
	}
 
  public deleteDataBusiness(id:string): Observable<any> {
		const url = `${this.apiUrl}business/${id}/`;

    return this.http.delete<any>(url);
	}

  // END BUSINESS  

  
  // SIZE 
   
  public getTableDataSize(): Observable<entity.TableDataSize[]> {
		const url = `${this.apiUrl}company-size/`;

    return this.http.get<entity.TableDataSize[]>(url);
	}

  public getDataIdSize(id:string): Observable<entity.GetDataSize> {
		const url = `${this.apiUrl}company-size/${id}/`;

    return this.http.get<entity.GetDataSize>(url);
	}

  public postDataSize(data:entity.PostDataSize): Observable<any> {
		const url = `${this.apiUrl}company-size/`;

    return this.http.post<any>(url, data);
	}

  public patchDataSize(id:string, data:entity.PatchDataSize): Observable<any> {
		const url = `${this.apiUrl}company-size/${id}/`;

    return this.http.patch<any>(url, data);
	}
 
  public deleteDataSize(id:string): Observable<any> {
		const url = `${this.apiUrl}company-size/${id}/`;

    return this.http.delete<any>(url);
	}

  // END SIZE  
  
  
  // ACTIVITY TYPE 
   
  public getTableDataActivityType(): Observable<entity.TableDataActivityType[]> {
		const url = `${this.apiUrl}activity-type/`;

    return this.http.get<entity.TableDataActivityType[]>(url);
	}

  public getDataIdActivityType(id:string): Observable<entity.GetDataActivityType> {
		const url = `${this.apiUrl}activity-type/${id}/`;

    return this.http.get<entity.GetDataActivityType>(url);
	}

  public postDataActivityType(data:entity.PostDataActivityType): Observable<any> {
		const url = `${this.apiUrl}activity-type/`;

    return this.http.post<any>(url, data);
	}

  public patchDataActivityType(id:string, data:entity.PatchDataActivityType): Observable<any> {
		const url = `${this.apiUrl}activity-type/${id}/`;

    return this.http.patch<any>(url, data);
	}
 
  public deleteDataActivityType(id:string): Observable<any> {
		const url = `${this.apiUrl}activity-type/${id}/`;

    return this.http.delete<any>(url);
	}

  // END ACTIVITY TYPE  
 

  // SUBACTIVITY TYPE 
   
  public getTableDataSubactivityType(): Observable<entity.TableDataSubactivityType[]> {
		const url = `${this.apiUrl}activity-subtype/`;

    return this.http.get<entity.TableDataSubactivityType[]>(url);
	}

  public getDataIdSubactivityType(id:string): Observable<entity.GetDataSubactivityType> {
		const url = `${this.apiUrl}activity-subtype/${id}/`;

    return this.http.get<entity.GetDataSubactivityType>(url);
	}

  public postDatasSubactivityType(data:entity.PostDataSubactivityType): Observable<any> {
		const url = `${this.apiUrl}activity-subtype/`;

    return this.http.post<any>(url, data);
	}

  public patchDataSubactivityType(id:string, data:entity.PatchDataSubactivityType): Observable<any> {
		const url = `${this.apiUrl}activity-subtype/${id}/`;

    return this.http.patch<any>(url, data);
	}
 
  public deleteDatSubactivityType(id:string): Observable<any> {
		const url = `${this.apiUrl}activity-subtype/${id}/`;

    return this.http.delete<any>(url);
	}

  // END SUBACTIVITY TYPE  

}
