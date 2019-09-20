import Vue from 'vue'

import router from './router'
import Layout from './Layout'


// 在开发环境中不提醒
Vue.config.productionTip = false

// 移动端使用viewport适配

/*
;(() => {
  const targetWidth = 750
  const scale = document.documentElement.clientWidth / targetWidth
  const meta = document.querySelector('meta[name="viewport"]')
  meta.content = `initial-scale=${scale},minimum-scale=${scale},maximum-scale=${scale},user-scalable=no`
})()
*/

;new Vue({
  el: '#app',
  router,
  render: h => h(Layout) // 引入app文件，将其挂载到id = app的dom元素下面
})
