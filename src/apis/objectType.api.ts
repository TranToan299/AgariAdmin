
import { ObjectParamsType } from '../@types/paramsType';
import { getAsync, postAsync } from './http-client';


const url = `/objecttype`
const objectTypeApi = {
  getList: (params:ObjectParamsType) => {
    return getAsync(`${url}`, params);
  },
};

export default objectTypeApi;
