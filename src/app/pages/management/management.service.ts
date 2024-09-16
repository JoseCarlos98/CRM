import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable, map } from 'rxjs';
import { Mapper } from './mapper';
import * as entity from './management-interface';

@Injectable({
  providedIn: 'root'
})
export class ManagementmentService {

  private apiUrl = `${environment.apiURL}manage/`;

  constructor(
    private http: HttpClient
  ) { }

  // ACTIVITIES
  public getDataTableActivities(filters?:string): Observable<entity.TableDataActivitiesMapperResponse> {
		const url = `${this.apiUrl}activity/${filters ? `?${filters}` : ''}`;

    return this.http.get<entity.TableDataActivitiesResponse>(url).pipe(
    	map((response) => Mapper.getDataTableMapper(response)),
    );
	}

  public getDataId(id:string): Observable<entity.GetDataActivitiesMapper> {
		const url = `${this.apiUrl}activity/${id}/`;

    return this.http.get<entity.TableDataActivities>(url).pipe(
			map((response) => Mapper.getDataMapper(response))
		);
	}

  public postData(data:entity.PostDataActivities): Observable<any> {
		const url = `${this.apiUrl}activity/`;
    
    const objData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      objData.append(key, value);
    });

    return this.http.post<any>(url, data.document != null ? objData : data)
	}

  public patchData(id:string, data:entity.PatchDataActivities): Observable<any> {
		const url = `${this.apiUrl}activity/${id}/`;

    const objData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      objData.append(key, value);
    });

    return this.http.patch<any>(url, data.document != null ? objData : data)
	}

  public deleteData(id:string): Observable<any> {
		const url = `${this.apiUrl}activity/${id}/`;

    return this.http.delete<any>(url)
	}

  public excel(data:any): Observable<any> {
		const url = `${this.apiUrl}/`;

    return this.http.post<any>(url, data)
	}

  // END ACTIVITIES




}
