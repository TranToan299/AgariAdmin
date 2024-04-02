import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import i18next from 'i18next';
import newsApi from 'apis/news.api';
import snackbar from 'utils/snackbar';
import { INewsType, NewsState } from '../../../@types/news';
import { EventParamsType } from '../../../@types/paramsType';

export const getNewsList = createAsyncThunk(
  'news/getList',
  async (params: EventParamsType, { dispatch }) => {
    const { data } = await newsApi.getList(params);
    return data;
  }
);

export const deleteNews = createAsyncThunk('news/delete', async (id: string[], { dispatch }) => {
  await newsApi.delete(id);
  snackbar.success(i18next.t('deleteSuccess'));
});

export const createNews = createAsyncThunk('news/create', async (data: INewsType, { dispatch }) => {
  await newsApi.post(data);
  if (data.id === 0) {
    snackbar.success(i18next.t('createSuccess'));
  } else {
    snackbar.success(i18next.t('updateSuccess'));
  }
});

export const getDetail = createAsyncThunk('news/getDetail', async (id: string, { dispatch }) => {
  const { data } = await newsApi.getDetail(id);
  return data;
});

const initialState: NewsState = {
  newsList: [],
  newsCount: 0,
  newsDetail: {
    id: 0,
    name: 'Tin tức 1',
    thumbnail: 'string',
    description: 'Tin tức',
    content: 'Tin tức',
    typeName: 'Tin tức 1',
    type: 31,
    isPublish: true,
  },
};

const slice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNewsList.fulfilled, (state, action) => {
        state.newsList = action.payload.items;
        state.newsCount = action.payload.totalRow;
      })

      .addCase(getDetail.fulfilled, (state, action) => {
        state.newsDetail = action.payload;
      });
  },
});
export default slice.reducer;
