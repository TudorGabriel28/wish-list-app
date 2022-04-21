import { Router } from 'express';
import {
  getProductHandler,
  getProductsHandler,
  createProductHandler,
  editProductHandler,
  deleteProductHandler
} from '../controllers/product';

const productRouter = Router();

productRouter.get('/', getProductsHandler);

productRouter.get('/:productId', getProductHandler);

productRouter.post('/', createProductHandler);

productRouter.put('/:productId', editProductHandler);

productRouter.delete('/:productId', deleteProductHandler);

export default productRouter;
