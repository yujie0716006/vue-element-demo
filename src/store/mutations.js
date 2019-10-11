import {RECEIVE_SHOPS} from "./types";

export default {
  // 更新首页附近商家的信息
  [RECEIVE_SHOPS] (state, shops) {
    state.shops = shops
  }
}
