import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable, map } from 'rxjs';
import { PatchDataActivities, PostDataActivities } from '../management/management-interface';
import * as entity from './reactivation-interface';
import { Mapper } from './mapper';

@Injectable({
  providedIn: 'root'
})
export class ReactivationService {

  private apiUrl = `${environment.apiURL}reactivation/`;


  constructor(
    private http: HttpClient
  ) { }

  public getDataTable(filters:any): Observable<any> {
    const url = `${environment.apiURL}manage/activity/?activity_type_id=fde5d736-c7ad-4ccc-9037-d742aa3b8a44`;

    return this.http.get<entity.TableDataCalls[]>(url).pipe(
    	map((response) => Mapper.getDataTableMapper(response))
    );
	}

  public getDataId(id:string): Observable<any> {
  // public getDataId(id:string): Observable<entity.GetDataActivitiesMapper> {
		const url = `${environment.apiURL}manage/activity/${id}/`;

    return this.http.get<any>(url).pipe(
			map((response) => Mapper.getDataMapper(response))
		);
	}
 
  public postData(data:PostDataActivities): Observable<any> {
		const url = `${environment.apiURL}manage/activity/`;

    return this.http.post<any>(url, data)
	}

  public patchData(id:string, data:PatchDataActivities): Observable<any> {
		const url = `${environment.apiURL}manage/activity/${id}/`;

    return this.http.patch<any>(url, data)
	}
 
  public deleteData(id:string): Observable<any> {
		const url = `${environment.apiURL}manage/activity/${id}/`;

    return this.http.delete<any>(url)
	}

}
