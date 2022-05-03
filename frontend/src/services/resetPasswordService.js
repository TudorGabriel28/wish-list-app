import { apiClient } from '@/utils/apiClient';

class ResetPasswordService {
  async createResetPasswordToken(email) {
    await apiClient.post('/reset-password/', email);
  }

  async validateResetPasswordToken(resetPasswordToken) {
    await apiClient.get(`/reset-password/${resetPasswordToken}`);
  }
}

export const resetPasswordService = new ResetPasswordService();
