<template functional>
  <a-sub-menu :key="props.menuInfo.name">
    <span slot="title">
      <a-icon
        v-if="props.menuInfo.meta.icon"
        :type="props.menuInfo.meta.icon"
      />
      <span>{{ props.menuInfo.meta.title || "" }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="injections.hasOnlyChild(item) && !item.hidden"
        :key="item.name"
      >
        <span>{{ item.meta.title || "" }}</span>
      </a-menu-item>
      <menu-item :key="item.name" v-else-if="!item.hidden" :menu-info="item"  />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  name: 'MenuItem',
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
  },
  inject: ['hasOnlyChild']
}
</script>
<style lang="less" scoped></style>
