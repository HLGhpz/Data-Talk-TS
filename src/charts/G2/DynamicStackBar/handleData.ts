/*
 * @Author: HLGhpz
 * @Date: 2022-05-28 20:39:35
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-02 15:02:10
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
  return result
}

function handleInitData(rowData: any) {
  let result = []
  let assist = []
  result = _.chain(rowData)
    .filter((item) => {
      return item.Year === 1961 && item.Country !== 'World'
    })
    .reverse()
    .value()

  assist = _.chain(rowData)
    .filter((item) => {
      return item.Year === 1961 && item.Country === 'World'
    })
    .value()

  return {
    initData: result,
    assistData: assist
  }
}

export { handleData, handleInitData }
