import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 没有引入style/index.css
import './styles/index.scss'

//axios设置
import axios from './config/httpConfig'

// 全局过滤
import * as globalFilter from './filters/filters'

// 引入图标
import '@/icons'

// axios全局使用
Vue.prototype.$http = axios

// 过滤 但没搞懂
for (var key in globalFilter) {
  Vue.filter(key, globalFilter[key])
}
// 注册使用ElementUI
Vue.use(ElementUI)

Vue.config.productionTip = false
// 路由导航狗子
router.beforeEach((to, from, next) => {
  if (!store.state.UserToken) {
      if (to.matched.length > 0 && !to.matched.some(record => record.meta.requiresAuth)) {
          next()
      } else {
          next({ path: '/login' })
      }
  } else {
      if (!store.state.permission.permissionList) {
          store.dispatch('permission/FETCH_PERMISSION').then(() => {
              next({ path: to.path })
          })
      } else {
          if (to.path !== '/login') {
              next()
          } else {
              next(from.fullPath)
          }
      }
  }
})

router.afterEach((to, from, next) => {
  var routerList = to.matched
  store.commit('setCrumbList', routerList)
  store.commit('permission/SET_CURRENT_MENU', to.name)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
