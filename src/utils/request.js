import axios from 'axios'
import { getToken, removeToken, setToken } from '@/utils/auth'
import store from '@/store'
import { message } from 'ant-design-vue'
import { REQUESTCODE } from './config'

// create an axios instance
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// 请求拦截器，增加token
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 接受拦截器，拦截登录状态和错误判断
service.interceptors.response.use(
  response => {
    const refreshToken = response.headers.Authorization || response.headers.authorization
    if (refreshToken) {
      removeToken()
      setToken(refreshToken)
    }
    const res = response.data
    if (REQUESTCODE.includes(res.code)) {
      return res.data
    } else if (res instanceof ArrayBuffer) {
      return res
    } else {
      message.error(res.msg || res.message || '网络错误')
      return Promise.reject(res)
    }
  },
  error => {
    const errorRes = error.response
    if (errorRes.status === 401) {
      const throttle = setTimeout(() => {
        message.error('登录失效，请重新登录')
        store.dispatch({ type: 'user/logout' })
      }, 100)
      clearTimeout(store.state.app.messageThrottle)
      store.commit('app/SET_MESSAGE_THROTTLE', throttle)
    } else {
      message.error(errorRes.data.msg || errorRes.data.message || '网络错误')
      return Promise.reject(error)
    }
  }
)

export default service
