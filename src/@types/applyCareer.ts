export type ApplyCareer = {
  id?: number | string;
  fullName?: string;
  dateOfBirth?: any;
  phoneNumber?: string;
  experience?: number | string;
  url?: any;
  career_id?: any;
  province_id?: any;
  district_id?: any;
  provinceName?:string;
  careerName?:string;
  districtName?:string;
};

export type ApplyCareerState = {
  listApplyCareer: ApplyCareer[];
  countApplyCareer: number;
};
