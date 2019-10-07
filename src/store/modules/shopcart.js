/**
 * @file shopcart
 */

const SET_PAGE_NAME = 'shopcart/set-page-name';

export default {
  state: {
    pageName: '',
  },

  mutations: {
    [SET_PAGE_NAME](state, { data }) {
      state.pageName = data;
    },
  },

  actions: {
    setPageName({ commit }, params) {
      commit('SET_PAGE_NAME', params.title);
    },
  },
};
