// 这里面是基础的数据库模型
const mongoose = require('mongoose')
// headerFoods的数据
const headerFoodSchema = new mongoose.Schema({}, {collection: 'headerFoods'})

// 首页附近商家的信息
const shopListSchema = new mongoose.Schema({}, {collection: 'shopLists'})

// 用户信息
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  money: {
    type: String,
  },
  integral: { // 积分
    type: String,
  },
  preferential: { // 优惠
    type: String,
  }

})

// 向外面报漏一个对象
module.exports = {
  headerFoodModel: mongoose.model('HeaderFood', headerFoodSchema),
  shopListModel: mongoose.model('ShopList', shopListSchema, 'shopLists'),
  userModel: mongoose.model('User', userSchema, 'users')
}
