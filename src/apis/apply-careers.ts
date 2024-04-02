import { ApplyCareer } from '../@types/applyCareer';
import { ParamsType } from '../@types/paramsType';

import { deleteAsync, getAsync, postAsync } from './http-client';

const api = '/career/apply';

const careersApplyApi = {
  getList: (params: ParamsType) => {
    return getAsync(`${api}`, params);
  },
  post: (data: ApplyCareer) => {
    return postAsync(`${api}`, data);
  },
};

export default careersApplyApi;
