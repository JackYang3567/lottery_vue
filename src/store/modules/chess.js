/**
 *   原文件index.2019-06-06-back.js
 *   //棋牌缓存
    chess_home: {},
 */

import chess from '../../api/chess'

// initial state
const state = {
  chessTypes: [],
  chesss: [],
}

// getters
const getters = {}

// actions
const actions = {
  getAllChesss ({ commit }) {
    chess.getChesss(chesss => {
      commit('setChesss', chesss)
    })
  },
  getAllChessTypes ({ commit }) {
    chess.getChessTypes(chessTypes => {
      commit('setChessTypes', chessTypes)
    })
  }
}

// mutations
const mutations = {
  setChesss (state, chesss) {
    state.chesss = chesss
  },

  setChessTypes (state, chessTypes) {
    state.chessTypes = chessTypes
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
