<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(item, index) in starClasses" :class="item" :key="index"></span>
  </div>
</template>

<script>
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'
  export default {
    name: "Star",
    props: {
      source: Number,
      size: Number
    },
    data() {
      return {}
    },
    computed: {
    //  因为当数据变化的时候，这个评分也会改变，所以用计算属性
      starClasses () {
        const {source} = this
        const starArr = []
        const starOnNumber = Math.floor(source)
        for (let i = 0; i < starOnNumber; i++) {
          starArr.push(CLASS_ON)
        }
        if (source * 10 - starOnNumber * 10 > 4) {
          starArr.push(CLASS_HALF)
        }
        while(starArr.length < 5) {
          starArr.push(CLASS_OFF)
        }
        return starArr
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
