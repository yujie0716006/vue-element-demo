<template>
  <div class="order-warp">
    <div class="di">现实的下划线</div>
  </div>
</template>

<script>
  export default {
    name: "Order",
    data() {
      return {}
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.order-warp
  height 100%
  width 100%
  .di
    position relative
    display inline-block
    &:after
      position absolute
      display block
      content ''
      width 0
      height 2px
      bottom: -5px;
      left: 50%
      background-color green
      transition all 0.6s
  .di:hover
    &:after
      width 100%
      transition all 0.6s
      left 0



</style>
