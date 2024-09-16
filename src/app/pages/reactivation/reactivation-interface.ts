import * as entityGeneral from '../../shared/interfaces/general-interface';
import { TableDataCampaing } from '../catchment/catchment-interface';
import { TableDataCompany } from '../companies/companies-interface';
import { TableDataActivityType } from '../config/config-interface';


export interface TableDataCAllsResponse {
  results: TableDataCalls[],
  count: number,
  page_size: number,
  next: number | 1,
  previous: number | 1
}


export interface TableDataCalls {
  activity_id: string;
  description: string;
  activity_date: string;
  activity_hour: string;
  end_date: string;
  finish: boolean;
  process: string;
  document: string;
  company: TableDataCompany;
  user: entityGeneral.Owner;
  type_activity: TableDataActivityType;
  campaign: TableDataCampaing;
  status: string;
}

export interface TableDataCallsMapperResponse {
  dataList : TableDataCallsMapper[],
  pageSize : number,
  pagePrevious: number | null,
  pageNext: number | null,
  count: number | 0
}

export interface TableDataCallsMapper {
  id : string
  companyName : string;
  campaingName : string;
  logo : string;
  camping : {
    campaingData : object,
  }
  dueDate : string
  expirationTime : string
  user : string
  comments : string
}

export interface GetDataCallsMapper {
  id : string;
  activity_date : string;
  activity_hour : string;
  company : string;
  companyName : string;
  user : string;
  type_activity : string;
  campaign : string;
  description : string;
}


export interface PostDataCalls {
  description: string;
  activity_date: string;
  activity_hour: string;
  process: string;
  company: string;
  user: string;
  type_activity: string;
  campaign: string;
  status: string;
}

export interface PatchDataCalls {
  id?: string;
  description: string;
  activity_date: string;
  activity_hour: string;
  process: string;
  company: string;
  user: string;
  type_activity: string;
  campaign: string;
  status: string;
}

