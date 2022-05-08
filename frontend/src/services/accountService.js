import { apiClient } from '../utils/apiClient';

class AccountService {
  async authenticate(credentials) {
    return await apiClient.post('/account/authenticate', credentials);
  }
  async registerAccount(credentials) {
    await apiClient.post('/account/', credentials);
  }

  async getAllAccounts() {
    const users = await apiClient.get('/account/');
    return users;
  }

  async getAccount(accountId) {
    return await apiClient.get(`/account/${accountId}`);
  }

  async editAccount(accountData) {
    return await apiClient.put('/account/', accountData);
  }

  async deleteAccount() {
    await apiClient.delete('/account/');
  }

  async activateAccount(accountId) {
    await apiClient.get(`/account/verify-email/${accountId}`);
  }

}

export const accountService = new AccountService();
