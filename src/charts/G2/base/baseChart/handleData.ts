/*
 * @Author: HLGhpz
 * @Date: 2022-05-13 20:08:38
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-28 22:18:21
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
/*
 * @Author: HLGhpz
 * @Date: 2022-05-28 20:39:35
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-28 22:17:11
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */
import _ from 'lodash'

/**
 * @description:图表的原始数据处理
 * @param {*} option
 * @return {*}
 */
function handleData(rowData: any) {
  let result = []
  result = _.chain(rowData).value()
  return result
}

function initData(rowData: any) {
  let result = []
  result = _.chain(rowData).filter({ Year: 1961 }).value()
  return result
}

export { handleData, initData }
