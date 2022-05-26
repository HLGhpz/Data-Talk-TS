/*
 * @Author: HLGhpz
 * @Date: 2022-05-26 19:33:02
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-05-26 19:33:02
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
  return dv.rows
}

export { handleData }
