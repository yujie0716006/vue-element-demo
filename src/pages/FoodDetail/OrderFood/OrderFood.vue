<template>
  <div>
    <div class="goods">
<!--      左侧的菜单-->
      <div class="menu-wrapper" id="menuWrapper">
        <ul>
          <!--current-->
          <li class="menu-item" v-for="(good, index) in orderFoods" :key="index" @click="handleMenu(index)"
          :class="`${menuNum === index ? 'current' : ''}`">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
<!--      右侧对应的菜单详细项-->
      <div class="foods-wrapper" id="foodsWrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in orderFoods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
<!--      <ShopCart />-->
    </div>
<!--    <Food :food="food" ref="food"/>-->
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import BScroll from '@better-scroll/core'
  import CartControl from '@/components/CartControl/CartControl'
  import ShopCart from '@/components/ShopCart/ShopCart'
  export default {
    name: "OrderFood",
    components: {
      CartControl,
      ShopCart
    },
    data() {
      return {
        menuScroll: '',
        foodScroll: '',
        scrollY: '', //食物列表滚动的距离
        heightArr: []
      }
    },
    mounted() {
      console.log('食物', this.orderFoods)
        this.$nextTick(() => {
          setTimeout(() => {
            this._initScroll()
          }, 100)
        })
    },
    computed: {
      ...mapState({
        orderFoods: state => state.shopDetailInfo.goods
      }),
      menuNum() {
        const {scrollY, heightArr} = this
        const index = heightArr.findIndex((item, index) => {
          return item <= scrollY && scrollY < heightArr[index + 1]
        })
        return index
      }
    },
    methods: {
    //  点击左侧的菜单
      handleMenu(index) {
        const {heightArr} = this
        const scrollY = heightArr[index]
        this.scrollY = scrollY
        this.foodScroll.scrollTo(0, -scrollY, 300)
      },
      _initScroll() {
        let domHeight = 0
        this.heightArr.push(0)
        const foodListDom = document.getElementsByClassName('food-list-hook')
        for(let i = 0; i < foodListDom.length; i++) {
          domHeight += foodListDom[i].offsetHeight
          this.heightArr.push(domHeight)
        }
        //  初始化左侧点餐的滚动事件
        this.menuScroll = new BScroll('#menuWrapper', {
          click: true
        })
        //  初始化右侧食物列表的滚动事件
        this.foodScroll = new BScroll('#foodsWrapper', {
          click: true,
          probeType: 2
        })
        this.foodScroll.on('scroll', ({x, y}) => {
           this.scrollY = Math.abs(y)
        })
        this.foodScroll.on('scrollEnd', ({x, y}) => {
          this.scrollY = Math.abs(y)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 100%
        padding: 0 12px
        line-height: 14px
        &.current // 点击后的高亮状态
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
            display flex
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 20px
</style>
