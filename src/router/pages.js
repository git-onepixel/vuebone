/**
 * @file pages
 */

export const home = (r) => require.ensure([], () => r(require('@/pages/home/home')), 'home');
export const about = (r) => require.ensure([], () => r(require('@/pages/about/about')), 'about');
