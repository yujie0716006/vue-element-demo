<!-- 首页 -->
<template>
  <div>
    <HeaderTop :title="title">
      <template v-slot:left>
        <span class="header_search">
            <i class="icon iconfont iconsousuo"></i>
        </span>
      </template>
      <template v-slot:right>
        <span class="header_login">
            <span class="header_login_text">登录|注册</span>
        </span>
      </template>
    </HeaderTop>
  </div>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop'

  export default {
    name: "Msite",
    components: {
      HeaderTop
    },
    data() {
      return {
        title: '昌平区北七家宏福科技园(337省道北)'
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
