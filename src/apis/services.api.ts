import { IService } from '../@types/service';
import { ParamsType, EventParamsType } from '../@types/paramsType';

import { deleteAsync, getAsync, postAsync } from './http-client';

const api = '/event';

const servicesApi = {
  getList: (params: EventParamsType) => {
    return getAsync(`${api}`, params);
  },
  delete: (id: string[]) => {
    return deleteAsync(`${api}`, id);
  },
  post: (data: IService) => {
    return postAsync(`${api}`, data);
  },
  getDetail: (id: string) => {
    return getAsync(`${api}/${id}`);
  },
};

export default servicesApi;
