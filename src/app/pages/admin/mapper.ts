import moment from 'moment';
import * as entity from './admin-interface';

export class Mapper {
	static getDataTableMapper(response: entity.TableDataUsersResponse) : entity.TableDataUsersMapper {
		let dataList : entity.TableDataUsersMapperData[] = [];
console.log('getDataTableMapper', response);

		response.results.forEach((data: any): void => {
			dataList.push({
				id: data?.id || '-',
				userName : `${data?.first_name && data?.last_name ? data.first_name.toUpperCase() + ' ' + data.last_name.toUpperCase() : data.username.toUpperCase() }`,
				logo : data?.logo ? data?.logo.includes('default') ? `../../../assets/images/user-default.png` : data?.logo : `../../../assets/images/user-default.png`,
				role: data?.user_rol?.rol_name || '-',
				email: data?.email || '-',
				ip: data?.voice_identifier || '-',
				ext: data?.ext || '-',
				idSlack : data?.user_id_slack || '-'
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


	static getDataUserMapper(response: any): any {
		return {
			id: response?.id,
			username: response?.username || '',
			first_name: response?.first_name || '',
			last_name: response?.last_name || '',
			email: response?.email || '',
			phone_number: response?.phone_number || '',
			voice_identifier: response?.voice_identifier || '',
			user_id_slack : response?.user_id_slack  || '',
			user_rol : response?.user_rol?.rol_id  || '',
			messagePassword : 'Actualizar contraseña',
		}
	};

		
	static getDataBonusMapper(response: entity.TableDataBonus[]) : entity.TableDataBonusMapper[] {
		let dataList : entity.TableDataBonusMapper[] = [];

		response.forEach((data: entity.TableDataBonus): void => {
			dataList.push({
				id: data.bonus_id,
				name : data?.bonus_name || '-',
				assignedTask : data.campaign?.campaign_name || data.assigned_activity,
				period : {
					start : moment(data.init_date).format('DD/MM/YYYY'),
					end : moment(data.deadline).format('DD/MM/YYYY')
				},
				solutions : data?.bonus_solution[0]?.solution?.solution_name || '-',
				bonusType : data.campaign ? 'Campaña' : 'Actividad',
				agents: {alls : data?.bonus_user},

				base : data?.base_percentage_bonus || '-',
				goal : data?.type_bonus_meta || '-',
			});
		});

		return dataList
	}

	
	static getDataBonusIdMapper(response: any): any {
		console.log(response);
		
		return {
			id: response?.bonus_id,
			bonus_name: response?.bonus_name,
			type_bonus_percentage: response?.type_bonus_percentage,
			type_bonus_meta: response?.type_bonus_meta,
			campaign: response?.campaign?.campaign_id,
			assigned_activity: response?.assigned_activity,
			base_percentage_bonus: response?.base_percentage_bonus,
			fixed_base_income: parseFloat(response?.fixed_base_income,).toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			init_date: response?.init_date,
			deadline: response?.deadline,

			// init_date: moment(response.init_date).format('DD-MM-YYYY'),
			
			// deadline: moment(response.deadline).format('DD-MM-YYYY'),


			bonus_solution : response.bonus_solution.map(data => data.solution.solution_id),
			bonus_user : response.bonus_user.map(data => data.user.id),
			valuesScales: response.bonus_percentage.map((data: any) => {
				return {
					id: data.scale_percentage_id,
					percentage: data.percentage,
					scale_number: data.scale_number,
				}
			}),
			valuesGoalScales: response.bonus_meta.map((data: any) => {
				return {
					id: data.scale_meta_id,
					max_value: data.max_value,
					min_value: data.min_value,
					scale_number: data.scale_number,
				}
			})
		}
	};
}