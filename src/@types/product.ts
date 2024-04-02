export type ProductType = {
  id?: number | string;
  name?: string;
  images?: any;
  thumbnail?: string;
  description?: string;
  price?: number | string;
  content?: any;
  type?: number | string;
  isActive?: boolean;
  tags?: any;
  categories?: any;
  material?: string;
  salePrice?: number | string;
  createdAt?: Date;
  updatedAt?: Date;
};




export type ProductState = {
  listProduct: ProductType[];
  productCount: number;
  productDetail: ProductType;
};
