import ajax from './server'

// 获取外卖首页的食品导航列表
export const headerFood = () => {
  return ajax.get('/msite/header_food')
}

// 获取外卖首页的附近商家数组
export const merchantsShop = (params) => {
  return ajax.get('/msite/shoplist', params)
}
