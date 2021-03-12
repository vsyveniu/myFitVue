import { getUser, loginUser } from '@/services/user.service';

const mutations = {
  setAuthStatus(state, status) {
    state.authStatus.status = status.status;
    state.authStatus.isLoading = status.isLoading;
  },
  setAuthLoading(state, status) {
    state.authLoading = status;
  },
  setAuthSuccess(state, userdata) {
    state.user = userdata.user;
    state.token = userdata.token;
  },
  killAuth(state){
    state.user = {};
    state.token = null;
    localStorage.removeItem('authorization');
  }
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
  async login({ commit }, { email, password }) {
    try {
      commit('setAuthStatus', { isLoading: true });
      const user = await loginUser(email, password);
      console.log(user);
      localStorage.setItem('authorization', user.token);
      //axios.defaults.headers.common['Authorization'] = token
      commit('setAuthSuccess', user);
      /*       commit('setAuthStatus', {
        status: 'login successfull',
        isLoading: false,
      }); */
    } catch (err) {
      commit('setAuthStatus', { status: err.response.data, isLoading: false });
    }
  },
  async logout({ commit }) {
    commit('killAuth');
  },
  async changeStatusNotification({ commit }, status) {
    console.log('daym');
    commit('setAuthStatus', status);
  },
};
const state = () => ({
  token: localStorage.getItem('authorization') || null,
  user: {},
  authStatus: { status: false, isLoading: false },
});

const getters = {
  user: ({ user }) => user,
  authStatus: ({ authStatus }) => authStatus,
  isLoggedIn: state => !!state.token,
};

export default {
  mutations,
  getters,
  actions,
  state,
};
