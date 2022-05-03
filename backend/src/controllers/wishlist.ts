import { Request, Response } from 'express';
import { WishlistParams } from '../utils/types';
import {
  getAllWishlists,
  getWishlist,
  createWishlist,
  editWishlist,
  deleteWishlist,
  getWishlistsTitle
} from '../services/wishlist';

export async function getWishlistsHandler(
  req: Request<any, any, any, WishlistParams>,
  res: Response
) {
  try {
    const {
      sortCriteria,
      sortOrder,
      pageNumber,
      pageSize,
      search,
      onlyTitles
    } = req.query;

    if (onlyTitles) {
      // @ts-ignore
      const wishlists = await getWishlistsTitle(req.account._id);
      return res.status(200).send(wishlists);
    }

    const response = await getAllWishlists(
      // @ts-ignore
      req.account._id,
      sortCriteria,
      sortOrder,
      pageNumber,
      pageSize,
      search
    );
    res.setHeader('X-Pagination', JSON.stringify(response.metadata));
    return res.status(200).send(response.wishlists);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function getWishlistHandler(req: Request, res: Response) {
  try {
    const { wishlistId } = req.params;
    const wishlist = await getWishlist({ _id: wishlistId });
    if (!wishlist) {
      return res.sendStatus(404);
    }
    return res.status(200).send(wishlist);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function createWishlistHandler(req: Request, res: Response) {
  try {
    // @ts-ignore
    const { _id } = req.account;
    const wishlist = await createWishlist(req.body, _id);
    return res.status(201).send(wishlist);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export async function editWishlistHandler(req: Request, res: Response) {
  try {
    // @ts-ignore
    const { wishlistId } = req.params;
    const wishlist = await editWishlist({ _id: wishlistId }, req.body);
    if (!wishlist) {
      return res.sendStatus(404);
    }
    return res.status(200).send(wishlist);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function deleteWishlistHandler(req: Request, res: Response) {
  try {
    // @ts-ignore
    const { wishlistId } = req.params;
    // @ts-ignore
    await deleteWishlist(wishlistId);
    return res.sendStatus(200);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
