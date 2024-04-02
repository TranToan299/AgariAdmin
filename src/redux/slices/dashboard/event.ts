import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import i18next from 'i18next';
import snackbar from 'utils/snackbar';
import eventApi from '../../../apis/event.api';
import { IEventCommon, IEventStore } from '../../../@types/taxDocument';

export const getEvent = createAsyncThunk(
  'event/CommonEvent',
  async (params: number, { dispatch }) => {
    const { data } = await eventApi.getDetail(params);
    return data;
  }
);

export const updateEvent = createAsyncThunk(
  'event/update',
  async (data: IEventCommon, { dispatch }) => {
    await eventApi.post(data);
    snackbar.success(i18next.t('updateSuccess'));
  }
);

const initialState: IEventStore = {
  event: {
    id: 0,
    content: '',
    type: 100,
  },
};

const slice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEvent.fulfilled, (state, action) => {
      state.event = action.payload;
    });
  },
});
export default slice.reducer;
