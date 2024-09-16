import * as entityGeneral from '../../shared/interfaces/general-interface';
import { TableDataCampaing } from '../catchment/catchment-interface';

export interface TableDataCompantResponse {
  results: TableDataCompany[],
  count: number,
  page_size: number,
  next: number | 1,
  previous: number | 1
}

export interface TableDataCompany {
  company_id: string;
  company_type: entityGeneral.DataCatCompanyType;
  business: entityGeneral.DataCatBusiness;
  owner_user: entityGeneral.Owner;
  country:entityGeneral.DataCatCountry;
  state: entityGeneral.DataCatState;
  city: entityGeneral.DataCatCity;
  platform: entityGeneral.DataCatPlatform;
  company_size: entityGeneral.DataCatCompanySize;
  company_phase: entityGeneral.DataCatCompanyPhase
  campaing?: TableDataCampaing
  last_activity: entityGeneral.DataCatLastActivity
  invoice_use?: entityGeneral.DataCatInvoiceUse
  payment_condition?: entityGeneral.DataCatPaymentCondition
  payment_method?: entityGeneral.DataCatPaymentMethod
  way_to_pay?: entityGeneral.DataCatWayToPay
  company_name: string;
  campaign: any;
  slug: string;
  tax_id_number: string;
  email: string;
  phone_number: string;
  web_page: string;
  address: string;
  logo: string;
  amout_quotes: string;
  amout_sales: string;
  total_quotes: string;
  total_sales: string,
  comments: string;
  register_date: string;
  register_user: string;
  status: Status;
  company_contacts: Contacts[]
  camaping: {
    campaing_name: string
  };
}

export interface Status {
  description : string;
  module: number;
  status_id: string;
}

export interface TableDataCompaniesMapperResponse {
  dataList : TableDataCompanyMapper[],
  pageSize : number,
  pagePrevious: number | null,
  pageNext: number | null,
  count: number | 0
}

export interface TableDataCompanyMapper {
  id:string
  companyName : string;
  logo : string;
  status : string;
  registrationDate : string;
  amount : string;
  country : string;
  origin : string;
  category : string;
  business : string;
  lastContactDate : string;
  history : string;
  campaign : string;
  quotes : {
    amount : string;
    totalAmount : string;
  }
  sales : {
    amount : string;
    totalAmount : string;
  },
}

export interface Contacts {
  contact_id: string;
  full_name: string;
  position: string;
  email: string;
  movil_phone: string;
  local_phone: string;
  ext: string;
  company: string;
}

export interface PostDataCompany {
  company_type: string;
  business: string;
  owner_user: string;
  country: string;
  state: string;
  city: string;
  platform: string;
  company_size: string;
  company_phase: string;
  company_name: string;
  slug: string;
  tax_id_number: string;
  email: string;
  phone_number: string;
  web_page: string;
  address: string;
  amout_quotes: string;
  amout_sales: string;
  total_quotes: string;
  total_sales: string;
  comments: string;
  register_date: string;
  register_user: string;
  logo?: File;
}

export interface GetDataCompanyMapper {
  id: string
  company_name: string
  platform: string
  phone_number: string
  email: string
  tax_id_number: string
  state: string
  owner_user: string
  country: string
  campaign: string
  business: string
  city: string
  address: string
  company_type: string
  company_size: string
  web_page: string
  comments: string
  logo?: File
}

export interface GetDataDetailsCompanyMapper {
  id : string;
  companyName : string;
  logo : string;
  statusCompany : string;
  city : string;
  country : string;
  web : string;
  business : string;
  category : string;
  campaign : string;
  owner : string;
  email : string;
  phone : string;
  companyContacts:any[] 
}

export interface GetDataDetailsHistoryMapper {
  id : string;
  activity : string;
  agent : string;
  description : string;
  dateNames : string;
  date : string;
  dateName : string;
  activityName : string;
  color : string;
  icon : string;
}

export interface CompanyContacts {
  full_name : string;
  position? : string;
  email? : string;
  movil_phone : string;
  local_phone? : string;
  ext? : string;
}

