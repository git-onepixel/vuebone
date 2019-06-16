/**
 * @file product
 */

import axios from 'axios';

const FETCH_TIPS_REQUEST = 'product/fetch-tips-request';

export default {
    state: {
        tips: ''
    },

    mutations: {
        [FETCH_TIPS_REQUEST] (state, { data }) {
            state.tips = data;
        }
    },

    getters: {
        title (state) {
            return `this is ${state.tips}`;
        }
    },

    actions: {
        async getTips({ commit }) {
            let res = await axios.get('https://www.duqianduan.com/api/gettips');
            if (res.data) {
                commit(FETCH_TIPS_REQUEST, res.data);
            }
        }
    }
}