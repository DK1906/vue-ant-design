const DEFAULTTOKENKEY = 'front-template-token'

export function getToken (key) {
  return localStorage.getItem(key || DEFAULTTOKENKEY)
}

export function setToken (key, token) {
  return localStorage.setItem(key || DEFAULTTOKENKEY, token)
}

export function removeToken (key) {
  return localStorage.removeItem(key || DEFAULTTOKENKEY)
}
