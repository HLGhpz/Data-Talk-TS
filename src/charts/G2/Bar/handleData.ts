/*
 * @Author: HLGhpz
 * @Date: 2022-05-10 21:14:55
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-10 23:02:58
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import DataSet from '@antv/data-set'

/**
 * @description:图表的原始数据处理
 * @param {*} option
 * @return {*}
 */
function handleData(rowData: any) {
  const ds = new DataSet()
  const dv = ds.createView().source(rowData)
  dv.transform({
    type: 'reverse'
  }).transform({
    type: 'filter',
    callback: (obj) => {
      return obj.Index <= 50
    }
  })
  console.log('rows', dv.rows)
  return dv.rows
}

export { handleData }
