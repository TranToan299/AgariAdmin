import i18next from 'i18next';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import snackbar from 'utils/snackbar';
import contactApi from 'apis/contact.api';
import careersApplyApi from 'apis/apply-careers';
import { ParamsType } from '../../../@types/paramsType';
import { ApplyCareer, ApplyCareerState } from '../../../@types/applyCareer';

export const getListApplyCareer = createAsyncThunk(
  'applyCareer/getListApplyCareer',
  async (params: ParamsType, { dispatch }) => {
    const { data } = await careersApplyApi.getList(params);
    return data;
  }
);

export const postApplyCareer = createAsyncThunk(
  'applyCareer/postApplyCareer',
  async (data: ApplyCareer, { dispatch }) => {
    await careersApplyApi.post(data);
    snackbar.success(i18next.t('createSuccess'));
  }
);

const initialState: ApplyCareerState = {
    listApplyCareer: [],
    countApplyCareer: 0,
};

const slice = createSlice({
  name: 'ApplyCareer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListApplyCareer.fulfilled, (state, action) => {
      state.listApplyCareer = action.payload.items;
      state.countApplyCareer = action.payload.totalRow;
    });
  },
});
export default slice.reducer;
