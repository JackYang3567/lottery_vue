/**
 
 */

import winning from '../../api/winning'

// initial state
const state = {
  winnings: []
}

// getters
const getters = {}

// actions
const actions = {
  getAllWinnings ({ commit }) {
    winning.getWinnings(winnings => {
      commit('setWinnings', winnings)
    })
  }
}

// mutations
const mutations = {
  setWinnings (state, winnings) {
    state.winnings = winnings
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
