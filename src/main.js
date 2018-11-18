// 导入所需模块
import Vue from 'vue'
import App from './App'
import router from './router'

// ajax
import VueAxios from 'vue-axios'

// 状态管理
import vuex from 'vuex'

// ui 框架
import Vant from 'vant'
import 'vant/lib/vant-css/index.css'

// 懒加载
import {Lazyload} from 'vant'
// 瀑布流
import {Waterfall} from 'vant'

import store from './store/index'
import service from './utils/request'
import VueResource from 'vue-resource'
import { Toast } from 'vant'
// import http from 'axios'

Vue.prototype.$http = service

Vue.config.productionTip = false

Vue.use(VueResource)
Vue.use(Toast)
// Vue.use(VueAxios, axios)

Vue.use(vuex)

Vue.use(Vant)

Vue.use(Lazyload)

Vue.use(Waterfall)

// router.beforeEach((to, from, next) => {
//   const s = true
//   if (!s) {
//     if (to.path === '/login') {
//       next()
//     } else {
//       next('/login')
//     }
//   } else {
//     next()
//   }
// })

Vue.http.options.emulateHTTP = true
Vue.http.options.emulateJSON = true

/* VUE实例 */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
