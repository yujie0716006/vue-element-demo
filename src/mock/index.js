const Mock = require('mockjs')
const {foodsData} = require('./mockData')

// 模拟后台的router接口
Mock.mock('http://localhost:5000/foods', {code_err:0, data: foodsData})
