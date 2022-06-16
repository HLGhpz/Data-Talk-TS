/*
 * @Author: HLGhpz
 * @Date: 2022-05-10 21:14:55
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-15 21:18:57
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
  // dv.transform({
  //   type: 'reverse'
  // })
  return result
}

export { handleData }
