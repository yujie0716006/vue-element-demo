<template>
  <!--搜索-->
    <section class="search">
      <HeaderTop title="搜索"></HeaderTop>
      <form class="search_form" action="#">
        <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input" v-model="searchContent">
        <input type="submit" name="submit" class="search_submit" @click.stop.prevent="handleSearch">
      </form>
      <div class="list-wrap">
        <section class="list" v-if="shopsList.length > 0">
          <ul class="list_container">
            <div class="list_li" v-for="(item, index) in shopsList" :key="index">
              <section class="item_left">
                <img class="restaurant_img">
              </section>
              <section class="item_right">
                <div class="item_right_text">
                  <p>
                    <span>{{item.name}}</span>
                  </p>
                  <p>月售 {{item.recent_order_num}} 单</p>
                  <p>{{item.float_minimum_order_amount}} 元起送 / 距离{{item.distance}}</p>
                </div>
              </section>
            </div>
          </ul>
        </section>
        <div class="search_none" v-else>很抱歉！无搜索结果</div>
      </div>
    </section>
</template>

<script>
  import HeaderTop from '@/components/HeaderTop/HeaderTop'
  import {search_foods} from "../../api/api";

  export default {
    name: "Search",
    components: {
      HeaderTop
    },
    data() {
      return {
        searchContent: '',
        shopsList: []
      }
    },
    methods: {
    //  搜索商家以及美食
      handleSearch() {
        if (!this.searchContent) return // 如果搜索的内容为空的话，就不进行下去
        search_foods({shopOrFood: this.searchContent.trim()})
          .then(res => {
            const result = res.data
            if (result.code_err === 0) {
              this.shopsList = result.data
            }
          })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .search
    width 100%
    height 100%
    overflow hidden
    .search_form
      clearFix()
      margin-top 45px
      background-color #fff
      padding 12px 8px
      input
        height 35px
        padding 0 4px
        border-radius 2px
        font-weight bold
        outline none
        &.search_input
          float left
          width 79%
          border 4px solid #f2f2f2
          font-size 14px
          color #333
          background-color #f2f2f2
        &.search_submit
          float right
          width 18%
          border 4px solid #02a774
          font-size 16px
          color #fff
          background-color #02a774
    .list-wrap
      height 77%
      overflow-y auto
      .list
        .list_container
          background-color: #fff;
          .list_li
            display: flex;
            justify-content: center;
            padding: 10px
            border-bottom: 1px solid $bc;
            .item_left
              margin-right: 10px
              .restaurant_img
                width 50px
                height 50px
                display block
            .item_right
              font-size 12px
              flex 1
              .item_right_text
                p
                  line-height 12px
                  margin-bottom 6px
                  &:last-child
                    margin-bottom 0
    .search_none
      margin 0 auto
      color #333
      height: 150px
      line-height 150px
      background-color: #fff
      text-align: center
      margin-top: 0.125rem
</style>
