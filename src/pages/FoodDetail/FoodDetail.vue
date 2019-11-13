<!--商家商品-->
<template>
  <div>
    商品详情
  </div>
</template>

<script>
  import {food_detail} from "../../api/api";

  export default {
    name: "FoodDetail",
    data() {
      return {
        foodId: '',
        foodObj: {}
      }
    },
    mounted() {
      this.foodId = this.$route.query.foodId
      console.log('接收到的路由的内容', this.$route.query.foodId)
      food_detail()
        .then(res => {
          const result = res.data
          if (result.code_err === 0) {
            const foodArr = result.data.array
            this.foodObj = foodArr.filter(item => item.foodId === +this.foodId)[0]
            console.log('this.foodObj', this.foodObj)
          }
        })
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
