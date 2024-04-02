import i18next from 'i18next';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import snackbar from 'utils/snackbar';
import contactApi from 'apis/contact.api';
import { ContactState, IContact } from '../../../@types/contact';
import { ParamsType } from '../../../@types/paramsType';

export const getListContact = createAsyncThunk(
  'contact/getListContact',
  async (params: ParamsType, { dispatch }) => {
    const { data } = await contactApi.getList(params);
    return data;
  }
);

export const postContact = createAsyncThunk(
  'contact/postContact',
  async (data: IContact, { dispatch }) => {
    await contactApi.post(data);
    snackbar.success(i18next.t('createSuccess'));
  }
);

const initialState: ContactState = {
  contactList: [],
  countContact: 0,
};

const slice = createSlice({
  name: 'Contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListContact.fulfilled, (state, action) => {
      state.contactList = action.payload.items;
      state.countContact = action.payload.totalRow;
    });
  },
});
export default slice.reducer;
