/*
 * @Author: HLGhpz
 * @Date: 2022-07-06 15:57:08
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-08 11:01:15
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
  result = _.chain(rowData)
    // .reverse()
    .value()

  return result
}

export { handleData }
