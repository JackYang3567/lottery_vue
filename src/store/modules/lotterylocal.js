/**
 *   2019-06-13
 */
import lotterylocal from '../../api/lotterylocal'

// initial state
const state =  {
  lotteryLocal: {}, 
}

// getters
const getters = {}

// mutations
const mutations = {
  setLotteryLocals (state, lotteryLocals) {
    state.lotteryLocal = lotteryLocals
  }
}

// actions
const actions = {
  getAllLotteryLocals ({ commit }) {
    lotterylocal.getLotteryLocals(lotteryLocals => {
      commit('setLotteryLocals', lotteryLocals)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
