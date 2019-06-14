/**
 *   原文件index.2019-06-06-back.js
 *   // 滚动条缓存
    scroll_top: {},

 */

import scroll from '../../api/scroll'

// initial state
const state = {
  scrolls: []
}

// getters
const getters = {}

// actions
const actions = {
  getAllScrolls ({ commit }) {
    scroll.getScrolls(scrolls => {
      commit('setScrolls', scrolls)
    })
  }
}

// mutations
const mutations = {
  setScrolls (state, scrolls) {
    state.scrolls = scrolls
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
