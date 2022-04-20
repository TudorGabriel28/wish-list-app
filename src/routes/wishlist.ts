import { Router } from 'express';
import {
  getWishlistHandler,
  getWishlistsHandler,
  createWishlistHandler,
  editWishlistHandler,
  deleteWishlistHandler
} from '../controllers/wishlist';

const wishlistRouter = Router();

wishlistRouter.get('/', getWishlistsHandler);

wishlistRouter.get('/:wishlistId', getWishlistHandler);

wishlistRouter.post('/', createWishlistHandler);

wishlistRouter.put('/:wishlistId', editWishlistHandler);

wishlistRouter.delete('/:wishlistId', deleteWishlistHandler);

export default wishlistRouter;
