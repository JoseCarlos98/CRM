import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { BehaviorSubject, Observable, map } from 'rxjs';
import * as entity from './catchment-interface';
import { Mapper } from './mapper';

@Injectable({
  providedIn: 'root'
})
export class CatchmentService {
  private dataSubject = new BehaviorSubject<any>(null);

  private apiUrl = `${environment.apiURL}catch/`;

  constructor(
    private http: HttpClient
  ) { }

  public sendData(data: any) {
    this.dataSubject.next(data);
  }
 
  public getData() {
    return this.dataSubject.asObservable();
  }

  // CAMPAIGNS
  public getDataTableCampaing(filters?:string): Observable<entity.TableDataCampaingMapperResponse> {
		const url = `${this.apiUrl}campaign/${filters ? `?${filters}` : ''}`;

    return this.http.get<entity.TableDataCompantResponse>(url).pipe(
			map((response) => Mapper.getDataTableCampaingMapper(response)),
		);
	}

  public getDataId(id:string): Observable<entity.GetDataCampainMapper> {
		const url = `${this.apiUrl}campaign/${id}/`;

    return this.http.get<entity.TableDataCampaing>(url).pipe(
			map((response) => Mapper.GetDataTableCampaingMapper(response))
		);
	}

  public postData(data:entity.PostDataCampaing): Observable<any> {
		const url = `${this.apiUrl}campaign/`;

    return this.http.post<any>(url, data)
	}

  public patchData(id:string, data:entity.PatchDataCampaing): Observable<any> {
		const url = `${this.apiUrl}campaign/${id}/`;

    return this.http.patch<any>(url, data)
	}
 
  public deleteData(id:string): Observable<any> {
		const url = `${this.apiUrl}campaign/${id}/`;

    return this.http.delete<any>(url)
	}

  public excel(data:any): Observable<any> {
		const url = `${this.apiUrl}/`;

    return this.http.post<any>(url, data)
	}

  // END CAMPAIGNS




}
