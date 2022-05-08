import { Request, Response } from 'express';
import { CreateProductBody, ProductParams } from '../utils/types';
import {
  getAllProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
} from '../services/product';

export async function getProductsHandler(
  req: Request<any, any, any, ProductParams>,
  res: Response
) {
  try {
    const {
      wishlistId,
      sortCriteria,
      sortOrder,
      pageNumber,
      pageSize,
      search
    } = req.query;
    const response = await getAllProducts(
      wishlistId,
      sortCriteria,
      sortOrder,
      pageNumber,
      pageSize,
      search
    );
    res.setHeader('X-Pagination', JSON.stringify(response.metadata));
    return res.status(200).send(response.products);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function getProductHandler(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const product = await getProduct({ _id: productId });
    if (!product) {
      return res.sendStatus(404);
    }
    return res.status(200).send(product);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function createProductHandler(
  req: Request<any, any, CreateProductBody, any>,
  res: Response
) {
  try {
    const { productUrl, wishlistId } = req.body;
    const product = await createProduct(
      productUrl,
      wishlistId,
      req.get('user-agent') || ''
    );
    return res.status(201).send(product);
  } catch (error: any) {
    console.log(error);
    return res.status(409).send(error.message);
  }
}

export async function editProductHandler(req: Request, res: Response) {
  try {
    // @ts-ignore
    const { productId } = req.params;
    const product = await editProduct({ _id: productId }, req.body);
    if (!product) {
      return res.sendStatus(404);
    }
    return res.status(200).send(product);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function deleteProductHandler(req: Request, res: Response) {
  try {
    // @ts-ignore
    const { productId } = req.params;
    // @ts-ignore
    await deleteProduct(productId);
    return res.sendStatus(200);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
