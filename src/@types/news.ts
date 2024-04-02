export type INewsType = {
  id: number | string;
  name?: string;
  thumbnail?: any;
  description?: string;
  content?: string;
  typeName?: string;
  type?: number;
  isPublish?: boolean;
};

export type NewsState = {
  newsList: INewsType[];
  newsCount: number;
  newsDetail: INewsType;
};
