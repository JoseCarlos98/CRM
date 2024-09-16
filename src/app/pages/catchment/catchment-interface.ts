import * as entityGeneral from '../../shared/interfaces/general-interface';


export interface DataTableFilters {
  status: string;
  giro: string;
  campaing: string;
  dateRange: string;
}

export interface TableDataCompantResponse {
  results: TableDataCampaing[],
  count: number,
  page_size: number,
  next: number | 1,
  previous: number | 1
}

export interface TableDataCampaing {
  campaign_code: string;
  campaign_name: string;
  amount_invested: string;
  average_quote: string;
  average_sales: string;
  description: string;
  created_at: string;
  start_date: string;
  end_date: string;
  goal_amount: string;
  total_amount: string;
  update_at: string;
  amout_quotes_client: string;
  amout_quotes_lead: string;
  goal_number_quotes: number;
  goal_number_sales: number;
  goal_total_companies: number;
  goal_total_responses: number;
  number_quotes_client: number;
  number_quotes_lead: number;
  register_date: number;
  total_companies: number;
  total_sales: number;
  status_id: string;
  product_category_id: string;
  owner_user_id: string;
  campaign_id: string;
  campaign_type_id: string;
  users: entityGeneral.User[];
  solutions: any[];
  companies: Company[];
  response: Company[];
  owner_user: entityGeneral.Owner;
  campaign_type: Campaing;
  rol: Rol;
}

export interface TableDataCampaingMapperResponse {
  dataList : TableDataCampaingMapper[],
  pageSize : number,
  pagePrevious: number | null,
  pageNext: number | null,
  count: number | 0
}

export interface TableDataCampaingMapper {
  id?: string;
  campaingData:any
  dateStartEnd: {
    start: string;
    end: string;
  };
  codeAndname: any;
  companyType: string;
  totalCompanies: number;
  totalSalesAmount: object;
  amounInvested: string;
  agents: {
    name: string;
    alls: any[];
    main: entityGeneral.Owner;
  };
  companiesMain: {
    amount: number;
    alls: any[];
  };
  quotesMade: {
    left: {
      amount: number
      totalAmount: string
    }
    right: {
      amount: number
      totalAmount: string
    }
  };
}

export interface GetDataCampainMapper {
  id : string;
  campaign_code : string;
  campaign_name : string;
  amount_invested : string;
  campaign_type : string;
  owner_user : string;
  users : string[];
  start_date : string;
  end_date : string;
  description : string;
  goal_total_companies : number;
  goal_total_responses : number;
  goal_number_quotes : number;
  goal_number_sales : number;
  goal_amount : string;
  companiesSelected : any[];
  solutions : any[];
  formCompanies :  {
    companies : string [];
  }
}

export interface PostDataCampaing {
  campaign_code : string,
  campaign_name : string,
  amount_invested : string,
  campaign_type : string,
  owner_user : string,
  users : string[],
  start_date : string,
  end_date : string,
  product_category : string,
  description : string,
  goal_total_companies : number,
  goal_total_responses : number,
  goal_number_quotes : number,
  goal_number_sales : number,
  goal_amount : string,
}

export interface PatchDataCampaing {
  campaign_code? : string,
  campaign_name? : string,
  amount_invested? : string,
  campaign_type? : string,
  owner_user? : string,
  users? : string[],
  start_date? : string,
  end_date? : string,
  product_category? : string,
  description? : string,
  goal_total_companies? : number,
  goal_total_responses? : number,
  goal_number_quotes? : number,
  goal_number_sales? : number,
  goal_amount? : string,
}

export interface Company {
  campaign: string;
  company: any;
  campaign_company_id: string;
  status: string;
  response:boolean;
  total_quote: string;
  total_sale: string;
}

export interface Product {
  category_name: string;
  description: any;
  product_category_id: string;
}

export interface Campaing {
  campaign_type_name: string;
  campaign_type_id: string;
}

export interface Rol {
  rol_name: string;
  rol_id: string;
  permissions: any;
}

export interface DataAgentsTable {
  data: TableDataAgents[]
}

export interface TableDataAgents {
  agent: string,
  rol: string,
  ip: string,
  extension: string,
}

export interface DataTableCompanies {
  data: TableDataCompanies[]
}

export interface TableDataCompanies {
  company: string,
  contact: string,
  quotes: string,
  status: string,

}
