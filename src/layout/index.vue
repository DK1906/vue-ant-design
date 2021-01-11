<template>
  <a-layout>
    <a-drawer
      :visible="sidebar"
      :width="SIDERWIDTH.desktop"
      v-if="device === 'mobile'"
      placement="left"
      :closable="false"
      wrap-class-name="drawer-sider"
      @close="toggle"
    >
      <Sider :is-always="true" @toggle="toggle"  />
    </a-drawer>
    <Sider v-else @toggle="toggle"  />
    <a-layout
      class="layout-content-wrapper"
      :style="{ 'padding-left': FIXSIDER ? `${SIDERWIDTH[device]}px` : 0 }"
    >
      <Header @toggle="toggle" />
      <div v-if="FIXHEADER" class="margin-header"></div>
      <AppMain />
      <Footer v-if="HASFOOTER" />
    </a-layout>
  </a-layout>
</template>
<script>
import Header from './components/header'
import Sider from './components/sider'
import Footer from './components/footer'
import AppMain from './components/app-main'
import { HASFOOTER, FIXHEADER, FIXSIDER, SIDERWIDTH } from '@/utils/config.js'
import { Device } from '@/mixins'
import store from '@/store'
export default {
  components: {
    Header,
    Sider,
    Footer,
    AppMain
  },
  mixins: [Device],
  computed: {
    sidebar () {
      return store.state.app.sidebar
    }
  },
  data () {
    return {
      HASFOOTER,
      FIXHEADER,
      FIXSIDER,
      SIDERWIDTH
    }
  },
  methods: {
    // 更改侧边栏展开状态
    toggle () {
      if (this.device === 'mobile') {
        this.$store.dispatch('app/setSidebar', !this.sidebar)
      } else {
        this.$store.dispatch(
          'app/ToggleDevice',
          this.sidebar ? 'desktop' : 'tablet'
        )
        this.$store.dispatch('app/setSidebar', !this.sidebar)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.layout-content-wrapper {
  min-height: 100vh;
  .margin-header {
    margin-top: @header-height;
  }
}
</style>
