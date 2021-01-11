/* 
 * @LastEditTime : 2021-1-11
 * @LastEditors  : daikui
 * @FilePath: /jetsum-front-template/src/permission.js
 */
import router from './router'
import store from './store'
import { HASLOGIN } from '@/utils/config.js'
import { message } from 'ant-design-vue'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // 搜索时不进行路由判定
  if (to.path === from.path) {
    next()
    return
  }

  NProgress.start()

  // 如果不需要登录，则去掉路由守卫
  if (!HASLOGIN) {
    next()
    NProgress.done()
    return
  }

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果缓存中有token，访问登录页面重定向至首页
      next('/')
    } else {
      const hasGetUserInfo = store.getters.userInfo
      if (hasGetUserInfo) {
        // 如果拥有用户信息，则直接进入，该情况下已经重构路由表
        next()
      } else {
        try {
          // 如果没有用户信息，获取用户信息，并重构路由表
          await store.dispatch('user/userInfo')
          await store.dispatch('router/generateRoutes')
          next({ path: to.path })
        } catch (error) {
          // 移除token，用户信息等
          await store.dispatch('user/resetUser')
          message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    /* has no token */

    if (whiteList.indexOf(to.path) !== -1) {
      // 如果是白名单，直接进入
      next()
    } else {
      // 如果是非白名单，跳入登录页面，并提示
      message.error('登录失效，请重新登录')
      next(`/login?redirect=${to.path}`)
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
