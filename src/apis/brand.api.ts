import { AxiosResponse } from 'axios';
import { ParamsType } from '../@types/paramsType';

import { deleteAsync, getAsync, postAsync } from './http-client';
import { BrandCreateRequest, BrandModal } from '../@types/brand.model';

const url = '/career/brand';

const brandApi = {
  getList: (request: ParamsType) => {
    return getAsync(`${url}`, request);
  },
  delete: (id: string[]) => {
    return deleteAsync(`${url}`, id);
  },
  post: (data: BrandCreateRequest) => {
    return postAsync(`${url}`, data);
  },
  getDetail: (id: number | string): Promise<AxiosResponse<BrandModal, any>> => {
    return getAsync(`${url}/${id}`);
  },
};

export default brandApi;
