import moment from 'moment';
import * as entity from './management-interface';

export class Mapper {
	static getDataTableMapper(response: entity.TableDataActivitiesResponse) : entity.TableDataActivitiesMapperResponse {
		let dataList :entity.TableDataActivitiesMapper[] = [];

		response.results.forEach((data: any): void => {	
			dataList.push({
				id: data?.activity_id || '-',
				companyName : data?.company?.company_name || '-',
				companyId : data?.company?.company_id || '-',
				logo : data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`,
				activity_date: data?.activity_date || '-',
				activity_hour: data?.activity_hour || '-',
				description: data?.description || '-',
				process: data?.process || '-',
				register: moment(data.activity_date).format('DD/MM/YYYY'),
				endDate: moment(data.end_date).format('DD/MM/YYYY'),
				finish: data?.finish || false,
				activityType: data?.type_activity?.activity || '-',
				agent: data?.user?.first_name && data?.user?.last_name ? data.user?.first_name.toUpperCase() + ' ' + data.user?.last_name.toUpperCase() : data?.user?.username.toUpperCase() || '-'
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

	static getDataMapper(response : entity.TableDataActivities) : entity.GetDataActivitiesMapper {
		console.log(response);
		return {
			id: response?.activity_id || '-',
			quote_id: response?.quote || '-',
			activity_date : response?.activity_date || '-',
			activity_hour : response?.activity_hour || '-',
			company : response?.company?.company_id || '-',
			companyName : response?.company?.company_name || '-',
			user : response?.user?.id || '-',
			type_activity : response?.type_activity?.type_activity_id || '-',
			campaign : response?.campaign?.campaign_id || '-',
			description : response?.description || '-'
		}
	};
}
