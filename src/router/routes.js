/**
 * @file routes
 */

import * as pages from './pages';

const getComp = (name) => pages[name];

export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: getComp('home'),
  },
  {
    path: '/about',
    component: getComp('about'),
  },
];
