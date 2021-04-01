import { fetchChain, updateChain } from '@/services/chain.service';
import store from './index';

const mutations = {
  SET_CHAIN(state, chain) {
    console.log('mutation');
    console.log(chain);
    state.chain = chain;
    console.log('after mutation');
    console.log(state.chain);
  },
  SET_CHAIN_MESSAGE(state, message) {
    state.chainMessage = message;
  },
  SET_CHAIN_FAIL(state, fail) {
    state.chainMessage = fail.message;
    state.chainErr = fail.errField;
  },
  SET_CHAIN_LOADING(state, isLoading) {
    state.chainIsLoading = isLoading;
  },
};

const actions = {
  async fetch({ commit }) {
    try {
      console.log(store.getters.user.name);
      console.log('token chain');
      console.log(localStorage.getItem('authtoken'));
      // const chain = await fetchChain(store.getters.user.name);
      const chain = await fetchChain('suggestion');
      console.log('before set');
      console.log(chain.response.data);
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
      //await updateChain(store.getters.user.name, updated);
      console.log(typeof updated);
      console.log(updated);

      let clone = [];

      console.log('first cloned');
      console.log(clone);

      for (let daily of updated) {
        console.log('------------');
        console.log(daily);
        clone.push({ daily_id: daily.daily_id });
      }
      console.log('clone');
      console.log(clone);

      await updateChain('suggestion', clone);
    } catch (err) {
      //let serverErr = err.response.status != 200 ? true : false;
      console.log(err);
      /*       commit('SET_CHAIN_FAIL', {
        message: err.response.data,
        errField: { badOrder: false, serverFucked: serverErr },
      }); */
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
