import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'core-js'
import 'regenerator-runtime/runtime'

import antd from 'ant-design-vue'

// 路由守卫
import '@/permission'

// custom global styles
import '@/styles/app-main.less'

// 主题样式
import '@/styles/theme.less'

// 全局自定义指令
import '@/directive/limit'

Vue.config.productionTip = false

Vue.use(antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
