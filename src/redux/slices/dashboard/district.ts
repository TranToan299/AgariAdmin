import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import provinceApi from 'apis/province.api';
import districtApi from 'apis/district.api';
import { ParamsTypeDistrict } from '../../../@types/paramsType';
import { DistrictState } from '../../../@types/district';

export const getDistrictList = createAsyncThunk(
  'district/getList',
  async (params: ParamsTypeDistrict, { dispatch }) => {
    const { data } = await districtApi.getList(params);
    return data;
  }
);

const initialState: DistrictState = {
  districtList: [],
};

const slice = createSlice({
  name: 'district',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDistrictList.fulfilled, (state, action) => {
      state.districtList = action.payload.items;
    });
  },
});

// export const {} = slice.actions

export default slice.reducer;
