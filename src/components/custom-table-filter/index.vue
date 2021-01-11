<template>
  <a-menu
    v-model="selectedKeys"
    slot="bookClassifyNameFilter"
    @click="filterClick"
    class="overflow"
  >
    <a-menu-item :key="item.value" v-for="item in realFilter">
      {{ item.label }}
    </a-menu-item>
  </a-menu>
</template>
<script>
import { cloneDeep } from 'lodash'
export default {
  props: {
    filter: {
      type: Array,
      default: () => []
    },
    params: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      realFilter: [],
      selectedKeys: []
    }
  },
  methods: {
    filterClick (value) {
      if (value.key !== 'filterAll') {
        this.params.setSelectedKeys(value.keyPath)
        this.params.confirm()
      } else {
        this.params.clearFilters()
        this.$nextTick(() => {
          this.selectedKeys = []
        })
      }
    }
  },
  created () {
    const realFilter = cloneDeep(this.filter)
    realFilter.unshift({ value: 'filterAll', label: '全部' })
    this.realFilter = realFilter
  }
}
</script>
<style lang="less" scoped>
.overflow {
  max-height: 300px;
  overflow: auto;
}
</style>
