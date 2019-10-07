/**
 * @file entry file
 */

import Vue from 'vue';
import FastClick from 'fastclick';
import 'babel-polyfill';
import router from '@/router';
import store from '@/store';
import App from '@/components/App';
import '@/styles/base.less';

FastClick.attach(document.body);

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
