// 这个是关于用户的路由
const express = require('express')
const router = express.Router()

// 这里的路由路径，会直接拼接上挂载路由时的基础路径
router.get('/userInfo', (req, res) => {
  res.send('用户的基础路由')
})

module.exports = router
