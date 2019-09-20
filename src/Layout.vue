<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "Layout",
    data() {
      return {}
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
  // 引入的在线icon图库
  @import '//at.alicdn.com/t/font_1423319_3hll52s2v1b.css'
  @import './common/css/reset.css'
  #app
    width: 100%
    height: 100%
    background-color #f5f5f5
</style>
