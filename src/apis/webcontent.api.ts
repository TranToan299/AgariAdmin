import { IService } from '../@types/service';
import { ParamsType, EventParamsType } from '../@types/paramsType';

import { deleteAsync, getAsync, postAsync } from './http-client';
import { IWebcontent } from '../@types/webcontent';

const api = '/webcontent';

const webcontentApi = {
  get: (params: string) => {
    return getAsync(`${api}`, { type: params });
  },
  post: (data: IWebcontent) => {
    return postAsync(`${api}`, [data]);
  },
};
export default webcontentApi;
