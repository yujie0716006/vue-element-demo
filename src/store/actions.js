import {merchantsShop} from "../api/api";
import {RECEIVE_SHOPS, RECEIVE_ADDRESS} from './types'

export default {
  // 调用接口获取首页附近商家
  async receive_shop ({commit, state}) {
  // 这样是结构赋值，获取到里面的提交和状态
    const params = {
      latitude: state.latitude,
      longitude: state.longitude
    }
    const result = await merchantsShop(params)
    // 提交commit更改shop的值
    if (result.data.err_code === 0) {
      commit(RECEIVE_SHOPS, result.data.data)
    }
  },

//  当前的地理位置信息
  receive_address ({commit}, address) {
   commit(RECEIVE_ADDRESS, address)
  }
}
