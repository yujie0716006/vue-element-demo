const express = require('express')
const router = express.Router()

const {headerFoodModel} = require('../models/index')


// 路由中间件，任何路由都会先经过这个中间件
router.use((req, res, next) => {
  console.log('任何路由先经过这个路由')
  // 调用next()路由才会继续向下继续执行
  next()
})

// 外卖中的首页导航食物列表
router.get('/msite/header_food', (req, res) => {
  headerFoodModel.find((err, data, next) => {
    if (err) return next(err)
    return res.status(200).json({
      err_code: 0,
      result: data,
      msg: '获取数据成功'
    })
  })
})

// 向外暴露路由接口
module.exports = router
