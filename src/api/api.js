import ajax from './server'

// 获取外卖首页的视频导航列表
export const headerFood = () => {
  return ajax.get('/msite/header_food')
}
