import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ProductState } from '../../../@types/product';
import ProductApi from '../../../apis/product.api';


export const getListProduct = createAsyncThunk(
  'product/getListProduct',
  async (params: any, { dispatch }) => {
    const { data } = await ProductApi.getList(params);
    return data;
  }
);

const initialState: ProductState = {
  listProduct: [],
  productCount: 0,
  productDetail: {},
};

const slice = createSlice({
  name: 'Product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListProduct.fulfilled, (state, action) => {
      state.listProduct = action.payload.items;
      state.productCount = action.payload.totalRow;
    });
  },
});
export default slice.reducer;
