import { cloneDeep } from 'lodash'
/**
 * @description: 树的搜索，深度遍历
 * @param searchValue {String} 需要搜索的数据
 * @param treeData {Array} 原始树结构
 * @param sign {String} 树种节点需要被搜索的数据键
 * @param childrenName {String} 树数据中子节点关键字
 * @return treeData {Array} 搜索结果
 */
export const treeSearch = (searchValue, treeData, sign, childrenName) => {
  let innerTreeData = cloneDeep(treeData)
  const loopFunction = (searchValue, treeData, sign) => {
    const hasCondition = []
    for (const index in treeData) {
      if (
        treeData[index][childrenName] &&
        treeData[index][childrenName].length !== 0
      ) {
        treeData[index][childrenName] = loopFunction(
          searchValue,
          treeData[index][childrenName],
          sign
        )
      }
      if (
        treeData[index][sign]
          .toLocaleLowerCase()
          .indexOf(searchValue.toLocaleLowerCase()) > -1 ||
        treeData[index][childrenName].length !== 0
      ) {
        hasCondition.push(treeData[index])
      }
    }
    return hasCondition
  }
  loopFunction(searchValue, innerTreeData, sign)
  innerTreeData = innerTreeData.filter(
    l =>
      l.children.length !== 0 ||
      l[sign].toLocaleLowerCase().indexOf(searchValue.toLocaleLowerCase()) > -1
  )
  return innerTreeData
}

/**
 * @description: 用于处理树结构数据，增加或删除节点中的部分数据
 * @param treeData {Array} 原始树结构
 * @param childrenName {String} 树数据中子节点关键字
 * @param callBack {Function} 处理函数，用户处理各个节点数据
 * @return treeData {Array} 新的树结构
 */
export const operateTreeData = (treeData, childrenName, callBack) => {
  const innerTreeData = cloneDeep(treeData)
  const level = 0
  const loopFunction = (treeData, callBack, level) => {
    for (const index in treeData) {
      if (
        treeData[index][childrenName] &&
        treeData[index][childrenName].length !== 0
      ) {
        loopFunction(
          treeData[index][childrenName],
          callBack,
          level + 1
        )
      }
      if (typeof callBack === 'function') {
        treeData[index].level = level
        treeData[index] = callBack(treeData[index])
      }
    }
  }
  loopFunction(innerTreeData, callBack, level)
  return innerTreeData
}
