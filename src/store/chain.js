import { fetchChain, updateChain } from '@/services/chain.service';
import store from './index';

const mutations = {
  SET_CHAIN(state, chain) {
    state.chain = chain;
  },
  SET_CHAIN_MESSAGE(state, message) {
    state.chainMessage = message;
  },
  SET_CHAIN_FAIL(state, fail) {
    state.chainMessage = fail.message;
    state.chainErr = fail.errField;
  },
  SET_CHAIN_SUCCESS(state, message) {
    state.chainMessage = message;
    state.chainErr = { badOrder: false, serverFucked: false };
  },
  SET_CHAIN_LOADING(state, isLoading) {
    state.chainIsLoading = isLoading;
  },
};

const actions = {
  async fetch({ commit }) {
    try {
      const chain = await fetchChain(store.getters.user.name);
      commit('SET_CHAIN', chain.response.data);
      commit('SET_CHAIN_LOADING', false);
    } catch (err) {
      let serverErr = err.response.status != 200 ? true : false;
      commit('SET_CHAIN_FAIL', {
        message: err.response.data,
        errField: { badOrder: false, serverFucked: serverErr },
      });
      commit('SET_CHAIN_LOADING', false);
    }
  },
  async update({ commit }, updated) {
    try {
      commit('SET_CHAIN', updated);
      commit('SET_CHAIN_LOADING', true);
      let clone = [];

      for (let daily of updated) {
        clone.push({ daily_id: daily.daily_id });
      }
      const res = await updateChain(store.getters.user.name, clone);
      commit('SET_CHAIN_LOADING', false);
      commit('SET_CHAIN_SUCCESS', res.response.data);
      setTimeout(() => commit('SET_CHAIN_MESSAGE', false), 3000);
    } catch (err) {
      let serverErr = err.response.status != 200 ? true : false;
      commit('SET_CHAIN_FAIL', {
        message: err.response.data,
        errField: { badOrder: false, serverFucked: serverErr },
      });
    }
  },
  async hideChainMessage({ commit }) {
    commit('SET_CHAIN_MESSAGE', false);
  },
};

const state = () => ({
  chain: [],
  chainIsLoading: false,
  chainMessage: false,
  chainErr: { badOrder: false, serverFucked: false },
});

const getters = {
  chain: state => {
    return state.chain;
  },
  chainErr: ({ chainErr }) => chainErr,
  chainMessage: ({ chainMessage }) => chainMessage,
  chainIsLoading: ({ chainIsLoading }) => chainIsLoading,
};

export default {
  mutations,
  getters,
  actions,
  state,
};
