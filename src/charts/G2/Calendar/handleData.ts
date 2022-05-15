/*
 * @Author: HLGhpz
 * @Date: 2022-05-14 11:13:25
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-15 21:43:09
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
    type: 'filter',
    callback: (obj) => {
      return obj.year === 2021
    }
  })

  return dv.rows
}

export { handleData }
