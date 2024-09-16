import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { PatchDataActivities, PostDataActivities } from '../management/management-interface';
import * as entity from './reactivation-interface';
import { Mapper } from './mapper';

@Injectable({
  providedIn: 'root'
})
export class ReactivationService {
  private dataSubject = new BehaviorSubject<any>(null);

  private apiUrl = `${environment.apiURL}reactivation/`;

  constructor(
    private http: HttpClient
  ) { }

  public sendData(data: any) {
    this.dataSubject.next(data);
  }
 
  public getData() {
    return this.dataSubject.asObservable();
  }

  // PENDING CALLS AND DIALY

  public getDataTableCalls(filters?:string): Observable<any> {
    const url = `${environment.apiURL}manage/activity/${filters ? `?${filters}` : ''}`;

    return this.http.get<entity.TableDataCAllsResponse>(url).pipe(
    	map((response) => Mapper.getDataTableMapper(response))
    );
	}

  public getDataIdCallOrDaily(id:string): Observable<any> {
		const url = `${environment.apiURL}manage/activity/${id}/`;

    return this.http.get<any>(url);
	}
 
  public postDataCallOrDaily(data:PostDataActivities): Observable<any> {
		const url = `${environment.apiURL}manage/activity/`;

    const objData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      objData.append(key, value);
    });

    return this.http.post<any>(url, data.document != null ? objData : data)
	}

  public patchDataCallOrDaily(id:string, data:PatchDataActivities): Observable<any> {
		const url = `${environment.apiURL}manage/activity/${id}/`;

    const objData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      objData.append(key, value);
    });

    return this.http.patch<any>(url, data.document != null ? objData : data)
	}
 
  public deleteDataCallOrDaily(id:string): Observable<any> {
		const url = `${environment.apiURL}manage/activity/${id}/`;

    return this.http.delete<any>(url)
	}

  // DIALY
 
  public getDataTableDiary(filter:string): Observable<any> {
    const url = `${environment.apiURL}manage/activity/${filter ? `?${filter}` : ''}`;

    return this.http.get<any>(url)
	}

}
