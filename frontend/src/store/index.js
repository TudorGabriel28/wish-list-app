import { createStore } from 'vuex';
import { apiClient } from '../utils/apiClient';
import { sessionService } from '@/services/sessionService';

const store = createStore({
  state: {
    token: '',
    role: ''
  },
  actions: {
    async loginUser({ commit }, credentials) {
      const response = await sessionService.authenticate(credentials);

      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('role', response.data.role);

      commit('setToken', response.data.accessToken);
      commit('setRole', response.data.role);

      apiClient.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.accessToken}`;
    },

    async logout({ commit }) {
      try {
        await sessionService.deleteSession();
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // location.reload();
        commit('setToken', '');
        commit('setRole', '');

        apiClient.defaults.headers.common['Authorization'] = null;
      } catch (error) {
        console.log(error);
      }
    },

    setToken({ commit }, token) {
      commit('setToken', token);
    },

    setRole({ commit }, role) {
      commit('setRole', role);
    }
  },
  mutations: {
    setToken: (state, token) => (state.token = token),
    setRole: (state, role) => (state.role = role)
  },
  getters: {
    token(state) {
      return state.token;
    },
    role(state) {
      return state.role;
    },
    isAdmin(state) {
      return state.role === 'admin' ? true : false;
    },
    isUser(state) {
      return state.role === 'admin' ? false : true;
    },
    isLoggedIn(state) {
      return !!state.token;
    }
  }
});

export default store;
