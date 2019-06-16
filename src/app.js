/**
 * @file entry file
 */

import Vue from 'vue';
import root from './components/root/root';
import router from './router';
import store from './store';
import './common/common';

new Vue({
	el: '#app',
	router,
    store,
	render: h => h(root)
});


