<template>
  <div>
    点餐
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "OrderFood",
    data() {
      return {}
    },
    mounted() {
      console.log('点餐的参数', this.$route.query.orderFood)
      console.log('食物', this.orderFoods)
    },
    computed: {
      ...mapState({
        orderFoods: state => state.shopDetailInfo.goods
      })
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>

</style>
