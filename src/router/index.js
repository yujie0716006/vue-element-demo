import Vue from 'vue'
import VueRouter from 'vue-router'

// 首先使用vue-router
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/app/msite'
    },
    {
      path: '/',
      name: 'Layout',
      component: () => import('../Layout'),
      children: [
        {
          path: 'app',
          name: 'app',
          component: () => import('../App'),
          children: [
            {
              path: 'msite',
              name: '首页',
              component: () => import('../pages/Msite/Msite')
            },
            {
              path: 'search',
              name: '搜索',
              component: () => import('../pages/Search/Search')
            },
            {
              path: 'order',
              name: '订单',
              component: () => import('../pages/Order/Order')
            },
            {
              path: 'profile',
              name: '我的',
              component: () => import('../pages/Profile/Profile')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: '登陆',
      component: () => import('../pages/Login/Login')
    },
    {
      path: '/food_detail',
      name: '商品详情',
      component: () => import('../pages/FoodDetail/FoodDetail')
    }
  ]
})
