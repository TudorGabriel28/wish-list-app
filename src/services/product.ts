import { FilterQuery, UpdateQuery } from 'mongoose';
import ProductModel, { ProductDocument } from '../models/product';
import { CreateProductQuery } from '../utils/types';

export async function getAllProducts(
  sortCriteria: string = 'createdAt',
  sortOrder: string | number = 0,
  currentPage: number = 1,
  pageSize: number = 20,
  search?: string
) {
  try {
    const searchCriteria = {};
    let limit;
    const maxPageSize = 50;

    if (pageSize > maxPageSize) {
      limit = maxPageSize;
    } else {
      limit = pageSize;
    }

    const skip = (currentPage - 1) * pageSize;

    if (search) {
      // @ts-ignore
      searchCriteria.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await ProductModel.find(searchCriteria)
      .sort({ [sortCriteria]: sortOrder })
      .limit(limit)
      .skip(skip)
      .populate({ path: 'wishlist', select: 'title' })
      .lean()
      .exec();

    const totalCount = await ProductModel.count();
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage !== 1;

    const metadata = {
      pageSize,
      currentPage,
      totalPages,
      hasNext,
      hasPrevious
    };

    return { products, metadata };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getProduct(
  query: FilterQuery<ProductDocument>,
  projection: Object = {},
  options: Object = {}
) {
  const product = await ProductModel.findOne(query, projection, options).lean();
  return product;
}

export async function createProduct(
  input: ProductDocument,
  createProductQuery: CreateProductQuery
) {
  try {
    return await ProductModel.create({
      ...input,
      wishlist: createProductQuery.wishlistId
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function editProduct(
  query: FilterQuery<ProductDocument>,
  updates: UpdateQuery<ProductDocument>
) {
  try {
    return await ProductModel.findOneAndUpdate(query, updates, {
      new: true
    }).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  try {
    await ProductModel.deleteOne({ query });
  } catch (error: any) {
    throw new Error(error);
  }
}
