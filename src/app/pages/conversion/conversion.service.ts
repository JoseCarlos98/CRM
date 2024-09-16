import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import * as entity from './conversion-interface';
import { Mapper } from './mapper';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {
  private dataSubject = new BehaviorSubject<any>(null);

  private apiUrl = `${environment.apiURL}conversion/`;

  constructor(private http: HttpClient) { }

  public sendData(data: any) {
    this.dataSubject.next(data);
  }
 
  public getData() {
    return this.dataSubject.asObservable();
  }

   public getDataTable(filters?:string): Observable<entity.TableDataQuoteMapperResponse> {
    const url = `${this.apiUrl}quote/${filters ? `?${filters}` : ''}`;
    
    return this.http.get<entity.TableDataQuoteResponse>(url).pipe(
			map((response) => Mapper.getDataTableMapper(response))
		);
	}
 
  public getDataDetailQuoteTable(filters?:string): Observable<entity.TableDataQuoteMapperResponse> {
    const url = `${environment.apiURL}conversion/quote/${filters ? `?${filters}` : ''}`
    
    return this.http.get<entity.TableDataQuoteResponse>(url).pipe(
			map((response) => Mapper.getDataTableMapper(response))
		);
	}
  
  public getDataId(id:string): Observable<any> {
		const url = `${this.apiUrl}quote/${id}/`;

    return this.http.get<entity.TableDataQuote>(url).pipe(
			map((response) => Mapper.GetDataTableCompanyMapper(response))
		);
	}

  public postData(data:any): Observable<any> {
		const url = `${this.apiUrl}quote/`;

    return this.http.post<any>(url, data);
	}

  public patchData(id:string, data:entity.GetDataCompanyMapper): Observable<any> {
		const url = `${this.apiUrl}quote/${id}/`;

    return this.http.patch<any>(url, data);
	}
 
  public deleteData(id:string): Observable<any> {
		const url = `${this.apiUrl}quote/${id}/`;

    return this.http.delete<any>(url);
	}
  
  public postDataMoneyAccount(data:any): Observable<any> {
		const url = `${this.apiUrl}invoice/`;

    return this.http.post<any>(url, data);
	}

  public acceptQuote(data:any): Observable<any> {
		const url = `${this.apiUrl}tracking/`;

    return this.http.post<any>(url, data);
	}
  
  public rejectQuote(data:any): Observable<any> {
		const url = `${this.apiUrl}tracking/`;

    return this.http.post<any>(url, data);
	}

  public closeSale(data:any): Observable<any> {
		const url = `${this.apiUrl}tracking/`;

    return this.http.post<any>(url, data);
	}

  public cancelQuote(data:any): Observable<any> {
		const url = `${this.apiUrl}tracking/`;

    return this.http.post<any>(url, data);
	}

  public moneyAccount(data:any): Observable<any> {
		const url = `${this.apiUrl}tracking/`;

    return this.http.post<any>(url, data);
	}

  public billing(data:any): Observable<any> {
		const url = `${this.apiUrl}invoice/`;

    return this.http.post<any>(url, data);
	}

  public sendEmail(data:any): Observable<any> {
		const url = `${environment.apiURL}mail/send-quote-email/?email_send=${data.email_send}&quote_id=${data.quote_id}&message=${data.message}`;

    return this.http.get<any>(url, data);
	}

  public douwnloadExel(filters:string){
    const url = `${this.apiUrl}quote/${filters ? `?${filters}` : ''}`;
    
    return this.http.get<any>(url)
    // return this.http.get<any>(url, { responseType: 'blob' });

	}
}