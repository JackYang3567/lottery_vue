/**
 *   原文件index.2019-06-06-back.js
 *   //所有页面缓存
      all_chat: {},
 */

import chat from '../../api/chat'

// initial state
const state = {
  chats: []
}

// getters
const getters = {}

// actions
const actions = {
  getAllChats ({ commit }) {
    chat.getChats(chats => {
      commit('setChats', chats)
    })
  }
}

// mutations
const mutations = {
  setChats (state, chats) {
    state.chats = chats
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
