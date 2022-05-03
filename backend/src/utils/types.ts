export type QueryParams = {
  sortCriteria?: string;
  sortOrder?: string | number;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
};

export type WishlistParams = {
  sortCriteria?: string;
  sortOrder?: string | number;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  onlyTitles?: boolean;
};

export type ProductParams = {
  wishlistId?: string;
  sortCriteria?: string;
  sortOrder?: string | number;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
};

export type AccountRole = 'user' | 'admin';

export type CreateProductBody = {
  productUrl: string;
  wishlistId: string;
};
