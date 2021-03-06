import axios from 'axios';
import router from '../router';
import store from '../store';
import { Toast } from './toastAlert';

export const apiClient = axios.create({
  baseURL: `${process.env.VUE_APP_ROOT_API}/api`,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers['x-access-token'];
    if (newAccessToken) {
      localStorage.setItem('token', newAccessToken);
      apiClient.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${newAccessToken}`;
    }
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      await store.dispatch('logout');
      Toast.fire({
        icon: 'error',
        title: 'Your session has expired.'
      });
      router.push({
        name: 'Login'
      });
    }
    return Promise.reject(error);
  }
);
