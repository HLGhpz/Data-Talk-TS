/*
 * @Author: HLGhpz
 * @Date: 2022-06-17 17:12:06
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-04 13:54:22
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
  let kind = 'Foreign'
  let unit = _.filter(rowData, (item) => {
    return item.Province === 'Unit'
  })
  let remark = _.filter(rowData, (item) => {
    return item.Province === 'Remark'
  })
  result = _.chain(rowData)
    .filter((item) => {
      return item.Province !== 'Unit' && item.Province !== 'Remark'
    })
    // .filter((item) => {
    //   return item.Province !== '全国' && item.Category !== 'Total'
    // })
    .reverse()
    .sortBy(`${kind}Index`)
    .reverse()
    // .filter((item) => {
    //   return item.Value >= 4000000
    // })
    .value()

  console.log('result', result)

  return [result, unit]
}

export { handleData }
