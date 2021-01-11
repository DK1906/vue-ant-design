<template>
  <div class="mutil-tab">
    <a-tabs v-model="activeKey" @edit="closeTab" hide-add @tabClick="tabClick">
      <a-tab-pane
        :key="page.path"
        v-for="page in pages"
        :closable="pages.length > 1"
      >
        <a-dropdown slot="tab" :trigger="['contextmenu']">
          <a-tag>{{ page.meta.title || page.path }}</a-tag>
          <!-- <span style="user-select: none">{{
            page.meta.title || page.path
          }}</span> -->
          <a-menu slot="overlay" @click="({ key }) => rightClick(page, key)">
            <a-menu-item key="remove">
              关闭
            </a-menu-item>
            <a-menu-item key="removeOther">
              关闭其他
            </a-menu-item>
            <a-menu-item key="removeAll">
              关闭全部
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeKey: null,
      pages: []
    }
  },
  methods: {
    // 关闭选定标签
    closeTab (targetKey, action) {
      this[action](targetKey)
    },
    // 右键中菜单点击
    rightClick (page, key) {
      this[key](page.path)

      // if(key === 'close'){
      //   this.remove()
      // }else{}
    },
    // remove方法
    remove (targetKey) {
      const index = this.pages.findIndex(l => l.path === targetKey)
      this.pages.splice(index, 1)
      if (this.activeKey === targetKey) {
        const newIndex = index > this.pages.length - 1 ? index - 1 : index
        this.activeKey = this.pages[newIndex].path
        this.$router.push(this.activeKey)
      }
    },
    // 关闭非当前
    removeOther (targetKey) {
      const index = this.pages.findIndex(l => l.path === targetKey)
      this.pages = this.pages.splice(index, 1)
      if (this.activeKey !== targetKey) {
        this.activeKey = targetKey
        this.$router.push(targetKey)
      }
    },
    // 关闭所有
    removeAll () {
      this.pages = []
      this.$router.push('/index')
    },
    // 标签页点击
    tabClick (value) {
      if (value !== this.activeKey) {
        this.$router.push(this.pages.find(l => l.path === value).fullPath)
      }
    }
  },
  watch: {
    $route (value) {
      const { pages } = this
      this.activeKey = value.path
      const index = pages.findIndex(l => l.path === value.path)
      index < 0 ? this.pages.push(value) : this.pages.splice(index, 1, value)
    }
  },
  created () {
    this.pages.push(this.$route)
    this.activeKey = this.$route.path
  }
}
</script>
<style lang="less">
.mutil-tab {
  border-top: 1px solid #e8e8e8;
  background-color: #fff;
  padding: 8px 16px;
  .ant-tag {
    border-radius: 0;
  }
  .ant-tabs-bar {
    margin-bottom: 0px;
    border: none;
    .ant-tabs-tab {
      padding: 0;
      margin: 0;
    }
    .ant-tabs-nav-wrap{
      margin: 0;
    }
    .ant-tabs-ink-bar {
      display: none !important;
    }
  }
}
</style>
