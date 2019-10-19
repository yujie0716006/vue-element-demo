<template>
  <div class="app-content">
    <router-view></router-view>
    <NavFooter></NavFooter>
  </div>
</template>

<script>
  import NavFooter from '@/components/navFooter/navFooter'
  import {getAddressPoint, pointToAddress} from './common/js/map'
  export default {
    name: "App",
    components: {
      NavFooter
    },
    data() {
      return {}
    },
    mounted () {
      getAddressPoint(this)
      pointToAddress(this)
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.app-content
  width: 100%
  height: 100%
</style>
