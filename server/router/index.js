const express = require('express')
const svgCaptcha = require('svg-captcha')
const router = express.Router()

const {headerFoodModel, shopListModel} = require('../models/index')
const util = require('../util/util')

// 解决跨域问题
router.all('*', (req, res, next) => {
//  在响应的响应头上添加配置
  res.header('Access-Control-Allow-Origin', '*')
  next()
})
// 路由中间件，任何路由都会先经过这个中间件
// 路由中1，get请求：用req.query获取前台参数； 2，post请求：用req.body来获取前台参数
router.use((req, res, next) => {
  console.log('任何路由先经过这个路由')
  // 调用next()路由才会继续向下继续执行
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

// 登陆时获取一次性图形的验证码
router.get('/captcha', (req, res, next) => {
  const captcha = svgCaptcha.create({
    size: 4,
    noise: 2,
    color: true,
    ignoreChars: '0o1i'
  })
  // 要说明返回的格式是：svg格式的，要不前台不生效
  res.type('svg')
  const text = captcha.text
  console.log('验证码的文字', text)
  res.status(200).send(captcha.data)
  next()
})

// 发送发短信获取验证码， 后台通过前台得倒的电话号码，然后向第三方发送请求得到验证码
router.post('/sendCaptcha', (req, res, next) => {
  console.log('req的值为多少', req.body)
  const phone = 1323924982349
// 首先获取到 6 位验证码
  const code = util.randomCode(6)
//  发送给指定的手机号， 电话号码，短信验证码，成功的回调
  util.sendCode(phone, code, (success) => {
    if (success) {
      console.log('向手机号发送了验证码', code)
      res.status(200).json({
        err_code: 0,
        msg: '发送短信验证码成功'
      })
    } else {
      res.status(200).json({
        err_code: 1,
        msg: '发送短信验证码失败'
      })
    }
  })
  next()
})



// 向外暴露路由接口
module.exports = router
