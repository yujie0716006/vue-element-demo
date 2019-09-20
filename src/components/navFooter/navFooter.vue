<template>
  <footer class="footer_guide border-1px">
    <a v-for="(item, index) in footerData" :key="index" href="javascript:;" class="guide_item" :class="`${$route.path === item.path ? 'on' : ''}`"
    @click.stop="handleFooter(item.path)">
      <span class="item_icon">
        <i :class="`icon iconfont ${item.footerIcon}`"></i>
      </span>
      <span>{{item.name}}</span>
    </a>
    <!--<a href="javascript:;" class="guide_item on">
      <span class="item_icon">
        <i class="icon iconfont iconziyuan"></i>
      </span>
      <span>外卖</span>
    </a>
    <a href="javascript:;" class="guide_item">
      <span class="item_icon">
        <i class="icon iconfont iconsousuo"></i>
      </span>
      <span>搜索</span>
    </a>
    <a href="javascript:;" class="guide_item">
      <span class="item_icon">
        <i class="icon iconfont icondingdan"></i>
      </span>
      <span>订单</span>
    </a>
    <a href="javascript:;" class="guide_item">
      <span class="item_icon">
        <i class="icon iconfont iconwode"></i>
      </span>
      <span>我的</span>
    </a>-->
  </footer>
</template>

<script>
  export default {
    name: 'nav-footer',
    data() {
      return {
        footerData: [
          {
            name: '外卖',
            footerIcon: 'iconziyuan',
            path: '/app/msite'
          },
          {
            name: '搜索',
            footerIcon: 'iconsousuo',
            path: '/app/search'
          },
          {
            name: '订单',
            footerIcon: 'icondingdan',
            path: '/app/order'
          },
          {
            name: '我的',
            footerIcon: 'iconwode',
            path: '/app/profile'
          }
        ]
      }
    },
    methods: {
      handleFooter (path) {
        this.$router.push({path})
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
  @import '../../common/stylus/mixins.styl'
  .footer_guide  //footer
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>
