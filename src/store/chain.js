import { fetchChain } from '@/services/chain.service';
//import store from './index';

const mutations = {
  SET_CHAIN(state, chain){
    state.chain = chain;
  },
  SET_CHAIN_MESSAGE(state, message){
    state.chainMessage = message;
  },
  SET_CHAIN_FAIL(state, fail){
    state.chainMessage = fail.message;
    state.chainErr = fail.errField;
  },
};

const actions = {
  async fetch({ commit }, { userId }) {
    try {
      const chain = await fetchChain(userId);
      commit('SET_CHAIN', {
        chain,
      });
      commit('setChainLoading', false);
    } catch (err) {
      let serverErr = err.response.status != 200 ? true : false;
      commit('setChainFail', {
        message: err.response.data,
        errField: { badOrder:false, serverFucked:serverErr },
      });
      commit('setChainLoading', false);
    }
  },
  async hideChainMessage({ commit }) {
    commit('setChainMessage', false);
  },
};
const state = () => ({
  chain: false,
  chainIsLoading: false,
  chainMessage: false,
  chainErr: { badOrder: false, serverFucked: false },
});

const getters = {
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
