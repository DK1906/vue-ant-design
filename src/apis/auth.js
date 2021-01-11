import request from '@/utils/request'
// 登录
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/auth/login',
    data
  })
}

// 获取用户信息
export const info = (data) => {
  return request({
    method: 'GET',
    url: '/auth/info',
    data
  })
}
