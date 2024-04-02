import i18next from 'i18next';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import snackbar from 'utils/snackbar';
import servicesApi from 'apis/services.api';
import contactApi from 'apis/contact.api';
import { ServiceState, IService } from '../../../@types/service';
import { ParamsType, EventParamsType } from '../../../@types/paramsType';
import webcontentApi from '../../../apis/webcontent.api';
import { IWebcontent, WebcontentType } from '../../../@types/webcontent';

export const getWebcontentPage = createAsyncThunk(
  'webcontent/getList',
  async (type: string, { dispatch }) => {
    const { data } = await webcontentApi.get(type);
    return data;
  }
);
export const updateWebcontent = createAsyncThunk(
  'service/create',
  async (data: IWebcontent, { dispatch }) => {
    await webcontentApi.post(data);
    snackbar.success(i18next.t('updateSuccess'));
    dispatch(getWebcontentPage(data.type));
  }
);

type IListPage = {
  home?: IWebcontent[];
  about?: IWebcontent[];
  service?: IWebcontent[];
  carrer?: IWebcontent[];
  contact?: IWebcontent[];
  footer?: IWebcontent[];
  logo?: IWebcontent[];
};

const initialState: IListPage = {
  home: undefined,
  about: undefined,
  service: undefined,
  carrer: undefined,
  contact: undefined,
  footer: undefined,
  logo: undefined,
};

const slice = createSlice({
  name: 'webcontent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWebcontentPage.fulfilled, (state, action) => {
      const { type } = action.payload[0];
      switch (type) {
        case WebcontentType.Home:
          state.home = action.payload;
          break;
        case WebcontentType.About:
          state.about = action.payload;
          break;
        case WebcontentType.Carrers:
          state.carrer = action.payload;
          break;
        case WebcontentType.Contact:
          state.contact = action.payload;
          break;
        case WebcontentType.Footer:
          state.footer = action.payload;
          break;
        case WebcontentType.Logo:
          state.logo = action.payload;
          break;
        case WebcontentType.Service:
          state.service = action.payload;
          break;
        default:
          break;
      }
    });
  },
});
export default slice.reducer;
