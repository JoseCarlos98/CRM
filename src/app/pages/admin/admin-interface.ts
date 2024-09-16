
// END CATALOGS

import * as entityGeneral from '../../shared/interfaces/general-interface';

// PRODUCTS
export interface TableDataProductResponse {
  results:DataProductTable[],
  count: number,
  page_size: number,
  next: number | 1,
  previous: number | 1
}

export interface DataProductTable {
   code: string;
   name: string;
   price: DataPriceTable;
   link: string;
   product_category_id: string;
   country: entityGeneral.DataCatCountry;
   price_id: string;
   discount_id: string;
   status_id: string;
   image: string;
}

export interface GetDataProduct {
  code: string;
  name: string;
  price: string;
  link: string;
  product_category_id: string;
  country_id: string;
  status_id: string;
  image: string;
  price_id: string;
  discount_id: string;
}

export interface PostDataProduct {
  code: string;
  name: string;
  price: string;
  link: string;
  product_category_id: string;
  country_id: string;
  status_id: string;
}

// END PRODUCTS 

// PRICE
export interface DataPriceTable {
   code: string;
   price: string;
   tax_percentage: string;
   currency: string;
   price_id: string;
   status_id: string;
}

export interface GetDataPrice {
  code: string;
  price: string;
  tax_percentage: string;
  currency: string;
  price_id: string;
  status_id: string;
}

export interface PostDataPrice {
  code: string;
  price: string;
  tax_percentage: string;
  currency: string;
  price_id: string;
  status_id: string;
}

// END PRICE 

// DISCOUNTS
export interface DataDiscountTable {
  data : TableDataDiscountList[]
}

export interface TableDataDiscountList {
   code: string;
   name: string;
   discount_id: string;
   status_id: string;
}

export interface GetDataDiscount {
  code: string;
  name: string;
  discount_id: string;
  status_id: string;
}

export interface PostDataDiscount {
  code: string;
  name: string;
  status_id: string;
}

// END DISCOUNTS 

// USERS

export interface TableDataUsers {
  id: string,
  email: string,
  username: string,
  last_login: string,
  first_name: string
  last_name: string,
  date_joined: string
  phone_number: string,
  voice_identifier: string,
  profile_picture: string,
  last_access: string
}

export interface TableDataUsersResponse {
  results:TableDataUsersMapper[],
  count: number,
  page_size: number,
  next: number | 1,
  previous: number | 1
}

export interface TableDataUsersMapper {
  dataList : TableDataUsersMapperData[],
  pageSize : number,
  pagePrevious: number | null,
  pageNext: number | null,
  count: number | 0
}
export interface TableDataUsersMapperData {
  id : string;
  userName : string;
  logo : string;
  role : string;
  email : string;
  ip : string;
  ext : string;
  idSlack : string;
}


// END USERS 

// ROLES

export interface TableDataRoles {
  rol_id: string,
  rol_name: string,
  permissions: any
}

export interface PostDataUser {
  first_name : string
  user_id_slack : string
  username : string
  last_name : string
  email : string
  phone_number : string
  voice_identifier : string
  profile_picture : string
  document?: File;
}

export interface PatchDataUser {
  id? : string
  first_name? : string
  user_id_slack? : string
  username? : string
  last_name? : string
  email? : string
  phone_number? : string
  voice_identifier? : string
  profile_picture? : File
}

// END ROLES 

// BONUS

export interface TableDataBonus {
  bonus_id: string,
  bonus_percentage: any,
  bonus_meta: any
  bonus_name: any
  assigned_activity: any
  deadline: any
  bonus_solution: any
  bonus_user: any
  type_bonus_percentage: any
  type_bonus_meta: any
  init_date: any
  base_percentage_bonus: any
  fixed_base_income: any
  result_scale_meta: any
  result_total: any
  campaign: any
  status: any
}

export interface TableDataBonusMapper {
  
}

export interface PostDataBonus {
  bonus_name : string
  assigned_activity : string
  deadline : string
  type_bonus_percentage : string
  type_bonus_meta : string
  base_percentage_bonus : string
  fixed_base_income : string
  result_scale_meta : string
  result_total: File;
  campaign: File;
  status: File;
}

export interface PatchDataBonus {
  bonus_name : string
  assigned_activity : string
  deadline : string
  type_bonus_percentage : string
  type_bonus_meta : string
  base_percentage_bonus : string
  fixed_base_income : string
  result_scale_meta : string
  result_total: File;
  campaign: File;
  status: File;
}

// END BONUS 