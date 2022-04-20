import { FilterQuery, UpdateQuery } from 'mongoose';
import WishlistModel, { WishlistDocument } from '../models/wishlist';

export async function getAllWishlists(
  sortCriteria: string = 'createdAt',
  sortOrder: string | number = 1,
  currentPage: number = 1,
  pageSize: number = 20,
  search?: string
) {
  try {
    let searchCriteria = {};
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
      searchCriteria = { title: { $regex: search, $options: 'i' } };
    }

    const wishlists = await WishlistModel.find(searchCriteria, { password: 0 })
      .sort({ [sortCriteria]: sortOrder })
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();

    const totalCount = await WishlistModel.count();
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

    return { wishlists, metadata };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getWishlist(
  query: FilterQuery<WishlistDocument>,
  projection: Object = {},
  options: Object = {}
) {
  const wishlist = await WishlistModel.findOne(
    query,
    projection,
    options
  ).lean();
  return wishlist;
}

export async function createWishlist(input: WishlistDocument) {
  try {
    return await WishlistModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function editWishlist(
  query: FilterQuery<WishlistDocument>,
  updates: UpdateQuery<WishlistDocument>
) {
  try {
    return await WishlistModel.findOneAndUpdate(query, updates, {
      new: true
    }).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteWishlist(query: FilterQuery<WishlistDocument>) {
  try {
    await WishlistModel.deleteOne({ query });
  } catch (error: any) {
    throw new Error(error);
  }
}
