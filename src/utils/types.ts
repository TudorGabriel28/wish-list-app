export type QueryParams = {
  sortCriteria?: string;
  sortOrder?: string | number;
  pageNumber?: number;
  pageSize?: number;
  search?: string;
};

export type AccountRole = 'user' | 'admin';

export type CreateProductQuery = {
  wishlistId: string;
};
