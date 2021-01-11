<template>
  <a-layout>
    <a-layout class="layout-content-wrapper">
      <Header />
      <AppMain mode="detail" />
      <Footer v-if="HASFOOTER" />
    </a-layout>
  </a-layout>
</template>
<script>
import Header from './components/header/detail'
import Footer from './components/footer'
import AppMain from './components/app-main'
import { HASFOOTER } from '@/utils/config.js'
import { Device } from '@/mixins'
import store from '@/store'
export default {
  components: {
    Header,
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
      HASFOOTER
    }
  },
  methods: {
    // 更改侧边栏展开状态
  }
}
</script>

<style lang="less" scoped>
.layout-content-wrapper {
  min-height: 100vh;
}
</style>
