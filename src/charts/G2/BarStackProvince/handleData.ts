/*
 * @Author: HLGhpz
 * @Date: 2022-06-17 17:12:06
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-06-28 20:58:59
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
  let unit = _.chain(rowData).last().value()
  result = _.chain(rowData)
    .dropRight()
    .filter((item) => {
      return item.Province !== '全国' && item.Category !== 'Total'
    })
    .sortBy('Index')
    .reverse()
    // .filter((item) => {
    //   return item.Value >= 4000000
    // })
    .value()

  console.log('result', result)

  return [result, unit]
}

export { handleData }
