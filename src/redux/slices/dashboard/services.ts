import i18next from 'i18next';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import snackbar from 'utils/snackbar';
import servicesApi from 'apis/services.api';
import contactApi from 'apis/contact.api';
import { ServiceState, IService } from '../../../@types/service';
import { ParamsType, EventParamsType } from '../../../@types/paramsType';



export const getListService = createAsyncThunk(
  'service/getList',
  async (params: EventParamsType, { dispatch }) => {
    const { data } = await servicesApi.getList(params);
    return data;
  }
);

export const deleteService = createAsyncThunk(
  'service/delete',
  async (id: string[], { dispatch }) => {
    await servicesApi.delete(id);
    snackbar.success(i18next.t('deleteSuccess'));
  }
);

export const createService = createAsyncThunk(
  'service/create',
  async (data: IService, { dispatch }) => {
    await servicesApi.post(data);
    if (data.id === 0) {
      snackbar.success(i18next.t('createSuccess'));
    } else {
      snackbar.success(i18next.t('updateSuccess'));
    }
  }
);

export const getDetail = createAsyncThunk('service/getDetail', async (id: string, { dispatch }) => {
  const { data } = await servicesApi.getDetail(id);
  return data;
});

const initialState: ServiceState = {
  serviceList: [],
  serviceCount: 0,
  serviceDetail: {
    id: 0,
    name: 'Sự kiện 1',
    thumbnail: 'string',
    description: 'Sự kiện',
    content: 'Sự kiên',
    typeName: 'Sự kiên 1',
    type: 32,
    isPublish: true,
  },
};

const slice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListService.fulfilled, (state, action) => {
        state.serviceList = action.payload.items;
        state.serviceCount = action.payload.totalRow;
      })

      .addCase(getDetail.fulfilled, (state, action) => {
        state.serviceDetail = action.payload;
      });
  },
});
export default slice.reducer;
