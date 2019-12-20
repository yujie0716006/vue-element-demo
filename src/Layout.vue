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
    },
    mounted() {
      // 要在页面一加载的时候，就去判断用户是否登陆了，如果登陆了获取用户信息，如果没有登陆让用户去登陆
      this.$store.dispatch('login_userinfo')
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
  // 引入的在线icon图库
  @import '//at.alicdn.com/t/font_1423319_c23nx0guwxk.css'
  @import './common/css/reset.css'
  #app
    width: 100%
    height: 100%
</style>
