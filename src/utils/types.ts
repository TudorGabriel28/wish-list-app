export type AccountParams = {
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
};

export type ReqQuery = {
  filters: string;
  sort: string;
  sortOrder: string | number;
  limit: number;
  skip: number;
  search?: string;
};

export type AccountRole = 'user' | 'admin';
