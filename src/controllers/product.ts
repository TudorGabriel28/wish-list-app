import { Request, Response } from 'express';
import { CreateProductQuery, QueryParams } from '../utils/types';
import {
  getAllProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
} from '../services/product';
import { ProductDocument } from '../models/product';

export async function getProductsHandler(
  req: Request<any, any, any, QueryParams>,
  res: Response
) {
  try {
    const { sortCriteria, sortOrder, pageNumber, pageSize, search } = req.query;
    const response = await getAllProducts(
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
  req: Request<any, any, ProductDocument, CreateProductQuery>,
  res: Response
) {
  try {
    const product = await createProduct(req.body, req.query);
    return res.status(201).send(product);
  } catch (error: any) {
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
