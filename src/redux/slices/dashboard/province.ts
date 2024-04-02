import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import provinceApi from 'apis/province.api';
import { ParamsType } from '../../../@types/paramsType';
import { ProvinceState, ProvinceType } from '../../../@types/province';

export const getProvinceList = createAsyncThunk(
  'province/getList',
  async (params: ParamsType, { dispatch }) => {
    const { data } = await provinceApi.getList(params);
    return data;
  }
);

const initialState: ProvinceState = {
  provinceList: [],
};

const slice = createSlice({
  name: 'province',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProvinceList.fulfilled, (state, action) => {
      state.provinceList = action.payload.items;
    });
  },
});

// export const {} = slice.actions

export default slice.reducer;
