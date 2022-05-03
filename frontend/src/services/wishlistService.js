import { apiClient } from '../utils/apiClient';

class WishlistService {
  async getWishlists(wishlistParameters) {
    return await apiClient.get('/wishlist', { params: wishlistParameters });
  }

  async getWishlist(wishlistId) {
    return await apiClient.get(`/wishlist/${wishlistId}`);
  }

  async addWishlist(createWishlistRequest) {
    return await apiClient.post('/wishlist', createWishlistRequest);
  }

  async updateWishlist(wishlistId, wishlistData) {
    return await apiClient.put(`/wishlist${wishlistId}`, wishlistData);
  }

  async deleteWishlist(wishlistId) {
    await apiClient.delete(`/wishlist${wishlistId}`);
  }
}

export const wishlistService = new WishlistService();
