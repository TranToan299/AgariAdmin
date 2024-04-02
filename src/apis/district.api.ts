import { ParamsTypeDistrict } from '../@types/paramsType';
import { getAsync, postAsync } from './http-client';


const url = `/district`
const districtApi = {
  getList: (params: ParamsTypeDistrict) => {
    return getAsync(`${url}`, params);
  },
};

export default districtApi;
