/*
 * @Author: HLGhpz
 * @Date: 2022-05-09 22:30:32
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-16 13:20:08
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import DataSet from '@antv/data-set'
import dayjs from 'dayjs'

/**
 * @description:图表的原始数据处理
 * @param {*} option
 * @return {*}
 */
function handleData(rowData: any) {
  const ds = new DataSet()
  const dv = ds.createView().source(rowData)
  dv.transform({
    type: 'map',
    callback: (obj) => {
      obj.trend = obj.Close - obj.Open > 0 ? 'up' : 'down'
      obj.range = [obj.Open, obj.Close, obj.High, obj.Low]
      return obj
    }
  }).transform({
    type: 'filter',
    callback: (obj) => {
      return (
        dayjs(obj.Date) >= dayjs('2022-05-07 12:00:00') &&
        dayjs(obj.Date) <= dayjs('2022-05-15 12:00:00')
      )
    }
  })
  return dv.rows
}

export { handleData }
