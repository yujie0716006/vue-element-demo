import ajax from './server'

// 获取外卖首页的食品导航列表
export const headerFood = () => {
  return ajax.get('/msite/header_food')
}

// 获取外卖首页的附近商家数组
export const merchantsShop = (params) => {
  return ajax.get('/msite/shoplist', params)
}

// 向手机号发送短信验证码
export const sendPhoneCode = (params) => {
  return ajax.get('/sendCaptcha', params)
}

// 登陆接口
export const loginInfo = (params) => {
  return ajax.post('/login', params)
}

// 判断用户是否已经登陆
export const userInfo = () => {
  return ajax.get('/getUserInfo')
}

//搜索商家以及美食
export const search_foods = (params) => {
  return ajax.get('/search_shops', params)
}
