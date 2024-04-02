import { ICareer } from '../@types/job';
import { ParamsType } from '../@types/paramsType';

import { deleteAsync, getAsync, postAsync } from './http-client';

const api = '/career';

const careersApi = {
  getList: (params: ParamsType) => {
    return getAsync(`${api}`, params);
  },
  delete: (id: string[]) => {
    return deleteAsync(`${api}`, id);
  },
  post:(data:ICareer) => {
    return postAsync(`${api}`, data);
  },
  getDetail: (id:string) => {
    return getAsync(`${api}/${id}` );
  }
};

export default careersApi;
