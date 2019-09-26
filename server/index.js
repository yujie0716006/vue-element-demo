// 引入mongoose依赖包
const mongoose = require('mongoose')
const express = require('express')

// 引入路由模块
const index = require('./router/index')
const user = require('./router/user')

// 创建服务器实例
const app = express()

// 使用mongoose链接本地数据库element
mongoose.connect('mongodb://localhost/element', {useNewUrlParser: true})

// 在服务器实例上挂载路由中间件，根据基本的路由地址，选择进入到响应的路由模块中
app.use('/', index)
app.use('/user', user)


// 监听是否启动了服务器
app.listen(5000, () => {
  console.log('服务器启动成功～')
})

