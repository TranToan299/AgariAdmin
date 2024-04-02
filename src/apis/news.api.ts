import { INewsType } from '../@types/news';
import { ParamsType, EventParamsType } from '../@types/paramsType';

import { deleteAsync, getAsync, postAsync } from './http-client';

const api = '/event';

const newsApi = {
  getList: (params: EventParamsType) => {
    return getAsync(`${api}`, params);
  },
  delete: (id: string[]) => {
    return deleteAsync(`${api}`, id);
  },
  post: (data: INewsType) => {
    return postAsync(`${api}`, data);
  },
  getDetail: (id: string) => {
    return getAsync(`${api}/${id}`);
  },
};

export default newsApi;
