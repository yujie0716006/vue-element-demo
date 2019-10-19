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

    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="headerFoodList.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(swiperItem, index) in headerFoodList" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(item, index) in swiperItem" :key="index">
              <div class="food_container">
                <img :src="imgUrl+item.image_url">
              </div>
              <span>{{item.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="black" v-else>
    </nav>

    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont iconcaidan"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
    </div>
    <ShopList></ShopList>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import Swiper from 'swiper'
  import HeaderTop from '../../components/HeaderTop/HeaderTop'
  import ShopList from '../../components/ShopList/ShopList'
  import {headerFood} from "../../api/api";

  export default {
    name: "Msite",
    components: {
      HeaderTop,
      ShopList
    },
    data() {
      return {
        headerFoodList: [],
        imgUrl: 'https://cube.elemecdn.com/', // 饿了么图片地址
      }
    },
    computed: {
    //  适用对象展开运算符将此对象混入到外部对象中
      ...mapState({
        title: state => state.address
      })
    },
    mounted () {
    //  下次更新DOM之前调用
        setTimeout(() => {
          new Swiper('.swiper-container', {
            loop: true, // 可以循环轮播
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
          })
        }, 0)

    //  获取首页的食物导航列表
      headerFood()
        .then(res => {
          const result = res.data
          if (result.err_code === 0) {
            let arr = []
            result.result.forEach(item => {
              if (arr.length === 8) {
                this.headerFoodList.push(arr)
                arr = []
              } else {
                arr.push(item)
              }
            })
            this.headerFoodList.push(arr)
          }
        })
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
  @import '~swiper/css/swiper.min.css'
  .msite_nav
    bottom-border-1px(#e4e4e4)
    margin-top 45px
    height 200px
    background #fff
    .swiper-container
      width 100%
      height 100%
      .swiper-wrapper
        width 100%
        height 100%
        .swiper-slide
          display flex
          justify-content start
          align-items flex-start
          flex-wrap wrap
          .link_to_food
            width 25%
            .food_container
              display block
              width 100%
              text-align center
              padding-bottom 10px
              font-size 0
              img
                display inline-block
                width 50px
                height 50px
            span
              display block
              width 100%
              text-align center
              font-size 13px
              color #666
      .swiper-pagination
        >span.swiper-pagination-bullet-active
          background #02a774
  .msite_shop_list
    top-border-1px(#e4e4e4)
    margin-top 10px
    background #fff
    .shop_header
      padding 10px 10px 0
      .shop_icon
        margin-left 5px
        color #999
      .shop_header_title
        color #999
        font-size 14px
        line-height 20px
</style>
