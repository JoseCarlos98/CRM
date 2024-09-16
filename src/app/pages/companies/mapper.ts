import { DateTime } from 'luxon';
import { TableDataActivities } from '../management/management-interface';
import * as entity from './companies-interface';
import moment from 'moment';
import { result } from 'lodash';

export class Mapper {
	static getDataTableMapper(response: entity.TableDataCompantResponse): entity.TableDataCompaniesMapperResponse {
		let dataList: entity.TableDataCompanyMapper[] = [];

		response.results.forEach((data: entity.TableDataCompany): void => {
			dataList.push({
				id: data?.company_id || '-',
				logo: data?.logo?.includes('default') ? `../../../assets/images/default.png` : data.logo,
				companyName: data?.company_name || '-',
				status: data?.company_phase?.phase_name || '-',
				amount: '$' + parseFloat(data.total_sales).toLocaleString('en-US', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				}),
				registrationDate: data.register_date ? moment(data.register_date).format('DD/MM/YYYY') :'-',
				country: data.country?.country_name || '-',
				origin: data?.platform?.platform_name || '-',
				category: data?.company_type?.type_name || '-',
				business: data?.business?.business_name || '-',
				campaign: data?.campaign?.campaign_name || '-',
				quotes: {
					amount: data.amout_quotes,
					totalAmount: '$' + parseFloat(data.total_quotes).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})
				},
				sales: {
					amount: data.amout_sales,
					totalAmount: '$' + parseFloat(data.total_sales).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})
				},
				lastContactDate: data?.last_activity?.date_contact || '-',
				history: data?.last_activity?.activity_description || '-'
			});
		});

		return {
			dataList,
			pageSize: response.page_size,
			pagePrevious: response.previous,
			pageNext: response.next,
			count: response.count
		}
	}

	static getDataTableCompanyMapper(response: entity.TableDataCompany): entity.GetDataCompanyMapper {
		console.log(response);
		
		return {
			id: response?.company_id,
			company_name: response?.company_name,
			platform: response?.platform?.platform_id,
			phone_number: response?.phone_number,
			email: response?.email,
			tax_id_number: response?.tax_id_number,
			state: response?.state?.state_id,
			owner_user: response?.owner_user?.id,
			country: response?.country?.country_id,
			campaign: response?.campaign?.campaing_id,
			business: response?.business?.business_id,
			city: response?.city?.city_id,
			address: response?.address,
			company_type: response?.company_type?.company_type_id,
			company_size: response?.company_size?.company_size_id,
			web_page: response?.web_page,
			comments: response?.comments
		}
	};

	static GetDataDetailsCompanyMapper(response: entity.TableDataCompany): entity.GetDataDetailsCompanyMapper {
		return {
			id: response?.company_id,
			logo: response?.logo?.includes('default') ? `../../../assets/images/default.png` : response.logo,
			companyName: response?.company_name || '-',
			statusCompany: response?.company_phase?.phase_name.toLowerCase() || '-',
			city: response?.city?.city_name || '-',
			country: response?.country?.country_name || '-',
			web: response?.web_page || '-',
			business: response?.business?.business_name || '-',
			category: response?.company_size?.size_name || '-',
			campaign: response?.campaign?.campaign_name || '-',
			owner: `${response?.owner_user?.first_name && response?.owner_user?.last_name ? response.owner_user?.first_name.toUpperCase() + ' ' + response.owner_user?.last_name.toUpperCase() : response.owner_user?.username.toUpperCase() || '-'}`,
			email: response?.email || '-',
			phone: response?.phone_number || '-',
			companyContacts: response.company_contacts.map((data) => {
				return {
					id: data?.contact_id || '-',
					full_name: data?.full_name || '-',
					position: data?.position || '-',
					email: data?.email || '-',
					local_phone: data?.local_phone || '-',
					ext: data?.ext || '-',
					movil_phone: data?.movil_phone || '-'
				}
			}),
		}
	};

	static GetDatadetailsActivityMapper(response: TableDataActivities[]): entity.GetDataDetailsHistoryMapper[] {
		let dataList: entity.GetDataDetailsHistoryMapper[] = [];

		console.log('response', response);
		
		response.forEach((data: TableDataActivities, index): void => {
			const dateTimeString = `${data.activity_date}T${data.activity_hour}`;
			const dateTime = DateTime.fromISO(dateTimeString);
			const relativeFormat = dateTime.toRelativeCalendar();

			dataList.push({
				id: data?.activity_id || '-',
				activity: `Act ${index + 1}`,
				agent: `${data?.user?.first_name && data?.user?.last_name ? data.user?.first_name.toUpperCase() + ' ' + data.user?.last_name.toUpperCase() : data.user?.username.toUpperCase() || '-'}`,
				description: data?.description || '-',
				dateNames: relativeFormat,
				date: relativeFormat,
				dateName: dateTimeString,
				activityName : data.type_activity.activity,
				color : data.type_activity.color,
				icon : data.type_activity.icon,
			});
		});

		return dataList
	};
}
