// 这里面是基础的数据库模型
const mongoose = require('mongoose')
// headerFoods的数据
const headerFoodSchema = new mongoose.Schema({}, {collection: 'headerFoods'})


// 向外面报漏一个对象
module.exports = {
  headerFoodModel: mongoose.model('HeaderFood', headerFoodSchema)
}
