/*
 * @Author: HLGhpz
 * @Date: 2022-05-09 22:30:32
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-04 00:18:12
 * @Description:
 *
 * Copyright (c) 2022 by HLGhpz, All Rights Reserved.
 */

import DataSet from '@antv/data-set'
import _ from 'lodash'
import moment from 'moment'

/**
 * @description:图表的原始数据处理
 * @param {*} option
 * @return {*}
 */
function handleData(rowData: any) {
  const ds = new DataSet()
  const dv = ds.createView().source(rowData)
  const data = _.chain(dv.rows)
    .map((item) => {
      item.trend = item.Close - item.Open > 0 ? 'up' : 'down'
      item.range = [item.Open, item.Close, item.High, item.Low]
      item.Date = moment(item.Date, 'YYYY年MM月DD日').format('YYYY-MM-DD')
      item.day = moment(item.Date).diff(moment('2022-02-23'), 'days')
      return item
    })
    .filter((item) => {
      return moment(item.Date).isAfter('2022-02-22')
    })
    .reverse()
    .value()
  console.log(data)

  return data
}

export { handleData }
