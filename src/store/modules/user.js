import { login, info } from '@/apis/auth.js'
import { setToken, removeToken } from '@/utils/auth.js'
import router, { createRouter } from '@/router'

const state = {
  userInfo: null,
  permission: []
}

const mutations = {
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_PERMISSION: (state, permission) => {
    state.permission = permission
  }
}

const actions = {
  // 登录
  async login ({ dispatch }, { formData }) {
    const { token } = await login(formData)
    setToken(null, token)
    await dispatch('userInfo')
    dispatch('router/generateRoutes', null, { root: true })
  },
  // 获取用户信息
  async userInfo ({ commit, dispatch }) {
    const data = await info()
    if (data) {
      commit('SET_USER_INFO', data)
      commit('SET_PERMISSION', data.permission || [])
    } else {
      await dispatch('resetUser')
    }
  },
  // 获取用户信息
  async logout ({ dispatch }) {
    await dispatch('resetUser')
    router.push('/login')
  },
  // 重置用户信息
  async resetUser ({ commit, dispatch }) {
    // 清空用户信息
    commit('SET_USER_INFO', null)
    // 清空存储的路由表
    dispatch('router/resetRoutes', null, { root: true })
    // 清空token信息
    removeToken()
    // 重置当前路由表
    router.matcher = createRouter().matcher
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
