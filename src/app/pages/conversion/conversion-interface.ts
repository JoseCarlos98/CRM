import * as entityGeneral from '../../shared/interfaces/general-interface';
import { TableDataCompany } from '../companies/companies-interface';

export interface TableDataQuoteResponse {
  results: {
    total_quotes: number,
    quotes_data : TableDataQuote[]
  },
  count: number,
  page_size: number,
  next: number | 1,
  previous: number | 1
}

export interface TableDataQuote {
  quote_id: string;
  quote_options: QuoteOption[];
  company: TableDataCompany;
  contact: entityGeneral.DataCatQuoteContact;
  user: entityGeneral.Owner;
  campaign: entityGeneral.DataCatCampaing | null;
  payment_method: entityGeneral.DataCatPaymentMethod;
  status: {
    description: string;
    module: boolean
    status_id: string;
  };
  invoice_status: entityGeneral.DataCatInvoiceStatus;
  quote_number: number;
  tax_include: number;
  register_date: string;
  payment_date: string | null;
  invoice_date: string | null;
  money_in_account: boolean;
  quote_total: string;
}

export interface TableDataQuoteMapperResponse {
  totalQuotes:number,
  dataList : TableDataQuoteMapper[],
  pageSize : number,
  pagePrevious: number | null,
  pageNext: number | null,
  count: number | 0
}

export interface TableDataQuoteMapper {
  id: string;
  dateAndHour: string;
  actionName: string;
  actionStatusId: string;
  status_id: string;
  moneyInAccount: boolean;
  quoteNumber: number;
  isBilled: any;
  closeSale: object;
  companyInfo: {
    cfdi: string;
    company_name: string;
    tax_id_number: string;
    payment_method_id: string;
    way_to_pay_id: string;
    waytoPay: string;
    paymentMethod: string;
    payment_condition_id: string;
    invoice_use_id: string;
    invoice_status: string;
  }
  companyName: {
    id: string;
    name: string;
    logo: string;
  };
  companyNameMain: string;
  status: string;
  
  stateCountry: string;
  information: {
    name: string;
    quoteNumber: number;
  };
  actionurl: boolean;
  actionDelete: boolean;
  actionEdit: boolean;
  showSelect: boolean;
  showMoney: boolean;
  showBilling: boolean;
  totalPrice: {
    name: string;
    expire: string;
    total: string;
  }[];
  products: {
    type: string;
    places: number;
    product: string[];
    total: string;
  }[];
  actions: string[]
}

export interface GetDataQuoteMapper {
  id: string;
  contact: string;
  user: string;
  campaign: string;
  payment_method: string;
  tax_include: number;
  company: {
    id: string
    name: string
  }
  quoteOptions: 
    {
      id: string;
      subtotal: number;
      discount: number;
      total: number;
      typePrice: number,
      date: string,
      time: string,
      optionProducts: [
        {
          id: string;
          places: string;
          product: string;
          unitPri: string;
          total: string;
        },
      ]
    } [] | any

}


export interface PostDataCompany {
  company_type: string;
  business: string;
  owner_user: string;
  country: string;
}
export interface GetDataCompanyMapper {
  id: string
  company_name: string
  platform: string
}

export interface CompanyContacts {
  full_name: string;
  position?: string;
  email?: string;
  movil_phone: string;
  local_phone?: string;
  ext?: string;
}

export interface QuoteOption {
  quote_option_id: string;
  type_price: number,
  subtotal: string;
  discount: string;
  tax: string;
  total: string;
  deadline: string;
  selected: boolean;
  quote: string;
  status: string;
  option_products: OptionProduct[]
}

export interface OptionProduct {
  option_product_id: string,
  product: {
    product_id: string,
    price: any,
    discount: any,
    product_category: entityGeneral.DataCatProductCategory;
    country: entityGeneral.DataCatCountry;
    code: string;
    name: string;
    list_price: string;
    link: any;
    image: string;
  },
  quantity: 1,
  price: string,
  total: string,
  quote_option: string;
  status: string;
}

export interface QuoteProducts {
  full_name: string;
  position?: string;
  email?: string;
  movil_phone: string;
  local_phone?: string;
  ext?: string;
}
