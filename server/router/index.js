const express = require('express')
const router = express.Router()

const {headerFoodModel} = require('../models/index')


// 路由中间件，任何路由都会先经过这个中间件
router.use((req, res, next) => {
  console.log('任何路由先经过这个路由')
  // 调用next()路由才会继续向下继续执行
  next()
})

router.get('/header_food', (req, res) => {
  headerFoodModel.find((err, data) => {
    console.log('data', data)
  })
  res.send('这是使用get请求，来请求根路径')
})

// 向外暴露路由接口
module.exports = router
