import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import about from '@/views/about'
import cate from '@/views/cate'
import search from '@/views/search'
import resultProList from '@/views/resultProList'
import proDetail from '@/views/proDetail'
import transferRouter from '@/views/transferRouter'
import page404 from '@/views/error/404'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: '/share',
  routes: [
    { path: '/index', name: 'index', component: index },
    { path: '/about', name: 'about', component: about },
    { path: '/cate', name: 'cate', component: cate },
    { path: '/search', name: 'search', component: search },

    { path: '/resultProList', name: 'resultProList', component: resultProList },
    { path: '/proDetail', name: 'proDetail', component: proDetail },


    { path: '/transferRouter', name: 'transferRouter', component: transferRouter },


    { path: '/404', name: 'page404', component: page404 },
    { path: '*', name: 'page404', component: page404 }
  ]
})
