<!--商家商品-->
<template>
  <div>
<!-- 详情页的头部信息 -->
    <ShopHeader v-if="foodObj.foodId"></ShopHeader>
    <div class="tab">
      <div class="tab-item">
        <router-link :to="{path: '/food_detail/order_food', query: {orderFood: foodObj.goods}}" replace
        :class="`${$route.path === '/food_detail/order_food' ? 'router-link-active': ''}`">点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path: '/food_detail/rating', query: {orderFood: foodObj.ratings}}" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path: '/food_detail/shop_info', query: {orderFood: foodObj.info}}" replace>商家</router-link>
      </div>
    </div>
<!--这里是二级路由这是的区域，并且使用keep-alive进行缓存，这样在二级路由进行切换的时候还是刚才的样子-->
<!--二级路由会直接从这个路由出口显示出来-->
    <router-view></router-view>
  </div>
</template>

<script>
  import ShopHeader from './ShopHeader/ShopHeader'
  import {food_detail} from "../../api/api";

  export default {
    name: "FoodDetail",
    components: {
      ShopHeader
    },
    data() {
      return {
        foodId: 1,
        foodObj: {}
      }
    },
    mounted() {
      // 因为模拟是数据的foodId不确定，所以这里固定为1
      // this.foodId = this.$route.query.foodId
      food_detail()
        .then(res => {
          const result = res.data
          if (result.code_err === 0) {
            const foodArr = result.data.array
            this.foodObj = foodArr.filter(item => item.foodId === +this.foodId)[0]
            this.$store.dispatch('shop_detail_info', this.foodObj)
          }
        })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
