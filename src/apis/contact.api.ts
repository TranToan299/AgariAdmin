import { ParamsType } from '../@types/paramsType';
import { IContact } from '../@types/contact';

import { getAsync, postAsync } from './http-client';

const api = '/contact';
const contactApi = {
  getList: (params: ParamsType) => {
    return getAsync(`${api}`, params);
  },
  post: (data: IContact) => {
    return postAsync(`${api}`, data);
  },
};

export default contactApi;
