/**
 *   原文件index.2019-06-06-back.js
 *   // 热门彩票列表缓存
     lottery_list: {},
 */

import lottery from '../../api/lottery'

// initial state
const state = {
  lotterys: []
}

// getters
const getters = {}

// actions
const actions = {
  getAllLotterys ({ commit }) {
    lottery.getLotterys(lotterys => {
      commit('setLotterys', lotterys)
    })
  }
}

// mutations
const mutations = {
  setLotterys (state, lotterys) {
    state.lotterys = lotterys
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
