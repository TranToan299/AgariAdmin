export interface BrandModal {
  id: number;
  objectName: string;
  objectCode: string | number;
}

export interface BrandCreateRequest  {
    id: number | string;
    objectName: string;
    objectCode: string | number;
}


export interface BrandState {
  brandList: BrandModal[] | undefined;
  brandDetail: BrandModal | undefined;
  loading: boolean;
  totalRow: number;
}
