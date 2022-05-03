import { Router } from 'express';
import {
  getProductHandler,
  getProductsHandler,
  createProductHandler,
  editProductHandler,
  deleteProductHandler
} from '../controllers/product';
import requiresAuth from '../middlewares/requiresAuth';

const productRouter = Router();

productRouter.get('/', requiresAuth(), getProductsHandler);

productRouter.get('/:productId', requiresAuth(), getProductHandler);

productRouter.post('/', requiresAuth(), createProductHandler);

productRouter.put('/:productId', requiresAuth(), editProductHandler);

productRouter.delete('/:productId', requiresAuth(), deleteProductHandler);

export default productRouter;
