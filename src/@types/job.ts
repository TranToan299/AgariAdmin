export type ICareer = {
  id:          number | string;
  brand_id?:    number | string;
  province_id?: any;
  name?:        string;
  field?:       string;
  jobType?:     string;
  content?:     string;
  description?: string;
  isPublish?:   boolean;
  jobsOutstanding?: boolean;
  brandName?:string;
  provinceName?:string;
  isHighlight?: boolean;
};
 export type CareerState = {
  listCareer: ICareer[],
  careerCount: number,
  careerDetail: ICareer
 }


