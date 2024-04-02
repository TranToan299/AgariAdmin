import { getAsync, postAsync } from './http-client';

const ProductApi = {
  getList: (data: any) => {
    return getAsync(`/product`, data);
  },
};

export default ProductApi;
