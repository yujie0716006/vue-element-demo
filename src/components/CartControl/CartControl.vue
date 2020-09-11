<template>
  <div class="cart-control">
    <transition name="show">
      <i class="iconfont iconjian" @click.stop="handleReduce"></i>
    </transition>
    <span class="food-num">2</span>
    <i class="iconfont iconjia" @click.stop="handleAdd"></i>
  </div>
</template>

<script>
  export default {
    name: "CartControl",
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {}
    },
    mounted() {
      console.log('food', this.food)
    },
    methods: {
    // 减少
      handleReduce() {
        console.log('点击减少')
      },
    //  添加
      handleAdd() {
        console.log('点击添加')
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
  @import "../../common/stylus/mixins.styl"
.cart-control
  position relative
  width 65px
  height 20px
  .iconfont, .food-num
    position absolute
    right 0
    top 0
    color green
    display inline-block
  .food-num
    color #000
</style>
