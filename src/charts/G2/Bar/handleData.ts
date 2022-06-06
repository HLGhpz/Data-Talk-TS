/*
 * @Author: HLGhpz
 * @Date: 2022-05-10 21:14:55
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-06 21:52:26
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import DataSet from '@antv/data-set'
import _ from 'lodash'

/**
 * @description:图表的原始数据处理
 * @param {*} option
 * @return {*}
 */
function handleData(rowData: any) {
  const ds = new DataSet()
  const dv = ds.createView().source(rowData)

  const data = _.chain(dv.rows)
    .filter((item) => {
      return item.Index <= 100
    })
    // .map((item) => {
    //   item.value = item.value * 1
    //   return item
    // })
    .reverse()
    .value()
  console.log(data)
  return data
}

export { handleData }
