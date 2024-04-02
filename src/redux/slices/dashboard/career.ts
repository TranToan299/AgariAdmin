import i18next from 'i18next';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import snackbar from 'utils/snackbar';
import careersApi from 'apis/careers.api';
import contactApi from 'apis/contact.api';
import { CareerState, ICareer } from '../../../@types/job';
import { ParamsType } from '../../../@types/paramsType';

export const getListCareer = createAsyncThunk(
  'career/getList',
  async (params: ParamsType, { dispatch }) => {
    const { data } = await careersApi.getList(params);
    return data;
  }
);

export const deleteCareer = createAsyncThunk(
  'career/delete',
  async (id: string[], { dispatch }) => {
    await careersApi.delete(id);
    snackbar.success(i18next.t('deleteSuccess'));
  }
);

export const createCareer = createAsyncThunk(
  'career/create',
  async (data: ICareer, { dispatch }) => {
    await careersApi.post(data);
    if (data.id === 0) {
      snackbar.success(i18next.t('createSuccess'));
    } else {
      snackbar.success(i18next.t('updateSuccess'));
    }
  }
);

export const getDetailCareer = createAsyncThunk(
  'career/getDetail',
  async (id: string, { dispatch }) => {
    const { data } = await careersApi.getDetail(id);
    return data;
  }
);

const initialState: CareerState = {
  listCareer: [],
  careerCount: 0,
  careerDetail: {
    id: 10,
    brand_id: 0,
    province_id: 0,
    name: 'string',
    field: 'string',
    jobType: 'string',
    content: 'string',
    description: 'string',
    isPublish: true,
  },
};

const slice = createSlice({
  name: 'career',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListCareer.fulfilled, (state, action) => {
        state.listCareer = action.payload.items;
        state.careerCount = action.payload.totalRow;
      })

      .addCase(getDetailCareer.fulfilled, (state, action) => {
        state.careerDetail = action.payload;
      });
  },
});
export default slice.reducer;
