export type IService = {
  id: number | string;
  name?: string;
  thumbnail?: any;
  description?: string;
  content?: string;
  typeName?: string;
  type?: number;
  isPublish?: boolean;
};

export type ServiceState = {
  serviceList: IService[];
  serviceCount: number;
  serviceDetail: IService;
};
