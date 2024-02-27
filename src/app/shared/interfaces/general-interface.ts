// CATALOGS
export interface DataCatProductCategory {
  category_name : string;
  description : string;
  product_category_id : string;
}

export interface DataCatCountry {
  country_name : string;
  country_id : string;
}

export interface DataCatBusiness {
  business_name: string;
  business_id: string;
}

export interface DataCatCurrency {
  currency_name: string;
  currency_abrev: string;
  currency_id: string;
  symbol: string;
}

export interface DataCatPlatform {
  platform_name: string;
  platform_id: string;
}

export interface DataCatWayToPay {
  payment_method_id: string;
  payment_name: string;
}

export interface DataCatPaymentCondition {
  payment_condition_id: string;
  payment_condition_name: string;
}

export interface DataCatProducts {
  product_id: string;
  price: string | null; 
  discount: string | null;
  code: string;
  name: string;
  list_price: string;
  link: string | null;
}

export interface DataCatContact {
  contact_id: string;
  full_name: string;
  company: string;
}

export interface User {
  campaign: string;
  campaign_user_id: string;
  user: Owner;
  status: string;
}

export interface Company {
  campaign: string;
  company: any;
  campaign_company_id: string;
  status: string;
  total_quote: string;
  total_sale: string;
}
export interface DataCatType {
  campaign_type_id: string;
  campaign_type_name: string;
}

export interface DataCatStatus {
  description: string;
  module: string;
}

export interface DataCatCampaing {
  campaign_code: string;
  campaign_name: string;
  campaign_id: string;
}

export interface DataCatPaymentMethod {
  payment_method_id :string;
  payment_name:string;
}

export interface DataCatInvoiceUse {
  invoice_use_id: string;
  invoice_use_code: string;
  invoice_use_name: string;
}

export interface DataCatPaymentMethod {
  description : string;
  module : number
  status_id: string;
}

export interface DataCatAgents {
  id: string;
  first_name: string;
  last_name: string;
}

export interface DataCatCompanySize {
  size_name : string;
  company_size_id : string;
}

export interface DataCatCompanyType {
  type_name : string;
  company_type_id : string;
}

export interface DataCatState {
  state_name : string;
  state_id : string;
}

export interface DataCatCity {
  city_name : string;
  city_id : string;
}

export interface DataCatCompanyPhase {
  phase_name : string;
  company_phase_id : string;
}
export interface DataCatLastActivity {
  date_contact : string;
  activity_description : string;
}
export interface DataCatCompany {
  checked?: false;
  company_name : string;
  company_id : string;
}

export interface DataCatQuoteContact {
  contact_id: string;
  full_name: string;
  position: string;
  email: string;
  movil_phone: string;
  local_phone: string;
  ext: string;
  company: string;
}

export interface Owner {
  id: string;
  date_joined: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  last_access: string;
  last_login: string;
  phone_number: string;
  profile_picture: string;
  voice_identifier: string;
}

