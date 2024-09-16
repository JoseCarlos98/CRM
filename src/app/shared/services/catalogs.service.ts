import { Injectable } from '@angular/core';
import * as entityGeneral from '../../shared/interfaces/general-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment.dev';

@Injectable({
	providedIn: 'root',
})
export class CatalogsService {
	constructor(private http: HttpClient) { }

	public getDataUser(id:string): Observable<entityGeneral.DataUser> {
		const url = `${environment.apiURL}auth/user/${id}/`;

		return this.http.get<entityGeneral.DataUser>(url)
	}

	public getCatStatus(filtro?:string): Observable<entityGeneral.DataCatStatus[]> {
		const url = `${environment.apiURL}settings/status/${filtro ? `?${filtro}` : ''}`;

		return this.http.get<entityGeneral.DataCatStatus[]>(url)
	}

	public getCatAgents(): Observable<entityGeneral.DataCatAgents[]> {
		const url = `${environment.apiURL}auth/user-list/`;

		return this.http.get<entityGeneral.DataCatAgents[]>(url)
	}

	public getCatUsers(): Observable<entityGeneral.DataUser[]> {
		const url = `${environment.apiURL}auth/user-list/`;

		return this.http.get<entityGeneral.DataUser[]>(url)
	}

	public getCatCompany(filters?: any): Observable<entityGeneral.DataCatCompany[]> {
		const url = `${environment.apiURL}company/company-search/${filters ? `?${filters}` : ''}`;

		return this.http.get<entityGeneral.DataCatCompany[]>(url)
	}
	
	public getCatRoles(): Observable<entityGeneral.DataCatRol[]> {
		const url = `${environment.apiURL}settings/rol/`;

		return this.http.get<entityGeneral.DataCatRol[]>(url)
	}

	public getCatCampaing(): Observable<entityGeneral.DataCatCampaing[]> {
		const url = `${environment.apiURL}catch/campaign-list/`;

		return this.http.get<entityGeneral.DataCatCampaing[]>(url)
	}

	public getCatDataWayToPay(): Observable<entityGeneral.DataCatWayToPay[]> {
		const url = `${environment.apiURL}settings/way-to-pay/`;

		return this.http.get<entityGeneral.DataCatWayToPay[]>(url);
	}

	public getCatProducts(): Observable<entityGeneral.DataCatProducts[]> {
		const url = `${environment.apiURL}admin/products-list/`;

		return this.http.get<entityGeneral.DataCatProducts[]>(url)
	}

	public getCatDataContact(filter): Observable<entityGeneral.DataCatContact[]> {
		const url = `${environment.apiURL}company/company-contact/${filter ? `?${filter}` : ''}`;

		return this.http.get<entityGeneral.DataCatContact[]>(url);
	}

	public getCatPaymentMethod(): Observable<entityGeneral.DataCatPaymentMethod[]> {
		const url = `${environment.apiURL}settings/payment-method/`;

		return this.http.get<entityGeneral.DataCatPaymentMethod[]>(url);
	}

	public getCatPaymentCondition(): Observable<entityGeneral.DataCatPaymentCondition[]> {
		const url = `${environment.apiURL}settings/payment-condition/`;

		return this.http.get<entityGeneral.DataCatPaymentCondition[]>(url);
	}

	public getCatInvoiceUse(): Observable<entityGeneral.DataCatInvoiceUse[]> {
		const url = `${environment.apiURL}settings/invoice-use/`;

		return this.http.get<entityGeneral.DataCatInvoiceUse[]>(url);
	}

	public getCatCountry(): Observable<entityGeneral.DataCatCountry[]> {
		const url = `${environment.apiURL}settings/country/`;

		return this.http.get<entityGeneral.DataCatCountry[]>(url)
	}

	public getCatPlatform(): Observable<entityGeneral.DataCatPlatform[]> {
		const url = `${environment.apiURL}settings/platform/`;

		return this.http.get<entityGeneral.DataCatPlatform[]>(url)
	}

	public getCatProductCategory(): Observable<entityGeneral.DataCatProductCategory[]> {
		const url = `${environment.apiURL}settings/product-category/`;

		return this.http.get<entityGeneral.DataCatProductCategory[]>(url)
	}

	public getCatSolutions(): Observable<entityGeneral.DataCatSolutions[]> {
		const url = `${environment.apiURL}settings/solution/`;

		return this.http.get<entityGeneral.DataCatSolutions[]>(url)
	}

	public getCatCurrency(): Observable<entityGeneral.DataCatCurrency[]> {
		const url = `${environment.apiURL}settings/currency/`;

		return this.http.get<entityGeneral.DataCatCurrency[]>(url)
	}

	public getCatBusiness(): Observable<entityGeneral.DataCatBusiness[]> {
		const url = `${environment.apiURL}settings/business/`;

		return this.http.get<entityGeneral.DataCatBusiness[]>(url)
	}

	public getCatCapaignType(): Observable<entityGeneral.DataCatType[]> {
		const url = `${environment.apiURL}settings/campaign-type/`;

		return this.http.get<entityGeneral.DataCatType[]>(url)
	}

	public getCatCompanySize(): Observable<entityGeneral.DataCatCompanySize[]> {
		const url = `${environment.apiURL}settings/company-size/`;

		return this.http.get<entityGeneral.DataCatCompanySize[]>(url)
	}

	public getCatCompanyType(): Observable<entityGeneral.DataCatCompanyType[]> {
		const url = `${environment.apiURL}settings/company-type/`;

		return this.http.get<entityGeneral.DataCatCompanyType[]>(url)
	}

	public getCatState(): Observable<entityGeneral.DataCatState[]> {
		const url = `${environment.apiURL}settings/state/`;

		return this.http.get<entityGeneral.DataCatState[]>(url)
	}

	public getCatCity(idState?:string): Observable<entityGeneral.DataCatCity[]> {
		const url = `${environment.apiURL}settings/city/?state_id=${idState}`;

		return this.http.get<entityGeneral.DataCatCity[]>(url)
	}

	public getCatActivityType(): Observable<entityGeneral.DataCatActivityType[]> {
		const url = `${environment.apiURL}settings/activity-type/`;

		return this.http.get<entityGeneral.DataCatActivityType[]>(url);
	}

	public getCatOrigin(): Observable<entityGeneral.DataCatOrigin[]> {
		const url = `${environment.apiURL}settings/platform/`;

		return this.http.get<entityGeneral.DataCatOrigin[]>(url);
	}

	public getCatQuoteOpen(id:string): Observable<entityGeneral.DataCatQuoteOpen> {
		const url = `${environment.apiURL}conversion/quote-open/?company_id=${id}`;

		return this.http.get<entityGeneral.DataCatQuoteOpen>(url);
	}
}
