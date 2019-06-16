/**
 * @file router
 */

import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

export default new Router({
    mode: 'history',
    strict: process.env.NODE_ENV !== 'production',
	routes
});

