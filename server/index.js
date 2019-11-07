// 引入mongoose依赖包
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

// 引入路由模块
const index = require('./router/index')
const user = require('./router/user')

// 创建服务器实例
const app = express()

// 在app上面添加body-parser的解析请求头
app.use(bodyParser.urlencoded({extended: false}))
// 使接收的post请求为json格式的数据
app.use(bodyParser.json())

// 在app中挂载上session
app.use(session({
  secret: 'string', // 这个的作用就是每次加载的时候，加上这个一起加密
  cookie: {  // cookie的生存周期
    maxAge: 1000 * 60 * 60 * 24 * 15,
  },
  resave: false, // cookie之间的请求龟策，假设每次登陆，就会会话存在也重新保存一次
  saveUninitialized: true // 强制保存未初始化的会话到存储器
}))

// 使用mongoose链接本地数据库element
mongoose.connect('mongodb://localhost/element', {useNewUrlParser: true})


// 在服务器实例上挂载路由中间件，根据基本的路由地址，选择进入到响应的路由模块中，app中的use要在路由之前
app.use('/', index)
app.use('/user', user)

// 这个错误机制必须有四个参数，必须在app.use（router）将路由挂载在app后使用。前面的路由如果调用next并传递参数时，就直接跳到这个中间件上面了
app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({
      err_code: 500,
      msg: '服务器出现错误',
      status: 'error'
    })
  }
})

// 监听是否启动了服务器
app.listen(5000, () => {
  console.log('服务器启动成功～')
})

