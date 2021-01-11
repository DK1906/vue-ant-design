import { HASPERMISSION } from '@/utils/config'
import router, { asyncRoutes } from '@/router'

// 筛选路由表
function filterAsyncRouter (routeMap, permission) {
  const accessedRouters = routeMap.filter(route => {
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, permission)
      route.redirect = `${route.path}/${(
        route.children.find(l => !l.hidden) || {}
      ).path || ''}`
      return true
    }
    if (route.access === true || permission.includes(route.access)) {
      return true
    }
    return false
  })
  return accessedRouters
}

const state = {
  asyncRoutes: []
}

const mutations = {
  SET_ASYNC_ROUTES: (state, asyncRoutes) => {
    state.asyncRoutes = asyncRoutes
  }
}

const actions = {
  // 生成动态路由表
  async generateRoutes ({ commit, state, rootState }) {
    // 当前动态路由表
    let currentAsyncRoutes = []
    // 如果不需要权限，添加所有动态路由表
    if (!HASPERMISSION) {
      currentAsyncRoutes = asyncRoutes
    } else {
      currentAsyncRoutes = filterAsyncRouter(
        asyncRoutes,
        rootState.user.permission
      )
    }
    commit('SET_ASYNC_ROUTES', currentAsyncRoutes)
    // 动态路由表添加
    router.addRoutes(state.asyncRoutes)
  },
  // 清空动态路由表
  async resetRoutes ({ commit }) {
    commit('SET_ASYNC_ROUTES', [])
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
