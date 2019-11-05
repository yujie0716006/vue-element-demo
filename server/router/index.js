const express = require('express')
const svgCaptcha = require('svg-captcha')
const md5 = require('md5')
const router = express.Router()

const {headerFoodModel, shopListModel, userModel} = require('../models/index')
const util = require('../util/util')

const user = {} // 用户的信息
let textCaptcha = ''

// 解决跨域问题
router.all('*', (req, res, next) => {
//  在响应的响应头上添加配置
  res.header('Access-Control-Allow-Origin', '*') // 允许所有的请求源地址都可通过
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With") // 所有的请求头类型
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  if (req.method === 'OPTIONS') res.sendStatus(200)
  else next()
})
// 路由中间件，任何路由都会先经过这个中间件
// 路由中1，get请求：用req.query获取前台参数； 2，post请求：用req.body来获取前台参数
router.use((req, res, next) => {
  // 调用next()路由才会继续向下继续执行，半匹配
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
  textCaptcha = captcha.text.toLocaleLowerCase() // 验证码不分大小写
  res.status(200).send(captcha.data)
  next()
})

// 发送发短信获取验证码， 后台通过前台得倒的电话号码，然后向第三方发送请求得到验证码
router.get('/sendCaptcha', (req, res, next) => {
  const phone = req.query.phone
// 首先获取到 6 位验证码
  const code = util.randomCode(6)
  user[phone] = code // 每个用户对象key为手机号；value是对应的验证码
//  发送给指定的手机号， 电话号码，短信验证码，成功的回调
  util.sendCode(phone, code, (success) => {
    if (success) {
      return res.status(200).json({
        err_code: 0,
        msg: '发送短信验证码成功'
      })
    } else {
      return res.status(200).json({
        err_code: 1,
        msg: '发送短信验证码失败'
      })
    }
  })
})

// 登陆接口
router.post('/login', (req, res, next) => {
  const {phone, code, name, pwdCode} = req.body
  let {pwd} = req.body
  if (pwd) {
     pwd = md5(md5(req.body.pwd))
  }
  if (!!name) { // 密码登录
    userModel.findOne({
      name
    }, (err, user) => {
      if (err) next(err)
      if (!user) { // 用户不存在，就注册并且登陆
        if (textCaptcha !== pwdCode) {
          res.status(200).send({
            code_err: 1,
            msg: '验证码输入错误'
          })
          return
        }
        const person = {
          name,
          pwd,
          phone: name,
          money: 100 * Math.random().toFixed(4) + '',
          integral: 100 * Math.random().toFixed(4) + '',
          preferential: 100 * Math.random().toFixed(4) + '',
        }
        // uerModel是模型，new userModel是构建这个模型的实例，然后根据传入的参数保存这个实例，进行保存save
        new userModel(person).save((err) => {
          if (err) next(err)
          res.status(200).send({
            code_err: 0,
            msg: '存储用户成功',
            data: person
          })
        })
      } else { // 用户存在，判断密码和验证码是否正确
        if (textCaptcha === pwdCode && user.pwd === pwd) {
          res.status(200).send({
            code_err: 0,
            msg: '用户存在且密码和验证码都正确',
            data: user
          })
        } else {
          res.status(200).send({
            code_err: 2,
            msg: '用户名的密码或是验证码不正确',
            data: user,
          })
        }
      }
    })
  } else { // 短信登陆
    if (user[phone] === code) {
      userModel.findOne({
        phone
      }, (err, data) => {
        if (err) next(err)
        res.status(200).send({
          code_err: 0,
          data: data,
          msg: '用户名验证码正确'
        })
      })
    } else {
      res.status(200).send({
        code_err: 1,
        msg: '用户名验证码不正确'
      })
    }
  }

})


// 向外暴露路由接口
module.exports = router
