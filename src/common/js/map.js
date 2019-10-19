module.exports = {
  // 获取当前地址的经纬度
  getAddressPoint (vm) {
    window.navigator.geolocation.getCurrentPosition((success, err) => {
    //  可以直接修改vuex中的经纬度，也可以修改成功，就是vuex插件没有记录了
      vm.$store.state.latitude = success.coords.latitude
      vm.$store.state.longitude = success.coords.longitude
    })
  },
//  将经纬度转换为当前地址的详细位置
  pointToAddress (vm) {
  //  在引用的百度地图中有一个构建函数BMap实例
    const point = new BMap.Point(vm.$store.state.longitude, vm.$store.state.latitude)
    const geoc = new BMap.Geocoder()
    geoc.getLocation(point, res => {
      const addComp = res.addressComponents
      const address = `${addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber}`
      vm.$store.dispatch('receive_address', address)
    } )
  }
}
