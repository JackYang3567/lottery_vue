/**
 *   原文件index.2019-06-10-back.js
 */
 import bBasic from '../../api/basic'

// initial state
const state =  {
  // =========初始化数据 ============= 
  basic: {
    static_path: '', // 静态资源地址
    web_name: '', // 网站名称
    logo_path: '', // 网站logo地址
    main_color: '', // 网站主题颜色
    web_state: 1, // 网站开关
    web_login: 0, // 未登录时是否定向登录页面
    demo_user: 1, // 是否开启试玩用户
    login_verify: 1, // 是否开启验证码
    home_window: false, // 首页弹窗
    chat_id: false, // session_id
    user_config: { chip: [], config: [] }
  }, 
}

// getters
const getters = {}

// mutations
const mutations = {
  setBasics (state, basics) {
    state.basic = basics
  }
}

// actions
const actions = {
  getAllBasics ({ commit }) {
    bBasic.getBasics(basics => {
      commit('setBasics', basics)
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
