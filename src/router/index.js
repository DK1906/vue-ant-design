import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/index.vue'

Vue.use(VueRouter)
//解决报错路由重复
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
// 基础路由表
const basicRouter = [
  {
    path: '/login',
    component: () => import('../views/login'),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/404',
    component: () => import('../views/exception/404.vue'),
    meta: { title: '404' },
    hidden: true
  },
  {
    path: '/403',
    component: () => import('../views/exception/403.vue'),
    meta: { title: '403' },
    hidden: true
  },
  {
    path: '/500',
    component: () => import('../views/exception/403.vue'),
    meta: { title: '403' },
    hidden: true
  },
  // 主页路由，如果动态路由表中含有主页路由，请删除
  { path: '/', redirect: '/system-info/node-authorization-information', hidden: true }
]

/**
 * 动态路由表 Object
 * path required  String  路由地址
 * name required  String  路由名称，影响边侧栏跳转和高亮
 * component  required  Function  异步组件引入，懒加载
 * redirect String 重定向地址，重构路由表时会重写该属性，以防止权限禁止
 * meta required  Object  边侧栏标题和图标
 * children 子路由  Array 与路由相同
 * **/
export const asyncRoutes = [
  {
    path: '/system-info',
    name: 'system-info',
    component: Layout,
    redirect: '/system-info/node-authorization-information',
    meta: { title: '系统信息', icon: 'dashboard' },
    children: [
      {
        path: 'node-authorization-information',
        name: 'node-authorization-information',
        component: () => import('../views/systemInfo/nodeAuthorizationInformation'),
        meta: {
          title: '节点授权信息'
        },
        access: 'node-authorization-information'
      },
    ]
  },
  {
    path: '/organizational-management',
    name: 'organizational-management',
    component: Layout,
    redirect: '/organizational-management/department-management',
    meta: { title: '组织管理', icon: 'form' },
    children: [
      {
        path: 'department-management',
        name: 'department-management',
        component: () => import('../views/organizationalManagement/departmentManagement'),
        meta: {
          title: '部门管理'
        },
        access: 'department-management'
      },
      {
        path: 'user-management',
        name: 'user-management',
        component: () => import('../views/organizationalManagement/userManagement'),
        meta: {
          title: '用户管理'
        },
        access: 'user-management',
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

// 路由生成函数，方便使用原始matcher重置路由表
export const createRouter = () =>
  new VueRouter({
    mode: 'history',
    base: '/',
    routes: basicRouter
  })

export default createRouter()
