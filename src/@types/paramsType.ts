export type ParamsType = {
  keyword?: string;
  pageIndex?: number | string;
  pageSize?: number | string;
};

export type ParamsTypeDistrict = ParamsType & {
  provinceId: string | number;
}

export type EventParamsType = ParamsType & {
    eventType?:string | number
}


export type ObjectParamsType = {
  objectType: string,
  parentId?: string | number
}
