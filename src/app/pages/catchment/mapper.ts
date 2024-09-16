import moment from 'moment';
import * as entity from './catchment-interface';

export class Mapper {
	static getDataTableCampaingMapper(response: entity.TableDataCompantResponse) : entity.TableDataCampaingMapperResponse {
		let dataList : any[] = [];
		console.log(response);
		

		response.results.forEach((data: entity.TableDataCampaing): void => {
			dataList.push({
				id: data.campaign_id,
				dateStartEnd: {start: moment(data.start_date).format('DD/MM/YYYY'), end: moment(data.end_date).format('DD/MM/YYYY')},
				name: data?.campaign_name || '-',
				code: data?.campaign_code || '-',
				companyType : data?.campaign_type?.campaign_type_name || '-',
				totalCompanies : data?.total_companies,
				totalSalesAmount: {
					amount: data?.total_sales, 
					totalAmount: '$' + parseFloat(data?.total_amount || '0').toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})
				},
				amounInvested : '$' + parseFloat(data?.amount_invested || '0').toLocaleString('en-US', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				}),
				agents: {name : `${data?.owner_user?.first_name && data?.owner_user?.last_name ? data.owner_user?.first_name.toUpperCase() + ' ' + data.owner_user?.last_name.toUpperCase() : data.owner_user?.username.toUpperCase() }`, alls : data?.users, main: data?.owner_user } ,
				companiesMain : { amount : data?.companies?.length, alls : data?.companies },
				quotesMade : { 
					left : {
						amount: data?.number_quotes_lead,
						totalAmount: '$' + parseFloat(data?.amout_quotes_lead || '0').toLocaleString('en-US', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})
					},
					right : {
						amount: data?.number_quotes_client,
						totalAmount: '$' + parseFloat(data?.amout_quotes_client || '0').toLocaleString('en-US', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})
					} 
				},
				campaingData : {
					campaign_name: data?.campaign_name,
					goal_total_companies: data?.goal_total_companies,
					goal_total_responses: data?.goal_total_responses,
					goal_number_quotes: data?.goal_number_quotes,
					goal_number_sales: data?.goal_number_sales,
					goal_amount: data?.goal_amount,
					amount_invested: data?.amount_invested,
					start_date: moment(data.start_date).format('DD/MM/YYYY'),
					end_date: moment(data.end_date).format('DD/MM/YYYY'),
					total_companies: data?.total_companies,
					number_quotes_lead: data?.number_quotes_lead,
					number_quotes_client: data?.number_quotes_client,
					total_sales: data?.total_sales,
					total_amount: data?.total_amount,
					average_quote: data?.average_quote,
					average_sales: data?.average_sales,
					companies: data?.companies?.length ? data?.companies?.filter(data=> data.response) : []
				},
			});
		});

		console.log('dataList', dataList);
		
		return {
			dataList,
			pageSize: response.page_size,
			pagePrevious: response.previous,
			pageNext: response.next,
			count: response.count
		}
	}
	
	static GetDataTableCampaingMapper(response: entity.TableDataCampaing) : entity.GetDataCampainMapper {
		console.log(response);
		
		return {
			id: response.campaign_id,
			campaign_code : response.campaign_code,
			campaign_name : response.campaign_name,
			amount_invested: parseFloat(response?.amount_invested || '0').toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			campaign_type : response.campaign_type.campaign_type_id,
			owner_user : response.owner_user.id,
			users : response.users.map(data => data.user.id),
			solutions : response.solutions.map(data => data?.solution?.solution_id),
			start_date : response.start_date,
			end_date : response.end_date,
			description : response.description,
			goal_total_companies : response.goal_total_companies,
			goal_total_responses : response.goal_total_responses,
			goal_number_quotes : response.goal_number_quotes,
			goal_number_sales : response.goal_number_sales,
			goal_amount: parseFloat(response?.goal_amount || '0').toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			companiesSelected : response.companies.map(data => data.company),
			formCompanies : {
				companies : response.companies.map(data => data.company.company_id)
			}
		}
	};
}
