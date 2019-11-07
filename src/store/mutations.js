import {RECEIVE_SHOPS, RECEIVE_ADDRESS, RECEIVE_USERINFO} from "./types";

export default {
  // 更新首页附近商家的信息
  [RECEIVE_SHOPS] (state, shops) {
    state.shops = shops
  },

//  更改地理位置
  [RECEIVE_ADDRESS] (state, address) {
    state.address = address
  },

//  登陆用户后，获取用户信息
  [RECEIVE_USERINFO] (state, user) {
    state.user = user
  }
}
