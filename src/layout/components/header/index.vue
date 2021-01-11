<template>
  <div
    class="layout-header"
    :class="{ 'header-fixed': FIXHEADER }" >
    <a-layout-header class="layout-header__header">
      <!-- <div class="layout-header__header-title">
        :style="{
      width: FIXHEADER ? `calc(100% - ${SIDERWIDTH[this.device]}px)` : '100%'
    }"
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
      </div> -->
       <div class="logo" >
      <img src="@/assets/logo.png" alt /><span>LOGO</span>
    </div>
      <HeaderRight />
    </a-layout-header>
  </div>
</template>
<script>
import HeaderRight from './header-right'
import {
  FIXHEADER,
  FIXSIDER,
  SIDERWIDTH
} from '@/utils/config.js'
import { Device } from '@/mixins'
export default {
  components: {
    HeaderRight
  },
  mixins: [Device],
  data () {
    return { FIXHEADER, FIXSIDER, SIDERWIDTH }
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    userInfo () {
      return this.$store.getters.userInfo || {}
    }
  },
  methods: {
    // 登出
    logout () {
      this.$store.dispatch({ type: 'user/logout' }).then(() => {
        this.$message.success('退出登录成功')
      })
    },
    toggle () {
      this.$emit('toggle')
    }
  }
}
</script>
<style lang="less" scoped>
.header-fixed {
  position: fixed;
  width: 100%;
  right: 0;
  top: 0;
  z-index: 500;
   background: #108ee9;
}
.layout-header {
  width: 100%;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
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
      color:black;
      margin-left: 8px;
      font-weight: bold;
    }
  }
  &__header {
  background: #108ee9;
    padding: 0;
    display: flex;
    justify-content: space-between;
    &-title {
      font-size: 24px;
      font-weight: bold;
      user-select: none;
      .trigger {
        vertical-align: middle;
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
        // &:hover {
          // color: @primary-color;
        // }
      }
    }
    &-action {
      padding-right: 24px;
      .ant-avatar {
        margin-right: 8px;
      }
      .ant-btn {
        padding: 0;
        color: #333;
      }
    }
  }
  &__breadcrumb {
    margin: 16px;
  }
}
</style>
