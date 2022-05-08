import mongoose, { FilterQuery, UpdateQuery } from 'mongoose';
import WishlistModel, { WishlistDocument } from '../models/wishlist';

export async function getAllWishlists(
  accountId: string,
  sortCriteria: string = 'createdAt',
  sortOrder: string | number = 1,
  pageNumber: number = 1,
  pageSize: number = 4,
  search?: string
) {
  try {
    let searchCriteria: any = {};
    const maxPageSize = 5;
    pageSize *= 1;
    pageNumber *= 1;
    if (pageSize > maxPageSize) {
      pageSize = maxPageSize;
    }

    const skip = (pageNumber - 1) * pageSize;

    if (search) {
      // @ts-ignore
      searchCriteria = { title: { $regex: search, $options: 'i' } };
    }

    if (accountId) {
      searchCriteria.account = accountId;
    }

    const wishlists = await WishlistModel.find(searchCriteria, { password: 0 })
      .sort({ [sortCriteria]: sortOrder })
      .limit(pageSize)
      .skip(skip)
      .populate({
        path: 'products',
        options: { limit: 10, sort: { createdAt: -1 } }
      })
      .lean()
      .exec();

    const totalCount = await WishlistModel.count();
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
  const wishlist = await WishlistModel.findOne(query, projection, options)
    .populate({
      path: 'products',
      options: { limit: 10, sort: { createdAt: -1 } }
    })
    .lean();
  return wishlist;
}

export async function getWishlistWithAllProducts(
  query: FilterQuery<WishlistDocument>,
  projection: Object = {},
  options: Object = {}
) {
  const wishlist = await WishlistModel.findOne(query, projection, options)
    .populate({
      path: 'products'
    })
    .lean();
  return wishlist;
}

export async function createWishlist(input: Object, accountId: string) {
  try {
    return await WishlistModel.create({ ...input, account: accountId });
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

export async function deleteWishlist(wishlistId: string) {
  try {
    await WishlistModel.findByIdAndDelete(wishlistId);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getWishlistsTitle(
  accountId: mongoose.Schema.Types.ObjectId
) {
  const wishlists = await WishlistModel.find({ account: accountId })
    .select('title _id')
    .lean()
    .exec();

  return wishlists;
}
