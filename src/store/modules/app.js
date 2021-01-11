
const checkedTag = function (tagList,tagKey) {
  for(let key  in tagList){
    tagList[key].checked = false
    }
    tagList[tagKey].checked = true
    return tagList
}

const showTag = function (tagList,tagKey) {
  tagList= checkedTag( tagList, tagKey)
    tagList[tagKey].show = true
    return tagList
}

const state = {
  device: 'desktop',
  sidebar: false,
  messageThrottle: null,
  tagList:{
    "node-authorization-information":{
      name:'节点授权信息',
      path:'/system-info/node-authorization-information',
      key:'node-authorization-information',
      checked:false,
      show:true
    },
    "department-management":{
      name:'部门管理',
      path:'/organizational-management/department-management',
      key:'department-management',
      checked:false,
      show:false
    },
    "user-management":{
      name:'用户管理',
      path:'/organizational-management/user-management',
      key:'user-management',
      checked:false,
      show:false
    },
}
}

const mutations = {
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIDEBAR_TYPE: (state, type) => {
    state.sidebar = type
  },
  SET_MESSAGE_THROTTLE: (state, messageThrottle) => {
    state.messageThrottle = messageThrottle
  },
  ADD_TAG: (state, tagKey) => {
      state.tagList= showTag( state.tagList, tagKey) 
  },
  DELETE_TAG: (state, tagKey) => {
    state.tagList[tagKey].show = false
    console.log(state.tagList)
  },
  CHECKED_TAG: (state, tagKey) => {
    state.tagList= checkedTag( state.tagList, tagKey)
  },
}

const actions = {
  ToggleDevice ({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSidebar ({ commit }, type) {
    commit('SET_SIDEBAR_TYPE', type)
  },
  addTag ({ commit }, tagKey) {
    commit('ADD_TAG', tagKey)
  },
  deleteTag ({ commit }, tagKey) {
    commit('DELETE_TAG', tagKey)
  },
  checkedTag ({ commit }, tagKey) {
    commit('CHECKED_TAG', tagKey)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
