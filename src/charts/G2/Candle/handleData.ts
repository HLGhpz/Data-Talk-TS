/*
 * @Author: HLGhpz
 * @Date: 2022-05-09 22:30:32
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-09 22:33:09
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
    type: 'map',
    callback: (obj) => {
      obj.trend = obj.Open - obj.Close > 0 ? 'up' : 'down'
      obj.range = [obj.Open, obj.Close, obj.High, obj.Low]
      return obj
    }
  })
  return dv.rows
}

export { handleData }