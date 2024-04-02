import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import objectTypeApi from 'apis/objectType.api';
import { ObjectTypeState } from '../../../@types/objectType';
import { ObjectParamsType } from '../../../@types/paramsType';

export const getBrandList = createAsyncThunk(
  'brand/getList',
  async (params: ObjectParamsType, { dispatch }) => {
    const { data } = await objectTypeApi.getList(params);
    return data;
  }
);

const initialState: ObjectTypeState = {
  brandList: [],
};

const slice = createSlice({
  name: 'objectType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBrandList.fulfilled, (state, action) => {
      state.brandList = action.payload;
    });
  },
});

// export const {} = slice.actions

export default slice.reducer;
