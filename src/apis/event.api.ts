import { IService } from '../@types/service';
import { ParamsType, EventParamsType } from '../@types/paramsType';

import { deleteAsync, getAsync, postAsync } from './http-client';
import { IEventCommon } from '../@types/taxDocument';

const api = '/event';

const eventApi = {
  post: (data: IEventCommon) => {
    return postAsync(`${api}`, data);
  },
  getDetail: (id: number) => {
    return getAsync(`${api}/${id}`);
  },
};

export default eventApi;
