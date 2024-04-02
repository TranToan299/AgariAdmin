export type IOrder = {
  id: number;
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  productName?: string;
  product_id?: number;
  productId?: string;
  qty?: number;
  note?: string;
  createdAt?: Date;
};

export type IOrderForm = {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  product_id?: number | string;
  qty?: number;
  note?: string;
};

export type IOrderCreated = IOrderForm & {
  id: number;
  status: number;
};

export type IOrderState = {
  orderList: IOrder[];
  orderCount: number;
  orderDetail: IOrder;
};

export type IOrderParams = {
  pageIndex: number;
  pageSize: number;
  keyword?: string;
};
