import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import login from './login';
import register from './register';
import user from './user';
import chain from './chain';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    login,
    register,
    user,
    chain,
  },
  plugins: [createPersistedState()]
});
