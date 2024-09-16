import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.dev';
import { Observable, map } from 'rxjs';
import * as entity from './admin-interface';
import { Mapper } from './mapper';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = `${environment.apiURL}admin/`;

  constructor(
    private http: HttpClient
  ) { }

  // PRODUCTS 

  public getDataTableProducts(filters?:string): Observable<entity.TableDataProductResponse> {
    const url = `${this.apiUrl}product/${filters ? `?${filters}` : ''}`;

    return this.http.get<entity.TableDataProductResponse>(url)
  }

  public postDataProduct(data: entity.PostDataProduct): Observable<any> {
    const url = `${this.apiUrl}product/`;

    return this.http.post<any>(url, data)
  }

  public patchDataProduct(id: string, data: entity.PostDataProduct): Observable<any> {
    const url = `${this.apiUrl}product/`;

    return this.http.patch<any>(url, data)
  }

  public deleteDataProduct(id: string): Observable<any> {
    const url = `${this.apiUrl}product/${id}/`;

    return this.http.delete<any>(url)
  }

  // END PRODUCTS 

  // PRICE

  public getDataTablePrices(): Observable<entity.DataPriceTable[]> {
    const url = `${this.apiUrl}price/`;

    return this.http.get<entity.DataPriceTable[]>(url)
  }

  public postDataPrice(data: entity.PostDataPrice): Observable<any> {
    const url = `${this.apiUrl}price/`;

    return this.http.post<any>(url, data)
  }

  public patchDataPrice(id: string, data: entity.PostDataPrice): Observable<any> {
    const url = `${this.apiUrl}price/${id}/`;

    return this.http.patch<any>(url, data)
  }

  public deleteDataPrice(id: string): Observable<any> {
    const url = `${this.apiUrl}price${id}/`;

    return this.http.delete<any>(url)
  }

  // END PRICE 

  // DISCOUNTS

  public getDataTableDiscounts(): Observable<entity.DataDiscountTable> {
    const url = `${environment.apiURL}discount`;

    return this.http.get<entity.DataDiscountTable>(url)
  }

  public getDataDiscountId(id: string): Observable<entity.GetDataDiscount> {
    const url = `${environment.apiURL}discount${id}/`;

    return this.http.get<entity.GetDataDiscount>(url)
  }

  public postDataDiscount(data: entity.PostDataDiscount): Observable<any> {
    const url = `${environment.apiURL}discount`;

    return this.http.post<any>(url, data)
  }

  public patchDataDiscount(id: string, data: entity.PostDataDiscount): Observable<any> {
    const url = `${environment.apiURL}discount${id}/`;

    return this.http.patch<any>(url, data)
  }

  public deleteDataDiscount(id: string): Observable<any> {
    const url = `${environment.apiURL}discount${id}/`;

    return this.http.delete<any>(url)
  }

  // END DISCOUNTS 

  // USERS

  public getDataTableUsers(filters?:string) {
		const url = `${environment.apiURL}auth/user/${filters ? `?${filters}` : ''}`;
    

    return this.http.get<entity.TableDataUsersResponse>(url).pipe(
			map((response) => Mapper.getDataTableMapper(response)));
	}

  public getDataUsertId(id: string) {
    const url = `${environment.apiURL}auth/user/${id}/`;

    return this.http.get<any>(url).pipe(map((response) => Mapper.getDataUserMapper(response)));
  }

  public postDataUser(data:entity.PostDataUser): Observable<any> {
    const url = `${environment.apiURL}auth/user/`;

    const objData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      objData.append(key, value);
    });

    return this.http.post<any>(url, data.document != null ? objData : data)
  }

  public patchDataUser(id: string, data:entity.PatchDataUser): Observable<any> {
    const url = `${environment.apiURL}auth/user/${id}/`;

    const objData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      objData.append(key, value);
    });

    return this.http.patch<any>(url, data.profile_picture != null ? objData : data)
  }

  public deleteDataUser(id: string): Observable<any> {
    const url = `${environment.apiURL}auth/user/${id}/`;

    return this.http.delete<any>(url)
  }

  // END USERS 

  // ROLES

  public getDataTableRoles(filters?:string) {
		const url = `${environment.apiURL}settings/rol/${filters ? `?${filters}` : ''}`;
    // const url = `${this.apiUrl}settings/rol/${filters ? `?${filters}` : ''}`;


    return this.http.get<entity.TableDataUsers>(url)
	}

  public getDataRolId(id: string) {
    const url = `${environment.apiURL}settings/rol/${id}/`;

    return this.http.get<any>(url)
  }

  public postDataRol(data): Observable<any> {
    const url = `${environment.apiURL}settings/rol/`;

    return this.http.post<any>(url, data)
  }

  public patchDataRol(id: string, data): Observable<any> {
    const url = `${environment.apiURL}settings/rol/${id}/`;

    return this.http.patch<any>(url, data)
  }

  public deleteDataRol(id: string): Observable<any> {
    const url = `${environment.apiURL}settings/rol/${id}/`;

    return this.http.delete<any>(url)
  }

  // END ROLES 

  // ROLES

  public getDataTableBonus(filters?:string) {
    const url = `${this.apiUrl}bonus/${filters ? `?${filters}` : ''}`;

    return this.http.get<entity.TableDataBonus[]>(url)
      .pipe(map((response) => Mapper.getDataBonusMapper(response)));

	}

  public getDataBonusId(id: string) {
    const url = `${this.apiUrl}bonus/${id}/`;

    return this.http.get<any>(url)
      .pipe(map((response) => Mapper.getDataBonusIdMapper(response)));
  }

  public postDataBonus(data:entity.PostDataBonus): Observable<any> {
    const url = `${this.apiUrl}bonus/`;

    return this.http.post<any>(url, data)
  }

  public patchDataBonus(id: string, data:entity.PatchDataBonus): Observable<any> {
    const url = `${this.apiUrl}bonus/${id}/`;

    return this.http.patch<any>(url, data)
  }

  public deleteDataBonus(id: string): Observable<any> {
    const url = `${this.apiUrl}bonus/${id}/`;

    return this.http.delete<any>(url)
  }
  // END ROLES 
}
