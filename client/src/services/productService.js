import { apiClient } from '../utils/apiClient';

class ProductService {
  async getProducts(productParameters) {
    return await apiClient.get('/product', { params: productParameters });
  }

  async getProduct(productId) {
    return await apiClient.get(`/product/${productId}`);
  }

  async addProduct(createProductRequest) {
    return await apiClient.post('/product', createProductRequest);
  }

  async editProduct(productId, productData) {
    return await apiClient.put(`/product/${productId}`, productData);
  }

  async deleteProduct(productId) {
    return await apiClient.delete(`/product/${productId}`);
  }
}

export const productService = new ProductService();
