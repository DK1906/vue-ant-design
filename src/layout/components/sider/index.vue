<template>
<div>
  <a-layout-sider
    :collapsed="isAlways ? false : sidebar"
    :theme="THEME"
    class="layout-sider"
    :class="{ 'sider-fixed': FIXSIDER }"
    :width="SIDERWIDTH[device]"
  >
     <div class="toggle-box">
        <a-icon
          v-if="device === 'mobile'"
          class="trigger"
          :type="sidebar ? 'menu-fold' : 'menu-unfold'"
          @click="toggle"
        />
        <a-icon
          v-else
          class="trigger"
          :type="sidebar ? 'menu-unfold' : 'menu-fold'"
          @click="toggle"
        />
      </div>
    <a-menu
      v-model="selectedKeys"
      :open-keys="openKeys"
      :theme="THEME"
      mode="inline"
      @click="handleMenuClick"
      @openChange="handelSubMenuChange"
    >
      <template v-for="item in asyncRoutes">
        <a-menu-item
          v-if="hasOnlyChild(item) && !item.hidden"
          :key="item.name"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title || "" }}</span>
        </a-menu-item>
        <MenuItem :key="item.name" v-else-if="!item.hidden" :menu-info="item" />
      </template>
    </a-menu>
  </a-layout-sider>
  </div>
</template>
<script>
import { THEME, FIXSIDER, SIDERWIDTH } from '@/utils/config'
import { Device } from '@/mixins'
import MenuItem from './menu-item'
import store from '@/store'
export default {
  components: {
    MenuItem,
  },
  props: {
    isAlways: {
      type: Boolean,
      default: false
    }
  },
  mixins: [Device],
  provide () {
    return {
      hasOnlyChild: this.hasOnlyChild
    }
  },
  data () {
    return {
      THEME,
      FIXSIDER,
      SIDERWIDTH,
      rootSubmenuKeys: [],
      selectedKeys: [],
      openKeys: []
    }
  },
  watch: {
    // 监听路由，改变选中状态
    $route () {
      this.doRoute()
    },
    sidebar (newValue, oldValue) {
      if (newValue === true && oldValue === false) {
        this.cacheOpenKeys = this.openKeys
        this.openKeys = []
      } else if (newValue === false && oldValue === true) {
        this.openKeys = this.cacheOpenKeys
      }
    }
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    asyncRoutes () {
      return this.$store.state.router.asyncRoutes
    }
  },
  methods: {
    // 菜单点击跳转
    handleMenuClick ({ item, key }) {
      console.log(item,key)
        this.$store.dispatch('app/addTag',key)
      if (key.substr(0, 5) === 'link:') {
        window.open(key.substring(5))
        this.$nextTick(() => {
          this.selectedKeys = [this.$route.fullPath]
        })
      } else {
        if (!this.selectedKeys.includes(key)) {
          this.$router.push({ name: key })
        }
      }
    },
    handelSubMenuChange (openKeys) {
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    // 判断是否只有一个显性子路由或不存在子路由
    hasOnlyChild (item) {
       return !item.children
      // return !item.children || item.children.filter(l => !l.hidden).length < 2
    },
    // 处理路由变化
    doRoute () {
      // 匹配到的路由数组path信息
      const matched = this.$route.matched.map(l => l.name)
      // 将matched最后一个放入选中数组
      this.selectedKeys = matched.splice(matched.length - 1, 1)
      // 将其他的放入展开数组
      this.sidebar ? (this.cacheOpenKeys = matched) : (this.openKeys = matched)
    },
     toggle () {
      this.$emit('toggle')
    }
  },
  created () {
    this.asyncRoutes.forEach(item => {
      if (!item.hidden) {
        this.rootSubmenuKeys.push(item.path)
      }
    })
    this.doRoute()
  }
}
</script>
<style lang="less" scoped>
.sider-fixed {
  position: fixed;
  top:64px;
  height: 100%;
  z-index: 1000;
}
.layout-sider {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  .logo {
    height: @header-height;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 32px;
    }
    span {
      font-size: 18px;
      color: #fff;
      margin-left: 8px;
      font-weight: bold;
    }
  }
  .toggle-box{
     text-align: center;
     height: 30px;
     padding-top: 5px;
     .trigger {
        // vertical-align: middle;
        font-size: 18px;
        line-height:30px;
        cursor: pointer;
        transition: color 0.3s;
        color:white;
        // &:hover {
          // color: @primary-color;
        // }
      }
  }
   .ant-menu {
    border: none;
  }
}
</style>
