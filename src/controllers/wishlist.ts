import { Request, Response } from 'express';
import { QueryParams } from '../utils/types';
import {
  getAllWishlists,
  getWishlist,
  createWishlist,
  editWishlist,
  deleteWishlist
} from '../services/wishlist';

export async function getWishlistsHandler(
  req: Request<any, any, any, QueryParams>,
  res: Response
) {
  try {
    const { sortCriteria, sortOrder, pageNumber, pageSize, search } = req.query;
    const response = await getAllWishlists(
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
    const wishlist = await createWishlist(req.body);
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
