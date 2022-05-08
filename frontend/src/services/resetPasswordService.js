import { apiClient } from '@/utils/apiClient';

class ResetPasswordService {
  async createResetPasswordToken(email) {
    await apiClient.post('/reset-password/', email);
  }

  async validateResetPasswordToken(resetPasswordToken, passwords) {
    await apiClient.put(`/reset-password/${resetPasswordToken}`, passwords);
  }
}

export const resetPasswordService = new ResetPasswordService();
