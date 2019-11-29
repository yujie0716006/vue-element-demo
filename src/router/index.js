import Vue from 'vue'
import VueRouter from 'vue-router'

// 首先使用vue-router
Vue.use(VueRouter)

export default new VueRouter({
  // linkActiveClass: 'a_active_style',
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
      redirect: '/food_detail/order_food'
    },
    {
      path: '/food_detail',
      name: '商品详情',
      component: () => import('../pages/FoodDetail/FoodDetail'),
      children: [
        {
          path: 'order_food',
          name: '点餐',
          component: () => import('../pages/FoodDetail/OrderFood/OrderFood')
        },
        {
          path: 'rating',
          name: '评价',
          component: () => import('../pages/FoodDetail/Rating/Rating')
        },
        {
          path: 'shop_info',
          name: '商家信息',
          component: () => import('../pages/FoodDetail/ShopInfo/ShopInfo')
        }
      ]
    }
  ]
})
