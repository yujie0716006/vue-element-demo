<template>
  <div class="food-content">
    <div class="foot-btn">外卖</div>
    <div class="foot-btn">订单</div>
    <div class="foot-btn">用户中心</div>
    <div class="foot-btn">钱包</div>
  </div>
</template>

<script>
  export default {
    name: "food",
    data() {
      return {}
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.food-content
  width: 100%
  display flex
  height: 70px
  line-height 70px
  border-bottom: 1px solid #999
  font-size 26px
  .foot-btn
    display flex
    flex: 1
    text-align center
    flex-direction column
    align-items center
</style>
