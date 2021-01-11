<template>
  <div class="filter">
    <div class="filter-inner" :class="{ 'flex-end': position === 'right' }">
      <div
        v-for="item in filterContainers"
        :key="item.model"
        class="filter-control"
        :style="{ 'margin-right': item.noMargin ? '4px' : '16px' }"
      >
        <label v-if="item.label">{{ item.label }}：</label>
        <a-input
          :allow-clear="
            item.filterOptions
              ? item.filterOptions.allowClear === undefined
                ? true
                : item.filterOptions.allowClear
              : true
          "
          v-if="item.filterType === 'input'"
          v-bind="item.filterOptions"
          v-model="filterForm[item.model]"
          @pressEnter="formSubmit"
        />
        <a-select
          :allow-clear="
            item.filterOptions
              ? item.filterOptions.allowClear === undefined
                ? true
                : item.filterOptions.allowClear
              : true
          "
          v-else-if="item.filterType === 'select'"
          v-bind="item.filterOptions"
          v-model="filterForm[item.model]"
          v-on="item.filterEvent"
          :defaultActiveFirstOption="false"
          :style="{ width: item.filterOptions.width }"
        />
        <a-date-picker
          :allow-clear="
            item.filterOptions
              ? item.filterOptions.allowClear === undefined
                ? true
                : item.filterOptions.allowClear
              : true
          "
          v-else-if="item.filterType === 'date-picker'"
          v-bind="item.filterOptions"
          v-model="filterForm[item.model]"
          valueFormat="YYYY-MM-DD"
        />
        <a-range-picker
          :allow-clear="
            item.filterOptions
              ? item.filterOptions.allowClear === undefined
                ? true
                : item.filterOptions.allowClear
              : true
          "
          v-else-if="item.filterType === 'range-picker'"
          v-bind="item.filterOptions"
          v-model="filterForm[item.model]"
          valueFormat="YYYY-MM-DD"
        />
        <a-cascader
          :allow-clear="
            item.filterOptions
              ? item.filterOptions.allowClear === undefined
                ? true
                : item.filterOptions.allowClear
              : true
          "
          v-else-if="item.filterType === 'cascader'"
          v-bind="item.filterOptions"
          v-model="filterForm[item.model]"
        />
        <a-tree-select
          :allow-clear="
            item.filterOptions
              ? item.filterOptions.allowClear === undefined
                ? true
                : item.filterOptions.allowClear
              : true
          "
          v-else-if="item.filterType === 'treeSelect'"
          v-bind="item.filterOptions"
          v-model="filterForm[item.model]"
        />
        <a-switch
          v-if="item.filterType === 'switch'"
          v-bind="item.filterOptions"
          v-model="filterForm[item.model]"
        />
      </div>
      <div class="action-button" :class="{ 'flex-all': position === 'left' }">
        <a-button icon="search" type="primary" @click="formSubmit"
          >搜索</a-button
        >
        <a-button icon="reload" type="primary" @click="formReset"
          >重置</a-button
        >
        <slot name="more-action-button" />
      </div>
    </div>
    <a-divider />
  </div>
</template>
<script>
import { isEqual, cloneDeep } from 'lodash'
export default {
  props: {
    filterContainers: {
      type: Array,
      default: () => []
    },
    // 是否在url上保留搜索条件
    setHistory: {
      type: Boolean,
      default: false
    },
    // 筛选器方向
    position: {
      type: String,
      default: 'left'
    }
  },
  data () {
    return {
      filterForm: {},
      maxCount: 5,
      hasExpend: false
    }
  },
  methods: {
    // 筛选器提交
    formSubmit () {
      if (!isEqual(this.$route.query, this.filterForm)) {
        if (this.setHistory) {
          const urlQuery = {
            ...this.$route.query,
            ...this.filterForm
          }
          this.$router.replace({
            url: this.$route.path,
            query: urlQuery
          })
        }
        this.$emit('filterSubmit', this.filterForm)
      }
    },
    // 筛选器重置
    formReset () {
      if (this.setHistory) {
        this.$router.replace({
          url: this.$route.path
        })
      }
      this.filterForm = {}
      for (const value of this.filterContainers) {
        if (value.filterOptions && value.filterOptions.defaultValue) {
          this.filterForm = {
            ...this.filterForm,
            [value.model]: value.filterOptions.defaultValue
          }
        }
      }
      this.$emit('filterSubmit', this.filterForm)
    },
    // 更改能展示的fiter数量
    handleChangeFilterCount () {
      this.hasExpend = !this.hasExpend
      this.maxCount = this.hasExpend ? this.filterContainers.length : 5
    }
  },
  created () {
    this.filterForm = cloneDeep(this.$route.query)
    for (const value of this.filterContainers) {
      if (
        value.filterOptions &&
        value.filterOptions.defaultValue &&
        !this.filterForm[value.model]
      ) {
        this.filterForm = {
          ...this.filterForm,
          [value.model]: value.filterOptions.defaultValue
        }
      }
    }
    this.$emit('filterSubmit', this.filterForm)
  }
}
</script>
<style lang="less" scoped>
.filter {
  .filter-inner {
    display: flex;
    flex-wrap: wrap;
    .filter-control {
      display: flex;
      align-items: center;
      margin-right: 16px;
      margin-bottom: 8px;
      label {
        white-space: nowrap;
      }
      .ant-input-affix-wrapper,
      .ant-select {
        width: 200px;
      }
      .ant-calendar-picker {
        width: 256px;
      }
    }
    .action-button {
      text-align: right;
      min-width: 172px;
      .ant-btn {
        margin-right: 8px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
  .ant-divider {
    margin-top: 16px;
  }
}
.flex-end {
  justify-content: flex-end;
}
.flex-all {
  flex: 1;
}
</style>
