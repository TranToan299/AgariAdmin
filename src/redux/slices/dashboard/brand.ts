import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ParamsType } from '../../../@types/paramsType';
import { BrandCreateRequest, BrandState } from '../../../@types/brand.model';
import brandApi from 'apis/brand.api';
import i18next from 'i18next';
import snackbar from 'utils/snackbar';

export const getListBrand = createAsyncThunk('get/brandList', async (request: ParamsType) => {
  const { data } = await brandApi.getList(request);
  return data;
});

export const createBrand = createAsyncThunk(
  'create/brandList',
  async (data: BrandCreateRequest) => {
    await brandApi.post(data);
    if (data.id !== 0) {
      snackbar.success(i18next.t('updateSuccess'));
    } else {
      snackbar.success(i18next.t('createSuccess'));
    }
  }
);

export const deleteBrand = createAsyncThunk('delete/brand', async (request: string[]) => {
  await brandApi.delete(request);
  snackbar.success(i18next.t('deleteSuccess'));
});

export const getBrandDetail = createAsyncThunk('get/brandDetail', async (id: string | number) => {
  const { data } = await brandApi.getDetail(id);
  return data;
});

const initialState: BrandState = {
  brandList: [],
  brandDetail: {
    id: 0,
    objectName: 'Init',
    objectCode: 0,
  },
  loading: false,
  totalRow: 0,
};

const slice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListBrand.fulfilled, (state, action) => {
        state.brandList = action.payload.items;
        state.totalRow = action.payload.totalRow;
        state.loading = false;
      })
      .addCase(getBrandDetail.fulfilled, (state, action) => {
        state.brandDetail = action.payload;
      })
      .addCase(getListBrand.pending, (state, action) => {
        state.loading = true;
      });
  },
});

export const { setLoading } = slice.actions;

export default slice.reducer;
