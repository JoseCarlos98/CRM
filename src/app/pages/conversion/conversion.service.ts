import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable, map } from 'rxjs';
import * as entity from './conversion-interface';
import { Mapper } from './mapper';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  private apiUrl = `${environment.apiURL}conversion/`;

  constructor(private http: HttpClient) { }

   public getDataTable(filters?:string): Observable<entity.TableDataQuoteMapper[]> {
    const url = `${this.apiUrl}quote/${filters ? `?${filters}` : ''}`;
    
    return this.http.get<entity.TableDataQuote[]>(url).pipe(
			map((response) => Mapper.getDataTableMapper(response))
		);
	}
  
  public getDataId(id:string): Observable<any> {
		const url = `${this.apiUrl}company/${id}/`;

    return this.http.get<any>(url).pipe(
			map((response) => Mapper.editDataTableCompanyMapper(response))
		);
	}

  public postData(data:any): Observable<any> {
		const url = `${this.apiUrl}quote/`;

    return this.http.post<any>(url, data)
	}

  public patchData(id:string, data:entity.GetDataCompanyMapper): Observable<any> {
		const url = `${this.apiUrl}quote/${id}/`;

    return this.http.patch<any>(url, data)
	}
 
  public deleteData(id:string): Observable<any> {
		const url = `${this.apiUrl}quote/${id}/`;

    return this.http.delete<any>(url)
	}
  
  public postDataMoneyAccount(data:any): Observable<any> {
		const url = `${this.apiUrl}invoice/`;

    return this.http.post<any>(url, data)
	}

  public acceptQuote(data:any): Observable<any> {
		const url = `${this.apiUrl}tracking/`;

    return this.http.post<any>(url, data)
	}

  public closeSale(data:any): Observable<any> {
		const url = `${this.apiUrl}tracking/`;

    return this.http.post<any>(url, data)
	}

  public moneyAccount(data:any): Observable<any> {
		const url = `${this.apiUrl}tracking/`;

    return this.http.post<any>(url, data)
	}

  public billing(data:any): Observable<any> {
		const url = `${this.apiUrl}invoice/`;

    return this.http.post<any>(url, data)
	}
}