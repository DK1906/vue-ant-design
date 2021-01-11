<template>
  <div class="layout-header" :class="{ 'header-fixed': FIXHEADER }">
    <a-layout-header class="layout-header__header">
      <div class="layout-header__header-title">
        <span>{{ PROJECTTITLE }}</span>
      </div>
      <HeaderRight />
    </a-layout-header>
  </div>
</template>
<script>
import {
  PROJECTTITLE,
  FIXHEADER,
  FIXSIDER,
  SIDERWIDTH
} from '@/utils/config.js'
import { Device } from '@/mixins'
import HeaderRight from './header-right'
export default {
  components: {
    HeaderRight
  },
  mixins: [Device],
  data () {
    return { PROJECTTITLE, FIXHEADER, FIXSIDER, SIDERWIDTH }
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
}
.layout-header {
  &__header {
    background: #fff;
    padding: 0;
    display: flex;
    justify-content: space-between;
    &-title {
      font-size: 24px;
      font-weight: bold;
      user-select: none;
      padding: 0 24px;
    }
  }
  &__breadcrumb {
    margin: 16px;
  }
}
</style>
