// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueReource from 'vue-resource';
import router from './router';

import './common/stylus/index.styl';

Vue.config.productionTip = false;
Vue.use(VueReource);
// 如果没有如下注释，eslint规定new实例化对象时必须赋给一个变量导致报错，然而Vue实例不需要赋值，所以需要如下注释
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
