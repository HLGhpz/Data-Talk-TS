/*
 * @Author: HLGhpz
 * @Date: 2022-07-11 17:06:14
 * @LastEditors: HLGhpz
 * @LastEditTime: 2022-07-15 22:31:49
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
  let kind = '地区生产总值'
  let province = '四川'
  let unit = _.filter(rowData, (item) => {
    return item.Area === 'Unit'
  })
  let remark = _.filter(rowData, (item) => {
    return item.Area === 'Remark'
  })
  result = _.chain(rowData)
    // .filter((item) => {
    //   return item.Area !== undefined
    // })
    // .filter((item) => {
    //   return item.Short !== '总计' && item.Category !== 'Total'
    // })
    .filter((item) => {
      return item.Province === province
    })
    .sortBy(kind)
    .reverse()
    .map((item, index) => {
      item.index = index + 1
      return item
    })
    .reverse()
    // .reverse()
    // .reverse()
    // .sortBy(`${kind}Index`)
    // .sortBy(kind)
    // .reverse()
    // .filter((item) => {
    //   return item.Value >= 4000000
    // })
    .value()

  console.log('result', result)

  return [result, unit]
}

export { handleData }
