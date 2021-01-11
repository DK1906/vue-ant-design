<template>
  <a-tooltip
    :destroy-tooltip-on-hide="true"
    placement="top"
    :title="content"
    :overlay-class-name="overlayClassName"
  >
    <div ref="customTooltip" class="custom-tooltip" :style="{ width }">
      <slot v-if="$slots.length" />
      <template v-else>{{ content }}</template>
    </div>
  </a-tooltip>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      overlayClassName: null,
      width: '0px'
    }
  },
  watch: {
    content (value) {
      this.showSlot()
    }
  },
  methods: {
    showSlot () {
      this.$nextTick(() => {
        const dom = this.$refs.customTooltip
        const clientWidth = dom.clientWidth
        const scrollWidth = dom.scrollWidth
        if (scrollWidth <= clientWidth) {
          this.overlayClassName = 'hidden'
        } else {
          this.overlayClassName = ''
        }
      })
    }
  },
  created () {
    this.$nextTick(() => {
      const dom = this.$refs.customTooltip.parentNode
      this.width = `${dom.clientWidth}px`
      this.showSlot()
    })
  }
}
</script>
<style lang="less" scoped>
.custom-tooltip {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
<style lang="less">
.hidden {
  display: none !important;
}
</style>
