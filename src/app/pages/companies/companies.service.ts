import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { BehaviorSubject, Observable, map } from 'rxjs';
import * as entity from './companies-interface';
import * as entityGeneral from '../../shared/interfaces/general-interface';
import { Mapper } from './mapper';
import { TableDataActivities } from '../management/management-interface';

@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  private dataSubject = new BehaviorSubject<any>(null);

  private apiUrl = `${environment.apiURL}company/`;

  constructor(private http: HttpClient) { }
  
  public sendData(data: any) {
    console.log(data);
    this.dataSubject.next(data);
  }
 
  public getData() {
    return this.dataSubject.asObservable();
  }

  public getCatCompany(filters?:any): Observable<entityGeneral.DataCatCompany[]> {
		const url = `${this.apiUrl}company/${filters ? `?${filters}` : ''}`;

    return this.http.get<entityGeneral.DataCatCompany[]>(url).pipe(
			map((response) => {
        let dataList :any = []
        response.forEach((data: entity.TableDataCompany): void => {
          dataList.push({
          companyName : data.company_name,
          companyId : data.company_id
          });
        });
        return dataList
      })
		);
	}

  public getDataCompanySearch(filter:string): Observable<any> {
    const url = `${this.apiUrl}company-search/?company_query=${filter}`;

    return this.http.get<any>(url)
    // .pipe(
		// 	map((response) => Mapper.GetDatadetailsActivityMapper(response))
		// );
	}

  public getDataHistoryCalls(filters?:string): Observable<entity.GetDataDetailsHistoryMapper[]> {
    const url = `${environment.apiURL}manage/activity/${filters ? `?${filters}` : ''}`;

    return this.http.get<TableDataActivities[]>(url).pipe(
			map((response) => Mapper.GetDatadetailsActivityMapper(response))
		);
	}

  public getDataTable(filters?:string): Observable<entity.TableDataCompaniesMapperResponse> {
    const url = `${this.apiUrl}company/${filters ? `?${filters}` : ''}`;
    
    return this.http.get<entity.TableDataCompantResponse>(url).pipe(
			map((response) => Mapper.getDataTableMapper(response))
		);
	}
  
  public getDataId(id:string): Observable<any> {
		const url = `${this.apiUrl}company/${id}/`;

    return this.http.get<entity.TableDataCompany>(url).pipe(
			map((response) => Mapper.getDataTableCompanyMapper(response))
		);
	}
  
  public getDataDetailsCompanyId(id:string): Observable<entity.GetDataDetailsCompanyMapper> {
		const url = `${this.apiUrl}company/${id}/`;

    return this.http.get<entity.TableDataCompany>(url).pipe(
			map((response) => Mapper.GetDataDetailsCompanyMapper(response))
		);
	}

  public postData(data:entity.PostDataCompany): Observable<any> {
		const url = `${this.apiUrl}company/`;

    // Obtenemos los valores del formulario
    const objData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'company_contacts') {
        value.forEach((contact, index) => {
          Object.entries(contact).forEach(([contactKey, contactValue]) => {
            if (typeof contactValue === 'string') {
              objData.append(`company_contacts[${index}][${contactKey}]`, contactValue);
            }
          });
        });
      } else {
        objData.append(key, value);
      }
    });

    // Configura manualmente el Content-Type en FormData
    //objData.set('Content-Type', 'multipart/form-data');

    return this.http.post<any>(url, data.logo != null ? objData : data)
	}

  public patchData(id:string, data:entity.GetDataCompanyMapper): Observable<any> {
		const url = `${this.apiUrl}company/${id}/`;

    // Obtenemos los valores del formulario
    const objData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'company_contacts') {
        value.forEach((contact, index) => {
          Object.entries(contact).forEach(([contactKey, contactValue]) => {
            if (typeof contactValue === 'string') {
              objData.append(`company_contacts[${index}][${contactKey}]`, contactValue);
            }
          });
        });
      } else {
        objData.append(key, value);
      }
    });

    // Configura manualmente el Content-Type en FormData
    //objData.set('Content-Type', 'multipart/form-data');

    return this.http.patch<any>(url, data.logo != null ? objData : data)
	}
 
  public deleteData(id:string): Observable<any> {
		const url = `${this.apiUrl}company/${id}/`;

    return this.http.delete<any>(url)
	}
  
  public async(data:any): Observable<any> {
		const url = `${this.apiUrl}/`;

    return this.http.post<any>(url, data)
	}
 
  public bulkLoad(data:any): Observable<any> {
		const url = `${this.apiUrl}/`;

    return this.http.post<any>(url, data)
	}

  public excel(data:any): Observable<any> {
		const url = `${this.apiUrl}/`;

    return this.http.post<any>(url, data)
	}

  public postDataQuote(data:any): Observable<any> {
		const url = `${environment.apiURL}conversion/quote/`;

    return this.http.post<any>(url, data)
	}

  public getDataContact(filtro): Observable<any> {
    const url = `${this.apiUrl}company-contact/${filtro}`;
    
    return this.http.get<any>(url)
	}
  
  public postDataContact(data:any): Observable<any> {
    const url = `${this.apiUrl}company-contact/`;
    
    return this.http.post<any>(url, data)
	}
  
  public patchDataContact(id:string, data:any): Observable<any> {
    const url = `${this.apiUrl}company-contact/${id}/`;

    return this.http.patch<any>(url, data)
  }
  
  public deleteDataContact(id:string): Observable<any> {
    const url = `${this.apiUrl}company-contact/${id}/`;

    return this.http.delete<any>(url)
  }
}
