import { ParamsType } from '../@types/paramsType';
import { getAsync, postAsync } from './http-client';


const url = `/province`
const provinceApi = {
  getList: (params: ParamsType) => {
    return getAsync(`${url}`, params);
  },
};

export default provinceApi;
