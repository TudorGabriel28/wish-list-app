import { FilterQuery, UpdateQuery } from 'mongoose';
import ProductModel, { ProductDocument } from '../models/product';
import ogScraper from '../utils/scraper';

export async function getAllProducts(
  wishlistId?: string,
  sortCriteria: string = 'createdAt',
  sortOrder: string | number = 0,
  pageNumber: number = 1,
  pageSize: number = 20,
  search?: string
) {
  try {
    let limit;
    const maxPageSize = 30;
    pageSize *= 1;
    pageNumber *= 1;
    if (pageSize > maxPageSize) {
      limit = maxPageSize;
    } else {
      limit = pageSize;
    }

    const skip = (pageNumber - 1) * pageSize;

    const searchCriteria = {};
    if (search) {
      // @ts-ignore
      searchCriteria.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let filterCriteria = {};
    if (wishlistId) {
      filterCriteria = { wishlist: wishlistId };
    }

    const products = await ProductModel.find({
      ...searchCriteria,
      ...filterCriteria
    })
      .sort({ [sortCriteria]: sortOrder })
      .limit(limit)
      .skip(skip)
      .populate({
        path: 'wishlist',
        select: 'title'
      })
      .lean()
      .exec();

    const totalCount = await ProductModel.find({
      ...searchCriteria,
      ...filterCriteria
    })
      .lean()
      .count();
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNext = pageNumber < totalPages;
    const hasPrevious = pageNumber > 1;

    const metadata = {
      pageSize,
      pageNumber,
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
  productUrl: string,
  wishlistId: string,
  userAgent: string
) {
  try {
    // Get og metadata from product url
    const ogData = await ogScraper(productUrl, userAgent);
    return await ProductModel.create({
      ...ogData,
      wishlist: wishlistId
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

export async function deleteProduct(productId: string) {
  try {
    await ProductModel.findByIdAndDelete(productId);
  } catch (error: any) {
    throw new Error(error);
  }
}
