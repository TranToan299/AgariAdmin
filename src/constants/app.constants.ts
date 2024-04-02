export const LOCAL_STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  LOCALE: 'i18nextLng',
  ADMIN_TOKEN: 'admin-token',
};

export const JOB_TYPE = [
  {
    label: 'Fulltime',
    value: 'Fulltime',
  },
  {
    label: 'Part time',
    value: 'Part time',
  },
  {
    label: 'Freelancer',
    value: 'Freelancer',
  },
];

export const DEFAULT_PAGINATION = {
  PAGE_INDEX: 1,
  PAGE_SIZE: 10,

  PAGE_ONE: 1,
  GET_ALL: 10000,
};
// API Constant
export const EVENT_TYPE = {
  NEWS: 31,
  SERVICE: 32,
};
export const OBJECT_TYPE = {
  // Career Page
  brand: 'brand',
};

// dirName s3
export const dirNameS3 = {
  service: 'service',
  news: 'news',
  career: 'career',
  applyCareer: 'apply-career',
};

// background color
export const backgroundColor = {
  main: '#D8F3DC',
  white: '#fff',
};
// color
export const textColor = {
  white: '#fff',
  black: '#000',
};

export enum TYPE_EVENT {
  TaxDocument = 100,
  Invoice = 101,
}

export enum ID_EVENT {
  TaxDocument = 192,
  Invoice = 194,
}

export const S3_PROJECT = 'agari';
