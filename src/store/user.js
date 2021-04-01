import { getUser } from '@/services/user.service';

const mutations = {
  setUser(state, userdata) {
    state.user = userdata.user;
    state.token = userdata.token;
  },
  killAuth(state) {
    state.user = {};
    state.token = null;
    localStorage.removeItem('authtoken');
  },
};

const actions = {
  async fetchUser({ commit }, id) {
    try {
      const user = await getUser(id);
      commit('setUser', user);
    } catch (err) {
      commit('setUserError', err);
    }
  },
  async setUser({ commit }, user) {
    try {
      commit('setUser', user);
    } catch (err) {
      commit('setUserError', err);
    }
  },
  async setLoggedIn({ commit }, isLoggedIn) {
    commit('setIsLoggedIn', isLoggedIn);
  },
  async logout({ commit }) {
    commit('killAuth');
  },
};
const state = () => ({
  token: localStorage.getItem('authtoken') || null,
  user: {},
});

const getters = {
  user: ({ user }) => user,
  isLoggedIn: state => !!state.token,
};

export default {
  mutations,
  getters,
  actions,
  state,
};
