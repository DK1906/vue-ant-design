import { isEmpty } from 'lodash'
const SORTKEYMAP = {

}

const SORTVALUEMAP = {

}

export default {
  data () {
    return {
      pagination: {
        current: 1,
        pageSizeOptions: ['20', '50', '100'],
        pageSize: 20,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共有 ${total} 条数据`
      },
      tableFilterValue: {},
      tableSortValue: {}
    }
  },
  methods: {
    handleTableChange (pagination, filters, sorter, callBack) {
      const { current, pageSize } = pagination
      // 替换页数
      this.$set(this.pagination, 'current', current)
      // 判定页面大小是否变化
      if (pageSize !== this.pagination.pageSize) {
        this.$set(this.pagination, 'current', 1)
        this.$set(this.pagination, 'pageSize', pageSize)
      }
      // 判定筛选条件是否变化
      const filtersKey = Object.keys(filters)
      const hasFilterChange = filtersKey.some(l => {
        return (
          (filters[l].length === 0 && this.tableFilterValue[l] !== undefined) ||
          (filters[l].length !== 0 &&
            this.tableFilterValue[l] !== filters[l][0])
        )
      })
      if (hasFilterChange) {
        this.resetCurrent()
        filtersKey.forEach(l => {
          this.$set(this.tableFilterValue, l, filters[l][0])
        })
      }
      // 判定排序是否变化
      const hasSortChange =
        (!isEmpty(this.tableSortValue) && isEmpty(sorter)) ||
        (!isEmpty(sorter) &&
          this.tableSortValue[this.getTableSortKey(sorter.columnKey)] !== this.getTableSortValue(sorter.order))
      if (hasSortChange) {
        this.resetCurrent()
        this.resetTableSort()
        if (!isEmpty(sorter)) {
          this.$set(this.tableSortValue, this.getTableSortKey(sorter.columnKey), this.getTableSortValue(sorter.order))
        }
      }
      if (typeof callBack === 'function') {
        callBack()
      }
    },
    // 重置翻页数据
    resetCurrent () {
      this.$set(this.pagination, 'current', 1)
    },
    // 重置排序数据
    resetTableSort () {
      this.tableSortValue = {}
    },
    // 获取排序key
    getTableSortKey (sortKey) {
      return SORTKEYMAP[sortKey] ? SORTKEYMAP[sortKey] : sortKey
    },
    // 获取排序value
    getTableSortValue (sortValue) {
      return SORTVALUEMAP[sortValue] ? SORTVALUEMAP[sortValue] : sortValue
    }
  }
}
