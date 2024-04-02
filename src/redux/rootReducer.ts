import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import careerApplyReducer from './slices/dashboard/apply-careers';
import careerReducer from './slices/dashboard/career';
import contactReducer from './slices/dashboard/contact';
import districtReducer from './slices/dashboard/district';
import newsReducer from './slices/dashboard/news';
import objectTypeReducer from './slices/dashboard/objectType';
import productReducer from './slices/dashboard/product';
import provinceReducer from './slices/dashboard/province';
import serviceReducer from './slices/dashboard/services';
import webcontentReducer from './slices/dashboard/webcontent';
import brandReducer from './slices/dashboard/brand';
import eventReducer from './slices/dashboard/event';

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  product: productReducer,
  contact: contactReducer,
  career: careerReducer,
  careerApply: careerApplyReducer,
  service: serviceReducer,
  news: newsReducer,
  province: provinceReducer,
  district: districtReducer,
  brand: brandReducer,
  event: eventReducer,
  objectType: objectTypeReducer,
  webcontent: webcontentReducer,
});

export default rootReducer;
