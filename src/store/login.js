import { loginUser } from '@/services/login.service';
import store from './index';

const mutations = {
  setAuthMessage(state, message) {
    state.authMessage = message;
  },
  setAuthFail(state, fail) {
    state.authMessage = fail.message;
    state.authErr = fail.errField;
  },
  setAuthLoading(state, isLoading) {
    state.loginIsLoading = isLoading;
  },
  setAuthErrorField(state, errorField) {
    state.authErr = errorField;
  },
  setAuthSuccess(state, success) {
    state.authMessage = success.message;
    state.authErr = { mail: false, password: false };
  },
};

const actions = {
  async login({ commit }, { email, password }) {
    try {
      commit('setAuthLoading', true);
      const user = await loginUser(email, password);
      localStorage.setItem('authorization', user.token);
      commit('setAuthSuccess', {
        message: false,
        errField: {
          mail: false,
          password: false,
        },
      });
      store.dispatch('setUser', user);
      commit('setAuthLoading', false);
    } catch (err) {
      let mail = err.response.status == 404 ? true : false;
      let password = err.response.status == 400 ? true : false;
      commit('setAuthFail', {
        message: err.response.data,
        errField: { mail, password },
      });
      commit('setAuthLoading', false);
    }
  },
  async hideAuthMessage({ commit }) {
    commit('setAuthMessage', false);
  },
};
const state = () => ({
  loginIsLoading: false,
  authMessage: false,
  authErr: { mail: false, password: false },
});

const getters = {
  authErr: ({ authErr }) => authErr,
  authMessage: ({ authMessage }) => authMessage,
  loginIsLoading: ({ loginIsLoading }) => loginIsLoading,
};

export default {
  mutations,
  getters,
  actions,
  state,
};
