import moment from 'moment';
import * as entity from './dashboard-interface';

export class Mapper {
	static getDataStaticsMapper(response: entity.DatsStatics): entity.DatsStaticsMapper {
		console.log(response);
		return {
			open: {
				lead: response?.cotizaciones_abiertas_l,
				client: response?.cotizaciones_abiertas_c,
				total: response?.total_cotizaciones_abiertas
			},
			discarded: {
				lead: response?.cotizaciones_descartadas_l,
				client: response?.cotizaciones_descartadas_c,
				total: response?.total_cotizaciones_descartadas
			},
			closedQuotesSales: response?.cotizaciones_cerradas_ventas,
			totalEntries: response?.total_entradas,
			totalClosedQuotesSales: response?.total_cerradas_ventas,
			latestRegisteredCompanies: response.ultimas_empresas.map((data: any) => {
				return {
					id: data?.company_id || '-',
					name: data?.company_name || '-',
					date: data?.register_date_format || '-',
					country: data?.country_name_format.includes('Sin país definido') ? '-' : data?.country_name_format
				}
			}),
			rankingCompaniesCountry: response.ranking_empresas_registradas_por_pais.map((data) => {
				return {
					name: data?.country_name.includes('Sin país definido') ? '-' : data?.country_name,
					total: data?.total_empresas || '-',
				}
			}),
			customersPurchasedMost: response.empresas_mas_compran.map(data => {
				return {
					id: data?.company_id || '-',
					name: data?.company_name || '-',
					amount: '$' + parseFloat(data.total_sales).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})
				}
			}),
			countriesBuyMost: response.ranking_empresas_por_pais.map(data => {
				return {
					name: data?.country_name || '-',
					amount: '$' + parseFloat(data.quote_total_sum).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					})
				}
			}),
			dataStatus: response.empresas_por_fase.map(data => {
				return {
					name: data?.company_phase__phase_name || '-',
					total: data?.total
				}
			}),
			categories: response.empresas_por_giro.map(data => {
				return {
					name: data?.business_name || '-',
					total: data?.total
				}
			})
		}
	};

	static getDataPipelineMapper(response: entity.DatsPipeLine): entity.DatsPipeLineMapper {
		console.log('MAPPER', response);
		return {
			totalSum: '$' + (response?.suma_sales_leads + response.suma_sales).toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			totalQuoteLeads: '$' + response?.suma_quote_leads.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			totalQuoteClients: '$' + response?.suma_quote_clients.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			totalClientSales: '$' + response?.suma_sales.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			totalSaleSales: '$' + response?.suma_sales_leads.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			quoteClients: response?.quotes_clients.map(data => {
				return {
					id: data.quote_id,
					companyName: {
						id: data?.company?.company_id || '-',
						name: data?.company?.company_name || '-',
						logo: data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`
					},
					companyInfo: {
						company_name: data?.company?.company_name || '-',
						tax_id_number: data?.company?.tax_id_number || '-',
						payment_method_id: data?.company?.payment_method?.payment_method_id || '-',
						way_to_pay_id: data?.company?.way_to_pay?.way_to_pay_id || '-',
						payment_condition_id: data?.company?.payment_condition?.payment_condition_id || '-',
						invoice_use_id: data?.company?.invoice_use?.invoice_use_id || '-',
						invoice_status: data?.invoice_status?.status_id || '-'
					},
					status: data?.status?.description || '-',
					quoteNumber: data?.quote_number || '-',
					moneyInAccount: data?.money_in_account,
					actionName: data?.status?.description,
					isBilled: data?.invoice_status?.description.includes('Facturada') ? true : false,
					actionStatusId: data?.status?.status_id,
					actions: data?.status?.status_id == '5fb730e9-3802-461f-a4f3-592ff04c4387' ? ['Aceptar', 'Rechazar'] :
						data?.status?.status_id == '3944df8e-d359-4569-b712-ea174be69cca' ? ['Rechazar', 'Cancelar', 'Cerrar como venta'] : [],
					optionOne: (() => {
						const optionData = data?.quote_options[0];
						if (optionData) {
							return [{
								options: data.quote_options.map(resp => {
									return {
										listPrice: '$' + parseFloat(resp?.option_products[0]?.product?.list_price).toLocaleString('en-US', {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										}),
										amount: '$' + parseFloat(resp?.total).toLocaleString('en-US', {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										}),
										places: resp?.option_products[0]?.quantity || 0,
										validity: resp.deadline
									}
								}),
								optionsValidity: data.quote_options.map(resp => {
									return {
										validity: resp.deadline
									}
								}),
								listPrice: '$' + parseFloat(optionData?.option_products[0]?.product?.list_price).toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								}),
								platform: data?.company?.platform?.platform_name,
								places: optionData?.option_products[0]?.quantity || 0,
								campaign: data?.campaign?.campaign_name || '-',
								validity: optionData.deadline
							}];
						}
					})(),
					
					closeSale: data.quote_options.map((dataClose, index) => {
						const total = dataClose?.option_products?.reduce((acc, product) => acc + parseFloat(product?.total), 0);
						const places = dataClose?.option_products?.reduce((acc, product) => acc + product?.quantity, 0);
						const productNames = dataClose?.option_products?.map(product => product?.product?.name || '-');

						return {
							totalPrice: {
								id: dataClose?.quote_option_id,
								name: `OP${index + 1}:`,
								expire: dataClose.deadline,
								total: '$' + parseFloat(dataClose.total).toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								})
							},
							product: {
								type: dataClose?.type_price === 1 ? 'Normal' : 'Promoción',
								places: places,
								products: productNames,
								total: '$' + parseFloat(dataClose.total).toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								}),
							}
						};
					})
				}
			}),
			quoteLeads: response?.quotes_leads.map(data => {
				return {
					id: data.quote_id,
					companyName: {
						id: data?.company?.company_id || '-',
						name: data?.company?.company_name || '-',
						logo: data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`
					},
					status: data?.status?.description || '-',
					quoteNumber: data?.quote_number || '-',
					moneyInAccount: data?.money_in_account,
					actionName: data?.status?.description,
					isBilled: data?.invoice_status?.description.includes('Facturada') ? true : false,
					actionStatusId: data?.status?.status_id,
					actions: data?.status?.status_id == '5fb730e9-3802-461f-a4f3-592ff04c4387' ? ['Aceptar', 'Rechazar'] :
						data?.status?.status_id == '3944df8e-d359-4569-b712-ea174be69cca' ? ['Rechazar', 'Cancelar', 'Cerrar como venta'] : [],
					companyInfo: {
						company_name: data?.company?.company_name || '-',
						tax_id_number: data?.company?.tax_id_number || '-',
						payment_method_id: data?.company?.payment_method?.payment_method_id || '-',
						way_to_pay_id: data?.company?.way_to_pay?.way_to_pay_id || '-',
						payment_condition_id: data?.company?.payment_condition?.payment_condition_id || '-',
						invoice_use_id: data?.company?.invoice_use?.invoice_use_id || '-',
						invoice_status: data?.invoice_status?.status_id || '-'
					},
					optionOne: (() => {
						const optionData = data?.quote_options[0];
						console.log(optionData);

						if (optionData) {
							return [{
								options: data.quote_options.map(resp => {
									return {
										listPrice: '$' + parseFloat(resp?.option_products[0]?.product?.list_price).toLocaleString('en-US', {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										}),
										amount: '$' + parseFloat(resp?.total).toLocaleString('en-US', {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										}),
										places: resp?.option_products[0]?.quantity || 0,
									}
								}),
								optionsValidity: data.quote_options.map(resp => {
									return {
										validity: resp.deadline
									}
								}),
								listPrice: '$' + parseFloat(optionData?.option_products[0]?.product?.list_price).toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								}),
								platform: data?.company?.platform?.platform_name,
								places: optionData?.option_products[0]?.quantity || 0,
								campaign: data?.campaign?.campaign_name || '-',
							}];
						}
					})(),
					closeSale: data.quote_options.map((dataClose, index) => {
						const total = dataClose?.option_products?.reduce((acc, product) => acc + parseFloat(product?.total), 0);
						const places = dataClose?.option_products?.reduce((acc, product) => acc + product?.quantity, 0);
						const productNames = dataClose?.option_products?.map(product => product?.product?.name || '-');

						return {
							totalPrice: {
								id: dataClose?.quote_option_id,
								name: `OP${index + 1}:`,
								expire: dataClose.deadline,
								total: '$' + parseFloat(dataClose.total).toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								})
							},
							product: {
								type: dataClose?.type_price === 1 ? 'Normal' : 'Promoción',
								places: places,
								products: productNames,
								total: '$' + parseFloat(dataClose.total).toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								}),
							}
						};
					})
				}
			}),
			leadsSales: response?.quotes_sales_leads.map(data => {
				console.log(data.payment_date);
				
				return {
					id: data.quote_id,
					companyName: {
						id: data?.company?.company_id || '-',
						name: data?.company?.company_name || '-',
						logo: data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`
					},
					status: data?.status?.description || '-',
					quoteNumber: data?.quote_number || '-',
					moneyInAccount: data?.money_in_account,
					actionName: data?.status?.description,
					paymentDate: data?.payment_date,
					isBilled: data?.invoice_status?.description.includes('Facturada') ? true : false,
					companyInfo: {
						company_name: data?.company?.company_name || '-',
						tax_id_number: data?.company?.tax_id_number || '-',
						payment_method_id: data?.company?.payment_method?.payment_method_id || '-',
						way_to_pay_id: data?.company?.way_to_pay?.way_to_pay_id || '-',
						payment_condition_id: data?.company?.payment_condition?.payment_condition_id || '-',
						invoice_use_id: data?.company?.invoice_use?.invoice_use_id || '-',
						invoice_status: data?.invoice_status?.status_id || '-'
					},
					amount: '$' + parseFloat(data.quote_options[0].total).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					}),
					campaign: data?.campaign?.campaign_name || '-',
					optionOne: (() => {
						const optionData = data?.quote_options[0];
						if (optionData) {
							return [{
								options: data.quote_options.map(resp => {
									console.log('resp', resp);
									
									return {
										listPrice: '$' + parseFloat(resp?.option_products[0]?.product?.list_price).toLocaleString('en-US', {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										}),
										amount: '$' + parseFloat(resp?.total).toLocaleString('en-US', {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										}),
										places: resp?.option_products[0]?.quantity || 0,
										selected : resp.selected
									}
								}),
								optionsValidity: data.quote_options.map(resp => {
									return {
										validity: resp.deadline,
									}
								}),
								listPrice: '$' + parseFloat(optionData?.option_products[0]?.product?.list_price).toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								}),
								platform: data?.company?.platform?.platform_name,
								amount: '$' + parseFloat(optionData?.total).toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								}),
								places: optionData?.option_products[0]?.quantity || 0,
							}];
						}
					})(),
				}
			}),
			clientSales: response.quotes_sales.map(data => {
				return {
					id: data.quote_id,
					companyName: {
						id: data?.company?.company_id || '-',
						name: data?.company?.company_name || '-',
						logo: data?.company ? data?.company?.logo.includes('default') ? `../../../assets/images/default.png` : data?.company?.logo : `../../../assets/images/default.png`
					},
					status: data?.status?.description || '-',
					quoteNumber: data?.quote_number || '-',
					moneyInAccount: data?.money_in_account,
					actionName: data?.status?.description,
					paymentDate: data?.payment_date,
					isBilled: data?.invoice_status?.description.includes('Facturada') ? true : false,
					companyInfo: {
						company_name: data?.company?.company_name || '-',
						tax_id_number: data?.company?.tax_id_number || '-',
						payment_method_id: data?.company?.payment_method?.payment_method_id || '-',
						way_to_pay_id: data?.company?.way_to_pay?.way_to_pay_id || '-',
						payment_condition_id: data?.company?.payment_condition?.payment_condition_id || '-',
						invoice_use_id: data?.company?.invoice_use?.invoice_use_id || '-',
						invoice_status: data?.invoice_status?.status_id || '-'
					},
					amount: '$' + parseFloat(data.quote_options[0].total).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2
					}),
					campaign: data?.campaign?.campaign_name || '-',
					optionOne: (() => {
						const optionData = data?.quote_options[0];
						if (optionData) {
							return [{
								options: data.quote_options.map(resp => {
									return {
										listPrice: '$' + parseFloat(resp?.option_products[0]?.product?.list_price).toLocaleString('en-US', {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										}),
										amount: '$' + parseFloat(resp?.total).toLocaleString('en-US', {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2
										}),
										selected : resp.selected,
										places: resp?.option_products[0]?.quantity || 0,
									}
								}),
								optionsValidity: data.quote_options.map(resp => {
									return {
										validity: moment(resp.deadline).format('DD/MM/YYYY')
									}
								}),
								listPrice: '$' + parseFloat(optionData?.option_products[0]?.product?.list_price).toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								}),
								platform: data?.company?.platform?.platform_name,
								amount: '$' + parseFloat(optionData?.total).toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								}),
								places: optionData?.option_products[0]?.quantity || 0,
							}];
						}
					})(),
				}
			}),
		}

	};

	static getDataCampaignsMapper(response: entity.DataCampaings): entity.DataCampaingsMapper {
		return {
			totalCampaign: response?.total_campanias || 0,
			totalAmountInvestedCampaign: '$' + response?.total_monto_invertido.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			costCampaign: '$' + response?.costo_promedio_campania.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			totalProspectsQuote: response?.total_prospectos_alcanzados || 0,
			costProspectQuote: '$' + response?.costo_promedio_campania_prospecto.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			totalQuoteMade: response?.total_cotizaciones_realizadas || 0,
			costQuote: '$' + response?.costo_promedio_cotizacion.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			totalAmountQuotesMade: '$' + response?.monto_total_cotizaciones_realizadas.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			totalSalesclosed: response.total_ventas_cerradas || 0,
			totalEntries: response.total_entradas || 0,
			costSale: '$' + response?.costo_promedio_venta.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),

			totalSalesAmount: '$' + response?.monto_total_ventas.toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			}),
			percentageSales: response.porcentaje_campania_contra_total_ventas || 0,
			campaignHistory: response.historial_campanias.map(data => {
				return {
					id: data.campaign_id,
					dateStartEnd: { start: data.start_date, end: data.end_date },
					codeAndname: { code: data.campaign_code, name: data.campaign_name },
					companyType: data?.campaign_type?.campaign_type_name,
					totalCompanies: data.total_companies,
					totalSalesAmount: {
						amount: data.total_sales,
						totalAmount: '$' + parseFloat(data.total_amount).toLocaleString('en-US', {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})
					},
					amounInvested: '$' + parseFloat(data.amount_invested).toLocaleString('en-US', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					}),
					agents: { name: `${data?.owner_user ? data?.owner_user?.first_name && data?.owner_user?.last_name ? data.owner_user?.first_name.toUpperCase() + ' ' + data.owner_user?.last_name.toUpperCase() : data.owner_user?.username.toUpperCase() : '-'}`, alls: data.users, main: data.owner_user },
					companiesMain: { amount: data.companies?.length, alls: data?.companies || [] },
					quotesMade: {
						left: {
							amount: data.number_quotes_lead,
							totalAmount: '$' + parseFloat(data.amout_quotes_lead).toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})
						},
						right: {
							amount: data.number_quotes_client,
							totalAmount: '$' + parseFloat(data.amout_quotes_client).toLocaleString('en-US', {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2
							})
						}
					},
					campaingData: {
						campaign_name: data?.campaign_name || '-',
						goal_total_companies: data?.goal_total_companies || '-',
						goal_total_responses: data?.goal_total_responses || '-',
						goal_number_quotes: data?.goal_number_quotes || '-',
						goal_number_sales: data?.goal_number_sales || '-',
						goal_amount: data.goal_amount,
						amount_invested: data.amount_invested,
						start_date: data.start_date,
						end_date: data.end_date,
						total_companies: data.total_companies,
						number_quotes_lead: data.number_quotes_lead,
						number_quotes_client: data.number_quotes_client,
						total_sales: data.total_sales,
						total_amount: data.total_amount,
						average_quote: data.average_quote,
						average_sales: data.average_sales,
						companies: data.companies?.length ? data.companies?.filter(data => data.response) : []
					},
				}
			}),
		}
	}
}
