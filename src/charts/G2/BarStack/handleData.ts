/*
 * @Author: HLGhpz
 * @Date: 2022-05-10 21:14:55
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-24 16:53:30
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
  })
  console.log(dv.rows)
  return dv.rows
}

export { handleData }
