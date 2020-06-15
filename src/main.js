// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI, { Form } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false
Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to, from, next) => { 
  Nprogress.start()
  if(to.matched.length === 0){
    next("/404")
  }
  let flag = false
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.meta.adminAuth) {
    if (store.getters.isAdmin) {
      // next()
      flag = true
    } else {
      ElementUI.Message.error("未授权请先登录")
      // next({
      //   path: "/adminLogin",
      //   query: { redirect: to.fullPath }
      // })
      flag = false
    }
  } else if(to.meta.userAuth){
    // store.dispatch('clearAdmin')
    // next()
    flag = true
  }else{
    // next()
    flag = true
  }
  if(flag){
    next()
  }else{
    next({
      path: "/adminLogin",
      query: { redirect: to.fullPath }
    })
  }
})

router.afterEach(() => {  
  Nprogress.done()
})
