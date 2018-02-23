// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css'
import 'animate.css';

import YDUI from 'vue-ydui/';
/*import YDUI from 'vue-ydui/ydui.rem.js'*/
import 'vue-ydui/dist/ydui.rem.css';
Vue.use(YDUI)


/*import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)*/

/*import 'iview/dist/styles/iview.css';
import iView from 'iview';
Vue.use(iView);*/

import axios from 'axios'
Vue.prototype.axios = axios
// 将API方法绑定到全局
import api from './api/ajax.js'
Vue.prototype.$api = api;


import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'
import store from './store/index'
Vue.use(Vuex)


Vue.config.productionTip = false

// 懒加载配置
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  error:'static/img/lazyimg/loading2.gif',
  loading:'static/img/lazyimg/loading2.gif'
})
/*
<img class="item-pic" v-lazy="newItem.picUrl"/>*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
router.beforeEach((to, from, next) => {
  next();
})


