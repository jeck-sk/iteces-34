import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router/index.js'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共样式
import '@/styles/index.less'
// 守卫导航
router.beforeEach((to, from, next) => {
  // 判断用户是否登陆过或者是否跳转到login页,如果是则继续
  var token = localStorage.getItem('itart_manage_token')
  if (token || to.path === '/login') {
    next()
  } else {
    next({ name: 'login' })
  }
})
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
