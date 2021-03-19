import { registerUser } from '@/services/register.service';
import store from './index';

const mutations = {
  setRegMessage(state, message) {
    state.regMessage = message;
  },
  setRegFail(state, fail) {
    state.regMessage = fail.message;
    state.regErr = fail.errField;
  },
  setRegLoading(state, isLoading) {
    state.regIsLoading = isLoading;
  },
  setRegErrorField(state, errorField) {
    state.regErr = errorField;
  },
  setRegSuccess(state, success) {
    state.regMessage = success.message;
    state.regErr = { name: false, mail: false, password: false };
  },
};

const actions = {
  async register({ commit }, { name, email, password }) {
    try {
      commit('setRegLoading', { isLoading: true });
      const user = await registerUser(name, email, password);
      localStorage.setItem('authorization', user.token);
      commit('setRegSuccess', {
        message: false,
        errField: {
          name: false,
          mail: false,
          password: false,
        },
      });
      store.dispatch('setUser', user);
      commit('setRegLoading', false);
    } catch (err) {
      let mail = err.response.status == 404 ? true : false;
      let password = err.response.status == 400 ? true : false;
      commit('setRegFail', {
        message: err.response.data,
        errField: { mail, password },
      });
      commit();
      commit('setRegLoading', false);
    }
  },
  async changeStatusNotification({ commit }, status) {
    console.log('bitch');
    commit('setRegStatus', status);
  },
  async hideRegMessage({ commit }) {
    commit('setRegMessage', false);
  },
};
const state = () => ({
  regMessage: false,
  regIsLoading: ({ regIsLoading }) => regIsLoading,
  regErr: { name: false, mail: false, password: false },
});

const getters = {
  regErr: ({ regErr }) => regErr,
  regMessage: ({ regMessage }) => regMessage,
  regIsLoading: ({ regIsLoading }) => regIsLoading,
};

export default {
  mutations,
  getters,
  actions,
  state,
};
