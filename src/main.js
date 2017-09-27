// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  {
    path: '/',
    redirect: '/goods'
  },
  {
    path: '/goods',
    components: goods
  },
  {
    path: '/ratings',
    components: ratings
  },
  {
    path: '/seller',
    components: seller
  }
];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
