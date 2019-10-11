const express = require('express')
const router = express.Router()

const {headerFoodModel, shopListModel} = require('../models/index')


// 路由中间件，任何路由都会先经过这个中间件
router.use((req, res, next) => {
  console.log('任何路由先经过这个路由')
  // 调用next()路由才会继续向下继续执行
  next()
})

// 解决跨域问题
router.all('*', (req, res, next) => {
//  在响应的响应头上添加配置
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

// 外卖中的首页导航食物列表
router.get('/msite/header_food', (req, res, next) => {
  headerFoodModel.find((err, data) => {
    if (err) return next(err)
    return res.status(200).json({
      err_code: 0,
      result: data,
      msg: '获取数据成功'
    })
  })
})

// 首页中附近商家的食物列表
router.get('/msite/shoplist', (req, res, next) => {
  console.log('接收到的地址参数', req.query)
  shopListModel.find((err, data) => {
    if (err) return next(err)
    return res.status(200).json({
      err_code: 0,
      data: data,
      msg: '获取附近商家数据成功'
    })
  })
})

// 向外暴露路由接口
module.exports = router
