import { apiClient } from '../utils/apiClient';

class SessionService {
  async authenticate(credentials) {
    return await apiClient.post('/session/', credentials);
  }

  async deleteSession() {
    await apiClient.delete('/session/');
  }
}

export const sessionService = new SessionService();
