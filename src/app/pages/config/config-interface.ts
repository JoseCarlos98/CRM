// PRODUCT CATEGORIES
export interface TableDataProductCategory {
  product_category_id: string;
  category_name: string;
  description: string;
}

export interface PostDataProductCategory {
  category_name:string;
  description:string;
}

export interface PatchDataProductCategory {
  category_name?:string;
  description?:string;
}

export interface GetDataProductCategory {
  product_category_id:string;
  category_name:string;
  description:string;
}

// END PRODUCT CATEGORIES 

// WAY TO PAY
export interface TableDataWayToPay {
  payment_method_id: string;
  payment_name: string;
}

export interface PostDataWayToPay {
  payment_name:string;
}

export interface GetDataWayToPay {
  payment_method_id?:string;
  payment_name:string;
}

export interface PatchDataWayToPay {
  payment_name:string;
}

// END WAY TO PAY 

// CAMPAING TYPE
export interface TableDataCampaingType {
  campaign_type_id: string;
  campaign_type_name: string;
}

export interface PostDataCampaingType {
  campaign_type_name:string;
}

export interface GetDataCampaingType {
  campaign_type_id?:string;
  campaign_type_name:string;
}

export interface PatchDataCampaingType {
  campaign_type_id:string;
  campaign_type_name:string;
}

// END CAMPAING TYPE 

// SOLUTIONS
export interface TableDataSolution {
  solution_id: string;
  solution_name: string;
  description: string;
}

export interface PostDataSolution {
  solution_name:string;
  description:string;
}

export interface GetDataSolution {
  solution_id?:string;
  solution_name:string;
  description:string;
}

export interface PatchDataSolution {
  solution_id:string;
  solution_name:string;
  description:string;
}

// END SOLUTIONS 


// COMPANY TYPE
export interface TableDataCompanyType {
  company_type_id: string;
  type_name: string;
}

export interface PostDataCompanyType {
  type_name:string;
}

export interface GetDataCompanyType {
  company_type_id?:string;
  type_name:string;
}

export interface PatchDataCompanyType {
  company_type_id:string;
  type_name:string;
}

// END COMPANY TYPE 

// ORIGIN
export interface TableDataOrigin {
  platform_id: string;
  platform_name: string;
}

export interface PostDataOrigin {
  platform_name:string;
}

export interface GetDataOrigin {
  platform_id:string;
  platform_name:string;
}

export interface PatchDataOrigin {
  platform_id:string;
  platform_name:string;
}

// END ORIGIN 

// BUSINESS
export interface TableDataBusiness {
  business_id: string;
  business_name: string;
}

export interface PostDataBusiness {
  business_name:string;
}

export interface GetDataBusiness {
  business_id:string;
  business_name:string;
}

export interface PatchDataBusiness {
  business_id:string;
  business_name:string;
}

// END BUSINESS 

// SIZE
export interface TableDataSize {
  company_size_id: string;
  size_name: string;
}

export interface PostDataSize {
  size_name:string;
}

export interface GetDataSize {
  company_size_id:string;
  size_name:string;
}

export interface PatchDataSize {
  company_size_id:string;
  size_name:string;
}

// END SIZE 


// ACTIVITY TYPE
export interface TableDataActivityType {
  type_activity_id: string;
  activity: string;
  icon: string;
  color: string;
}

export interface PostDataActivityType {
  activity:string;
  icon: string;
  color: string;
}

export interface GetDataActivityType {
  type_activity_id:string;
  activity:string;
  icon: string;
  color: string;
}

export interface PatchDataActivityType {
  type_activity_id:string;
  activity:string;
  icon: string;
  color: string;
}

// END ACTIVITY TYPE

// SUBACTIVITY TYPE
export interface TableDataSubactivityType {
  sub_type_activity_id: string;
  sub_activity: string;
  color: string;
  type_activity: string;
}

export interface PostDataSubactivityType {
  sub_activity:string;
  icon: string;
  type_activity: string;
}

export interface GetDataSubactivityType {
  sub_type_activity_id:string;
  sub_activity:string;
  color: string;
  type_activity: string;
}

export interface PatchDataSubactivityType {
  type_activity_id:string;
  sub_activity:string;
  type_activity: string;
  color: string;
}

// END SUBACTIVITY TYPE
