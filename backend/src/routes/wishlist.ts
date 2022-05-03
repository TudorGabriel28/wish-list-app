import { Router } from 'express';
import {
  getWishlistHandler,
  getWishlistsHandler,
  createWishlistHandler,
  editWishlistHandler,
  deleteWishlistHandler
} from '../controllers/wishlist';
import requiresAuth from '../middlewares/requiresAuth';

const wishlistRouter = Router();

wishlistRouter.get('/', requiresAuth(), getWishlistsHandler);

wishlistRouter.get('/:wishlistId', requiresAuth(), getWishlistHandler);

wishlistRouter.post('/', requiresAuth(), createWishlistHandler);

wishlistRouter.put('/:wishlistId', requiresAuth(), editWishlistHandler);

wishlistRouter.delete('/:wishlistId', requiresAuth(), deleteWishlistHandler);

export default wishlistRouter;
